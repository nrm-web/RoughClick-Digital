import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '@/data/config';

export const metadata = {
  title: 'Privacy Policy',
  description: 'RoughClick Digital privacy policy: How we handle, protect, and respect your personal information and project inquiry data.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Privacy Policy Header */}
      <section className="modern-section" style={{
        paddingTop: 'calc(var(--nav-height) + 40px)',
        paddingBottom: 'clamp(32px, 5vw, 60px)',
        backgroundColor: 'var(--bg-subtle)'
      }}>
        <div className="rc-container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--color-accent)',
                marginBottom: 20,
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>

            <span className="rc-badge" style={{ marginBottom: 16 }}>
              Trust &amp; Transparency
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              color: 'var(--text-heading)',
              lineHeight: 1.15,
              marginBottom: 16
            }}>
              Privacy Policy
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              Effective Date: October 2026 &bull; Last Updated: 07 October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Legal Content */}
      <section className="modern-section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: 40, paddingBottom: 80 }}>
        <div className="rc-container">
          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 16,
            padding: 'clamp(24px, 5vw, 48px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            color: 'var(--text-body)',
            lineHeight: 1.75,
            fontSize: '0.98rem'
          }}>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 20 }}>
                At <strong>RoughClick Digital</strong> (&ldquo;RoughClick,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we take your privacy and business confidentiality seriously. This Privacy Policy details how we collect, use, and safeguard personal information when you visit our website (<code>roughclick-digital.vercel.app</code> / <code>roughclick.com</code>) or submit an inquiry for digital engineering services.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

            {/* 1. Information We Collect */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText size={22} style={{ color: 'var(--color-accent)' }} />
                1. Information We Collect
              </h2>
              <p style={{ marginBottom: 12 }}>
                We only collect information that you deliberately provide to us when submitting inquiries or scheduling consultations:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <li><strong>Contact Credentials:</strong> Your full name, corporate email address, and direct telephone / WhatsApp number.</li>
                <li><strong>Organizational Details:</strong> Your company name, business domain, and existing website URL.</li>
                <li><strong>Project Scope:</strong> Technical specifications, design requirements, budget preferences, and custom application goals.</li>
              </ul>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                We do not collect sensitive personal data such as financial account credentials, government identification numbers, or biometric information on this website.
              </p>
            </div>

            {/* 2. How We Use Information */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Eye size={22} style={{ color: 'var(--color-accent)' }} />
                2. How We Use Your Information
              </h2>
              <p style={{ marginBottom: 12 }}>
                Information gathered is strictly utilized for legitimate business development and client service operations:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, margin: '18px 0' }}>
                <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 16, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>Proposal Preparation</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Evaluating your technical scope and estimating development milestones.</div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 16, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>Direct Communication</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Contacting you via email, phone, or WhatsApp to arrange discovery sessions.</div>
                </div>
              </div>
            </div>

            {/* 3. Strict Non-Disclosure */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Shield size={22} style={{ color: 'var(--color-accent)' }} />
                3. Zero Third-Party Monetization
              </h2>
              <p>
                <strong>We will never sell, lease, or monetize your contact information.</strong> Your project details are kept strictly confidential between our core engineering team and your organization. We only share information with third-party service providers (e.g., transactional email dispatch providers or secure cloud hosting) strictly necessary to deliver communication, subject to strict confidentiality terms.
              </p>
            </div>

            {/* 4. Security & Data Protection */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lock size={22} style={{ color: 'var(--color-accent)' }} />
                4. Data Security Standards
              </h2>
              <p>
                RoughClick Digital implements industry-standard administrative, physical, and technical safeguards. All data transmitted through our web forms is encrypted in transit using Transport Layer Security (TLS/HTTPS). Internal administrative endpoints are secured behind role-based authentication and defense-in-depth authorization checks.
              </p>
            </div>

            {/* 5. Your Rights */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={22} style={{ color: 'var(--color-accent)' }} />
                5. Your Data Rights
              </h2>
              <p style={{ marginBottom: 12 }}>
                You have the full right to:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Request a copy of the personal information we hold about you.</li>
                <li>Request correction of incomplete or outdated details.</li>
                <li>Request immediate and permanent deletion of your inquiry data from our storage systems.</li>
              </ul>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

            {/* 6. Contact Us */}
            <div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: 12 }}>
                6. Contact &amp; Grievance Redressal
              </h2>
              <p style={{ marginBottom: 12 }}>
                If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our privacy representative:
              </p>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 10,
                padding: '16px 20px',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.92rem'
              }}>
                <div><strong>RoughClick Digital</strong></div>
                <div>Office: {BRAND_CONFIG.contact.officeLocation || 'Coimbatore, Tamil Nadu, India'}</div>
                <div>Email:{' '}
                  <a href={`mailto:${BRAND_CONFIG.contact.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                    {BRAND_CONFIG.contact.email}
                  </a>
                </div>
                <div>Phone: {BRAND_CONFIG.contact.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
