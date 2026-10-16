import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '@/data/config';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how RoughClick Digital handles website enquiries, contact information, service providers, retention, and privacy requests.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | RoughClick Digital',
    description: 'Learn how RoughClick Digital handles website enquiries, contact information, service providers, retention, and privacy requests.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | RoughClick Digital',
    description: 'Learn how RoughClick Digital handles website enquiries, contact information, service providers, retention, and privacy requests.',
  },
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
                color: 'var(--color-accent-dark, #096357)',
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
              Effective Date: October 2026 &bull; Last Updated: 16 October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="modern-section" style={{
        paddingTop: 'clamp(32px, 5vw, 56px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-body)',
        lineHeight: 1.8
      }}>
        <div className="rc-container">
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: '1rem' }}>
            {/* Overview Notice */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 12,
              padding: '24px 28px',
              marginBottom: 36
            }}>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>
                RoughClick Digital (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to transparent, principled data privacy practices. This policy details how inquiries, technical scopes, and communications submitted through our website are gathered, secured, retained, and deleted.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

            {/* 1. Information We Collect */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText size={22} style={{ color: 'var(--color-accent-dark, #096357)' }} />
                1. Information We Collect
              </h2>
              <p style={{ marginBottom: 12 }}>
                We collect only information that you voluntarily provide when submitting project inquiries, requesting quotes, or scheduling consultations:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <li><strong>Contact Credentials:</strong> Your name, business email address, and direct telephone or WhatsApp number. (Providing either a verified phone or email is sufficient to initiate contact).</li>
                <li><strong>Organizational Details:</strong> Your company name, business domain, or current website URL.</li>
                <li><strong>Project Specifications:</strong> Deliverable goals, technical architecture preferences (e.g. Next.js, WordPress, Custom PHP), and estimated timeline targets.</li>
              </ul>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                We do not collect sensitive categories of personal data such as financial credentials, payment card numbers, biometric data, or government identifiers on this website.
              </p>
            </div>

            {/* 2. How We Use Information */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Eye size={22} style={{ color: 'var(--color-accent-dark, #096357)' }} />
                2. How We Use Your Information
              </h2>
              <p style={{ marginBottom: 12 }}>
                Inquiry details are strictly used for legitimate commercial scoping and client engineering support:
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

            {/* 3. Third-Party Processors & Data Transfers (RC-20) */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Shield size={22} style={{ color: 'var(--color-accent-dark, #096357)' }} />
                3. Third-Party Processors &amp; Transfers
              </h2>
              <p style={{ marginBottom: 12 }}>
                We will never sell, lease, or monetize your contact information. To operate our digital services, data is processed with the following audited providers under strict confidentiality:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><strong>Google Maps Embed:</strong> Our Contact page provides an embedded Google Maps iframe to display our registered office in Coimbatore, Tamil Nadu. Viewing or interacting with this map transfers basic network telemetry directly to Google LLC subject to Google&rsquo;s Privacy Policy.</li>
                <li><strong>WhatsApp Click-to-Chat:</strong> When selecting WhatsApp buttons on our website, you are redirected to the WhatsApp messaging interface (Meta Platforms, Inc.). Your telephone number and pre-filled inquiry text are processed directly according to WhatsApp&rsquo;s Privacy Terms.</li>
                <li><strong>Transactional Email Dispatch:</strong> Form submissions dispatch engineering notifications via Resend (transactional email API) over TLS-encrypted connections.</li>
                <li><strong>Encrypted Cloud &amp; Local Persistence:</strong> Inquiries are safely stored in durable cloud key-value storage and encrypted local backups solely for fulfilling client requests.</li>
                <li><strong>Browser Storage (Cookies &amp; LocalStorage):</strong> We store zero tracking or advertising cookies. We utilize browser `localStorage` and `sessionStorage` solely to remember your chosen theme (Modern Teal or Luxury Gold) and prevent repetitive replaying of the brand preloader animation.</li>
              </ul>
            </div>

            {/* 4. Data Retention & Deletion Schedule (RC-20) */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lock size={22} style={{ color: 'var(--color-accent-dark, #096357)' }} />
                4. Data Retention Schedule &amp; Deletion Verification
              </h2>
              <p style={{ marginBottom: 12 }}>
                We enforce an explicit operational retention lifecycle for all project inquiry records:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                <li><strong>Retention Period:</strong> Active project inquiries are retained for a maximum of <strong>12 months</strong> from the date of submission to accommodate proposal iterations and scoping revisions.</li>
                <li><strong>Periodic Purge:</strong> Inquiries exceeding 12 months with no active commercial contract are permanently erased during quarterly cleanup cycles.</li>
                <li><strong>On-Demand Deletion:</strong> You may request the immediate deletion of your inquiry records at any time. Verified requests are executed within <strong>5 business days</strong> across all primary stores and backup archives.</li>
              </ul>
            </div>

            {/* 5. Your Rights */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={22} style={{ color: 'var(--color-accent-dark, #096357)' }} />
                5. Your Data Rights
              </h2>
              <p style={{ marginBottom: 12 }}>
                You have the full right to:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Request an audit copy of the personal information we hold about you.</li>
                <li>Request immediate rectification of inaccurate or outdated contact records.</li>
                <li>Request immediate, permanent deletion of your inquiry records from all our storage systems.</li>
                <li>Withdraw consent for follow-up communications at any time.</li>
              </ul>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

            {/* 6. Contact & Grievance Redressal */}
            <div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: 12 }}>
                6. Contact &amp; Grievance Redressal
              </h2>
              <p style={{ marginBottom: 12 }}>
                To exercise any of your data rights or request immediate record deletion, contact our privacy officer directly:
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
                  <a href={`mailto:${BRAND_CONFIG.contact.email}`} style={{ color: 'var(--color-accent-dark, #096357)', textDecoration: 'underline', fontWeight: 600 }}>
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
