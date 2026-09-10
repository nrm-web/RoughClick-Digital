import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/db';
import { BRAND_CONFIG } from '@/data/config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Save inquiry to persistent storage
    const inquiry = await saveInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      company: (company || '').trim(),
      service: service || 'Website Services',
      message: message.trim(),
      source: 'Website Contact Page'
    });

    // Format WhatsApp direct message
    const whatsappNumber = BRAND_CONFIG.contact.WHATSAPP_NUMBER || '916379166158';
    const whatsappText = [
      '⚡ *New Project Inquiry - RoughClick Digital*',
      '',
      '👤 *Name*: ' + name.trim(),
      '📧 *Email*: ' + email.trim(),
      '📞 *Phone*: ' + (phone ? phone.trim() : 'Not provided'),
      '🏢 *Organization*: ' + (company ? company.trim() : 'Individual / Startup'),
      '🛠️ *Scope*: ' + (service || 'Website Development & Digital Presence'),
      '',
      '💬 *Message*:',
      message.trim()
    ].join('\n');

    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappText);

    // Optional Email Dispatch via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'RoughClick Inquiries <onboarding@resend.dev>',
            to: ['info@roughclick.com'],
            subject: 'New Project Inquiry from ' + name.trim() + ' (' + (service || 'Digital Scope') + ')',
            text: whatsappText
          })
        });
      } catch (e) {
        console.error('[Contact API] Error sending email via Resend:', e);
      }
    }

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
      whatsappUrl,
      message: 'Inquiry received and logged successfully'
    });
  } catch (err) {
    console.error('[Contact API] Error processing inquiry:', err);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
