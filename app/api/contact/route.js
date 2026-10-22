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

    // 2. Strict payload size bounds (read stream bytes directly, max 32KB - U06)
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > 32768) {
      return NextResponse.json(
        { error: 'Payload too large. Please shorten your message.' },
        { status: 413 }
      );
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request body must be an object.' },
        { status: 400 }
      );
    }

    // Anti-spam honeypot detection (U06)
    if (body.bot_field || body.website_url) {
      return NextResponse.json(
        { error: 'Spam submission detected.' },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message } = body;

    // Strict schema & type validations (U06)
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your name.', field: 'name' }, { status: 400 });
    }
    if (name.trim().length > 120) {
      return NextResponse.json({ error: 'Name must be 120 characters or less.', field: 'name' }, { status: 400 });
    }

    const hasPhone = typeof phone === 'string' && Boolean(phone.trim());
    const hasEmail = typeof email === 'string' && Boolean(email.trim());

    if (!hasPhone && !hasEmail) {
      return NextResponse.json(
        { error: 'Please provide either a phone number or an email address so we can reach you.' },
        { status: 400 }
      );
    }

    if (hasEmail) {
      const emailTrim = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailTrim.length > 254 || !emailRegex.test(emailTrim)) {
        return NextResponse.json({ error: 'Please provide a valid email address.', field: 'email' }, { status: 400 });
      }
    }

    if (hasPhone) {
      const phoneTrim = phone.trim();
      const digitCount = (phoneTrim.match(/\d/g) || []).length;
      if (phoneTrim.length > 30 || digitCount < 6) {
        return NextResponse.json({ error: 'Please provide a valid phone number (at least 6 digits).', field: 'phone' }, { status: 400 });
      }
    }

    if (company && typeof company === 'string' && company.trim().length > 150) {
      return NextResponse.json({ error: 'Organization name must be 150 characters or less.', field: 'company' }, { status: 400 });
    }

    if (message && typeof message === 'string' && message.trim().length > 5000) {
      return NextResponse.json({ error: 'Message must be 5000 characters or less.', field: 'message' }, { status: 400 });
    }

    if (service && typeof service === 'string' && service.trim().length > 120) {
      return NextResponse.json({ error: 'Service title exceeds maximum allowed length.', field: 'service' }, { status: 400 });
    }

    const cleanEmail = hasEmail ? email.trim() : `${(phone || 'lead').replace(/\D/g, '')}@lead.roughclick.com`;
    const cleanPhone = hasPhone ? phone.trim() : 'Email provided only';
    const cleanMessage = (message && typeof message === 'string' && message.trim()) ? message.trim() : `Direct Consultation Request. Reach via: ${hasPhone ? phone.trim() : email.trim()}`;

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
