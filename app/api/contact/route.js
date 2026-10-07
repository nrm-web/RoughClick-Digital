import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/db';
import { BRAND_CONFIG } from '@/data/config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }

    const hasPhone = Boolean(phone && phone.trim());
    const hasEmail = Boolean(email && email.trim());
    if (!hasPhone && !hasEmail) {
      return NextResponse.json({ error: 'Please provide either a phone number or an email address so we can reach you.' }, { status: 400 });
    }

    const cleanEmail = hasEmail ? email.trim() : `${(phone || 'lead').replace(/\D/g, '')}@lead.roughclick.com`;
    const cleanPhone = hasPhone ? phone.trim() : 'Email provided only';
    const cleanMessage = (message && message.trim()) ? message.trim() : `Direct Consultation Request. Reach via: ${hasPhone ? phone.trim() : email.trim()}`;

    // Save inquiry to persistent storage
    const inquiry = await saveInquiry({
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      company: (company || '').trim(),
      service: service || 'Website Development',
      message: cleanMessage,
      source: body.source || ((email && email.includes('@whatsapp.booking')) ? 'WhatsApp Quick Booking' : 'Website Contact Page')
    });

    // Format WhatsApp direct message
    const whatsappNumber = BRAND_CONFIG.contact.WHATSAPP_NUMBER || '916379166158';
    const whatsappText = [
      '⚡ *New Project Inquiry - RoughClick Digital*',
      '',
      '👤 *Name*: ' + name.trim(),
      '📧 *Email*: ' + ((email && email.trim()) ? email.trim() : 'Not provided'),
      '📞 *Phone*: ' + (phone ? phone.trim() : 'Not provided'),
      '🏢 *Organization*: ' + (company ? company.trim() : 'Individual / Startup'),
      '🛠️ *Scope*: ' + (service || 'Website Development & Digital Presence'),
      '',
      '💬 *Message*:',
      (message && message.trim()) ? message.trim() : 'Direct Inquiry / Not provided'
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
