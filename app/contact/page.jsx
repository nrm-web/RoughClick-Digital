import React from 'react';
import ContactForm from '@/components/ContactForm';
import { BRAND_CONFIG } from '@/data/config';
import { MapPin, Mail, Phone, MessageSquare, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact RoughClick Digital',
  description: 'Get in touch with RoughClick Digital Coimbatore team for website development, custom applications, and social media digital solutions.'
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
              Let's Connect
            </span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
              Start Your <span className="accent">Digital Project</span>
            </h1>
            <p className="hero-subcopy" style={{ fontSize: '1.08rem' }}>
              Tell us about your organization's digital goals. Our Coimbatore team is ready to evaluate your scope and build a tailored solution across websites, social media, and business presence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Office Channels */}
      <section className="modern-section" style={{ paddingTop: '1rem' }}>
        <div className="rc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                        <a href={`mailto:${BRAND_CONFIG.contact.emailPlaceholder || 'contact@roughclick.com'}`} style={{ color: 'inherit' }}>
                          {BRAND_CONFIG.contact.emailPlaceholder || '[Email Address]'}
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
                        <a href={`tel:${BRAND_CONFIG.contact.phonePlaceholder || '+91'}`} style={{ color: 'inherit' }}>
                          {BRAND_CONFIG.contact.phonePlaceholder || '[Phone Number]'}
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
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 18px',
                      color: 'var(--text-heading)',
                      border: '1px solid var(--border-card)'
                    }}
                  >
                    <MessageSquare size={18} style={{ color: 'var(--color-accent)' }} />
                    <span>WhatsApp Direct Chat &rarr;</span>
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
