import React from 'react';
import ContactForm from '@/components/ContactForm';
import { BRAND_CONFIG } from '@/data/config';
import { MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

function WhatsAppIcon({ size = 18, className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );
}

export const metadata = {
  title: 'Contact RoughClick Digital | WordPress, PHP, Wix & Next.js Consultation',
  description: 'Schedule a discovery consultation with RoughClick Digital engineers for custom WordPress development, bespoke PHP web applications, Wix Studio setups, Next.js frontends, and local SEO presence.'
};

export default function ContactPage() {
  const whatsappUrl = BRAND_CONFIG.contact.WHATSAPP_NUMBER
    ? `https://wa.me/${BRAND_CONFIG.contact.WHATSAPP_NUMBER}`
    : '#';

  return (
    <>
      {/* Contact Hero */}
      <section className="modern-hero" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="rc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 760 }}>
            <span className="rc-badge" style={{ marginBottom: 14 }}>
              Direct Engineering Consultation
            </span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
              Start Your <span className="accent">Digital Project</span>
            </h1>
            <p className="hero-subcopy" style={{ fontSize: '1.08rem' }}>
              Tell us about your organization's digital goals. Speak directly with an engineer to evaluate your project scope across custom WordPress, bespoke PHP, Wix Studio, Next.js, and local SEO presence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Office Channels */}
      <section className="modern-section" style={{ paddingTop: '1.5rem', paddingBottom: 'clamp(5rem, 8vw, 7.5rem)' }}>
        <div className="rc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'flex-start'
          }}>
            {/* Left: Lead Capture Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right: Contact Information & Placeholders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 16,
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
              }}>
                <span className="rc-badge" style={{ marginBottom: 16 }}>
                  {BRAND_CONFIG.contact.city} Office
                </span>

                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: 20 }}>
                  Contact Channels
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      flexShrink: 0
                    }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Office Location</strong>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                        {BRAND_CONFIG.contact.officeLocation || 'Coimbatore, Tamil Nadu, India'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Tamil Nadu, India
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      flexShrink: 0
                    }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Email Inquiries</strong>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                        <a href={`mailto:${BRAND_CONFIG.contact.email}`} style={{ color: 'inherit' }}>
                          {BRAND_CONFIG.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      flexShrink: 0
                    }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Telephone</strong>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                        <a href={`tel:${BRAND_CONFIG.contact.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>
                          {BRAND_CONFIG.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      flexShrink: 0
                    }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Business Hours</strong>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                        {BRAND_CONFIG.contact.hours}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern-secondary"
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 18px',
                      color: 'var(--text-heading)',
                      border: '1px solid var(--border-card)',
                      lineHeight: 1
                    }}
                  >
                    <WhatsAppIcon size={18} style={{ color: 'var(--color-accent)', transform: 'translateY(-0.5px)' }} />
                    <span>WhatsApp Direct Chat</span>
                    <ArrowRight size={15} strokeWidth={2.4} style={{ transform: 'translateY(0.5px)' }} />
                  </a>
                </div>
              </div>

              {/* Interactive Google Maps Frame Placeholder */}
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  height: 190,
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px dashed var(--color-accent)',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 20
                }}>
                  <MapPin size={32} style={{ color: 'var(--color-accent)', marginBottom: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-heading)' }}>
                    Interactive Google Maps Location
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Coimbatore, Tamil Nadu, India
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-accent)', marginTop: 4 }}>
                    [{BRAND_CONFIG.contact.officeLocation || 'Coimbatore Office'}]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
