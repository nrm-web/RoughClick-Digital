import React from 'react';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '@/data/services';
import { DiscussProjectButton } from '@/components/QuickBookingModal';
import { AnimatedLayout, AnimatedCode, AnimatedSparkles, AnimatedZap } from '@/components/AnimatedPlatformIcons';
import { ArrowRight, CheckCircle, Globe, Layers, Share2, RefreshCw, Check } from 'lucide-react';

export const metadata = {
  title: 'Website & Digital Services',
  description: 'Explore website development, custom applications, social content creation, and ongoing digital support. Find an approach suited to your business.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Website & Digital Services | RoughClick Digital',
    description: 'Explore website development, custom applications, social content creation, and ongoing digital support. Find an approach suited to your business.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website & Digital Services | RoughClick Digital',
    description: 'Explore website development, custom applications, social content creation, and ongoing digital support. Find an approach suited to your business.',
  },
};

function AnimatedGlobe({ size = 24, className = '' }) {
  return (
    <div className="animated-globe-container">
      <div className="globe-beacon-pulse" aria-hidden="true" />
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon-svg-globe ${className}`}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path className="meridian-sweep-1" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path className="meridian-sweep-2" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      </svg>
    </div>
  );
}

export default function ServicesPage() {
  const iconMap = {
    '01': AnimatedGlobe,
    '02': Layers,
    '03': Share2,
    '04': RefreshCw
  };

  const iconClassMap = {
    '01': 'icon-svg-globe',
    '02': 'icon-svg-layers',
    '03': 'icon-svg-share',
    '04': 'icon-svg-refresh'
  };

  return (
    <>
      {/* S01: Services Hero */}
      <section className="modern-hero">
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="rc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 860 }}>
            <span className="rc-badge" style={{ marginBottom: 16 }}>
              ROUGHCLICK DIGITAL SERVICES
            </span>
            <h1 className="hero-title">
              Digital Services for Your Website, Workflows, and <span className="accent">Online Presence</span>
            </h1>
            <p className="hero-subcopy">
              Build a useful website, develop a business tool, create consistent content, or arrange ongoing digital support. We help define the scope around your goals, existing setup, and the people who will manage it.
            </p>
          </div>

          {/* Quick Jump Navigation */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            marginTop: 28,
            paddingTop: 24,
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Jump To:
            </span>
            {SERVICE_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="btn-modern-secondary"
                style={{ padding: '8px 18px', fontSize: '0.84rem' }}
              >
                {cat.number} — {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* S02-S05: Services Deep Dive Section */}
      <section className="modern-section" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="rc-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 65px)' }}>
            {SERVICE_CATEGORIES.map((category) => {
              const CategoryIcon = iconMap[category.number] || Globe;

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="service-detail-card reveal-on-scroll"
                  style={{
                    position: 'relative',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 16,
                    padding: 'clamp(16px, 4vw, 48px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                    scrollMarginTop: '100px'
                  }}
                >
                  {/* Anchor Aliases for backward compatibility */}
                  {category.aliases?.map((alias) => (
                    <span key={alias} id={alias} style={{ position: 'absolute', top: -100, left: 0 }} />
                  ))}

                  {/* Category Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                    marginBottom: 20,
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: 20
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="service-detail-icon-box">
                        <CategoryIcon size={24} className={iconClassMap[category.number] || 'icon-svg-globe'} />
                      </div>
                      <div>
                        <span className="rc-badge">{category.number} // {category.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Descriptions */}
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--text-heading)', marginBottom: 12 }}>
                    {category.title}
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 860, marginBottom: 16 }}>
                    {category.fullDescription}
                  </p>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 860, marginBottom: 30 }}>
                    {category.valueProposition}
                  </p>

                  {/* What The Work Can Cover */}
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 12,
                    padding: '22px 24px',
                    marginBottom: 34,
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-accent)',
                      marginBottom: 14
                    }}>
                      What The Work Can Cover
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: 14
                    }}>
                      {category.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <CheckCircle size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hierarchy: GROUPS -> DETAILED CAPABILITIES / PLANNING */}
                  <div>
                    {category.groups.map((group) => (
                      <div
                        key={group.groupId}
                        style={{
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 12,
                          padding: 'clamp(14px, 3vw, 24px)',
                          backgroundColor: 'var(--bg-card)',
                          marginBottom: 20
                        }}
                      >
                        <h3 style={{
                          fontSize: '1.04rem',
                          color: 'var(--color-accent)',
                          marginBottom: 16,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontWeight: 700
                        }}>
                          <span>▪</span>
                          <span>{group.groupTitle}</span>
                        </h3>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                          gap: 16
                        }}>
                          {group.services.map((srv, sIdx) => (
                            <div
                              key={sIdx}
                              style={{
                                backgroundColor: 'var(--bg-subtle)',
                                borderRadius: 10,
                                padding: '16px 18px',
                                border: '1px solid var(--border-subtle)',
                                transition: 'border-color 0.2s ease, transform 0.2s ease'
                              }}
                            >
                              <div style={{
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                color: 'var(--text-heading)',
                                marginBottom: 6
                              }}>
                                {srv.name}
                              </div>
                              <div style={{
                                fontSize: '0.84rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.55
                              }}>
                                {srv.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Proposal Specification Note */}
                  {category.proposalNote && (
                    <div style={{
                      marginTop: 20,
                      padding: '16px 20px',
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 10,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.88rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.6
                    }}>
                      <strong style={{ color: 'var(--text-heading)' }}>Proposal Details: </strong>
                      {category.proposalNote.replace(/^What the proposal should specify:\s*/i, '')}
                    </div>
                  )}

                  {/* Scope Boundary Notice */}
                  {category.scopeNote && (
                    <div style={{
                      marginTop: 12,
                      padding: '14px 20px',
                      borderRadius: 10,
                      border: '1px dashed var(--border-subtle)',
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6
                    }}>
                      <strong style={{ color: 'var(--text-muted)' }}>Scope Notice: </strong>
                      {category.scopeNote.replace(/^Important scope note:\s*/i, '')}
                    </div>
                  )}

                  {/* Section CTA */}
                  <div style={{
                    marginTop: 32,
                    paddingTop: 22,
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16
                  }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Ready to discuss <strong>{category.title}</strong>?
                    </span>
                    <DiscussProjectButton
                      service={category.title}
                      className="btn-modern-primary"
                      style={{ fontSize: '0.88rem', padding: '10px 22px' }}
                    >
                      <span>{category.buttonText || 'Discuss Your Project'}</span>
                      <ArrowRight size={15} />
                    </DiscussProjectButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S06: Platform Comparison Matrix Section */}
      <section className="section-platform-guide">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">CHOOSING A PLATFORM</span>
            <h2 className="editorial-section-title">Which Platform Fits Your Requirement?</h2>
            <p className="editorial-section-subtitle">
              You do not need to decide on a framework before getting in touch. These are starting points for a discussion, not automatic recommendations.
            </p>
          </div>

          <div className="editorial-platform-grid reveal-stagger">
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Content &amp; E-Commerce</span>
                  <div className="platform-icon-wrap"><AnimatedLayout size={18} /></div>
                </div>
                <h3 className="platform-card-title">WordPress and WooCommerce</h3>
                <p className="platform-card-desc">
                  Consider when frequent publishing, structured content, or an editable online store is central to the requirement. Review the hosting, updates, extensions, and editing workflow.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item"><Check size={14} /><span>Structured content editing for your team</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Online stores and agreed checkout journeys</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Maintainable, clean plugin architecture</span></li>
                </ul>
              </div>
              <Link href="/contact" className="platform-card-cta">
                <span>Inquire About WordPress</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Database &amp; Tailored Logic</span>
                  <div className="platform-icon-wrap"><AnimatedCode size={18} /></div>
                </div>
                <h3 className="platform-card-title">Custom PHP</h3>
                <p className="platform-card-desc">
                  Consider for a defined database-backed workflow or application where a tailored backend fits the business logic. Plan for development, security, maintenance, and future changes.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item"><Check size={14} /><span>Tailored backend matching business logic</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Proprietary data workflows &amp; portals</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Independent architecture without SaaS lock-in</span></li>
                </ul>
              </div>
              <Link href="/contact" className="platform-card-cta">
                <span>Inquire About Custom PHP</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Hosted Visual CMS</span>
                  <div className="platform-icon-wrap"><AnimatedSparkles size={18} /></div>
                </div>
                <h3 className="platform-card-title">Wix Studio</h3>
                <p className="platform-card-desc">
                  Consider when a hosted visual website platform covers the required pages, editing, and integrations. Review recurring subscriptions and platform constraints.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item"><Check size={14} /><span>Hosted design and visual content tools</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Fast turnaround for marketing pages</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Zero server management overhead</span></li>
                </ul>
              </div>
              <Link href="/contact" className="platform-card-cta">
                <span>Inquire About Wix Studio</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Modern Component Frontend</span>
                  <div className="platform-icon-wrap"><AnimatedZap size={18} /></div>
                </div>
                <h3 className="platform-card-title">Next.js and React</h3>
                <p className="platform-card-desc">
                  Consider when a component-based frontend and custom application architecture suit the requirement. Confirm the CMS, backend, deployment, and maintenance arrangement.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item"><Check size={14} /><span>Modern component-driven frontends</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Flexible headless API integrations</span></li>
                  <li className="platform-feature-item"><Check size={14} /><span>Edge-ready speed &amp; Core Web Vitals</span></li>
                </ul>
              </div>
              <Link href="/contact" className="platform-card-cta">
                <span>Inquire About Next.js</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S07: Practical FAQ Guidance */}
      <section className="modern-section" style={{ backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="rc-container" style={{ maxWidth: 960 }}>
          <div className="editorial-section-head reveal-on-scroll" style={{ marginBottom: 36, textAlign: 'center' }}>
            <span className="editorial-category-tag">COMMON QUESTIONS</span>
            <h2 className="editorial-section-title">Practical Project Guidance</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '24px 28px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: 10, fontWeight: 700 }}>
                Can one project include more than one service?
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                Yes. A project can combine a website, content creation, application functionality, and ongoing support. The proposal should make the responsibilities and deliverables for each part clear.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '24px 28px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: 10, fontWeight: 700 }}>
                Are third-party subscriptions included?
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                Only where the proposal explicitly says so. Hosting, domains, software licenses, paid assets, payment charges, and other recurring services should be identified separately.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '24px 28px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: 10, fontWeight: 700 }}>
                What should I prepare before asking for a quote?
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                Your business description, current website or tools, main objectives, desired pages/features, available content, and any budget or launch constraints are useful starting points. Share access credentials only through an agreed secure process.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '24px 28px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: 10, fontWeight: 700 }}>
                How do I get a project estimate?
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                The right estimate depends on the requirement and available inputs. We recommend agreeing the scope and dependencies before confirming cost and timing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* S07: Bottom Conversion CTA */}
      <section className="section-cta-banner">
        <div className="rc-container">
          <div className="cta-banner-full">
            <span className="rc-badge" style={{ marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              LET&apos;S DISCUSS YOUR PROJECT
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: 14 }}>
              Start With the Problem You Want to Solve
            </h2>
            <p style={{ maxWidth: 640, margin: '0 auto 2.2rem auto', color: 'var(--hero-sub-color)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Describe your current setup and what needs to improve. If you are unsure which service applies, choose Unsure / Need Advice and share the requirement in your own words.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <DiscussProjectButton className="btn-pill-cyan">
                <span>Discuss Your Project</span>
                <ArrowRight size={15} />
              </DiscussProjectButton>
              <Link href="/contact" className="btn-pill-outline">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
