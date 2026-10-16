import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/db';
import { BRAND_CONFIG } from '@/data/config';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    // 1. Rate Limiting Check (Max 10 submissions per minute per IP - RC-05)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const rate = checkRateLimit(`contact_${ip}`, 10, 60000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment before sending another inquiry.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rate.resetTime / 1000))
          }
        }
      );
    }

    // 2. Payload size bounds (reject payloads > 32KB - RC-05)
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 32768) {
      return NextResponse.json(
        { error: 'Payload too large. Please shorten your message.' },
        { status: 413 }
      );
    }

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

    // 3. Save inquiry to persistent storage with atomic durability (RC-01, RC-02)
    const inquiry = await saveInquiry({
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      company: (company || '').trim(),
      service: service || 'Website Development',
      message: cleanMessage,
      source: body.source || ((email && email.includes('@whatsapp.booking')) ? 'WhatsApp Quick Booking' : 'Website Contact Page')
    });

    // 4. Format WhatsApp direct message
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

    // 5. Optional Email Dispatch via Resend with explicit delivery status check (RC-02)
    let emailDispatched = false;
    let emailError = null;

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'RoughClick Inquiries <onboarding@resend.dev>',
            to: [process.env.NOTIFICATION_EMAIL || 'info@roughclick.com'],
            subject: 'New Project Inquiry from ' + name.trim() + ' (' + (service || 'Digital Scope') + ')',
            text: whatsappText
          })
        });
        if (res.ok) {
          emailDispatched = true;
        } else {
          emailError = `Resend returned status ${res.status}`;
          console.warn('[Contact API] Resend email dispatch non-200:', res.status);
        }
      } catch (e) {
        emailError = e.message;
        console.error('[Contact API] Error sending email via Resend:', e);
      }
    }

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
      whatsappUrl,
      persistenceStatus: 'durable',
      emailDispatched,
      message: 'Inquiry received and logged successfully'
    });
  } catch (err) {
    console.error('[Contact API] Error processing inquiry:', err);
    return NextResponse.json(
      { error: 'Failed to process inquiry due to storage error. Please try again or reach via WhatsApp directly.' },
      { status: 500 }
    );
  }
}
