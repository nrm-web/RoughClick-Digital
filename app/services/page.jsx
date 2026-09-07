import React from 'react';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '@/data/services';
import { ArrowRight, CheckCircle, Globe, Layers, Share2, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Digital Services | RoughClick Digital',
  description: 'Explore our core digital services: Website Development, Custom Applications, Social Media Content Creation, and Social Media Management.'
};

export default function ServicesPage() {
  const iconMap = {
    '01': Globe,
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
      {/* Services Hero */}
      <section className="modern-hero">
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="rc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>
            <span className="rc-badge" style={{ marginBottom: 16 }}>
              Digital Capabilities Catalog
            </span>
            <h1 className="hero-title">
              Modular Solutions For <span className="accent">Modern Enterprises</span>
            </h1>
            <p className="hero-subcopy">
              Explore our full suite of web engineering, custom software solutions, and social media creative systems engineered for measurable business outcomes.
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

      {/* Services Deep Dive Section */}
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
                    padding: 'clamp(24px, 4vw, 48px)',
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

                    <Link
                      href="/contact"
                      className="btn-modern-primary"
                      style={{ fontSize: '0.84rem', padding: '9px 20px' }}
                    >
                      <span>Discuss Your Project</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Title & Descriptions */}
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--text-heading)', marginBottom: 12 }}>
                    {category.title}
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 840, marginBottom: 16 }}>
                    {category.fullDescription}
                  </p>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 840, marginBottom: 30 }}>
                    {category.valueProposition}
                  </p>

                  {/* Value Benefits Grid */}
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
                      Key Value & Benefits
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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

                  {/* Clean Hierarchy: SERVICE GROUPS -> INDIVIDUAL SERVICES */}
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: 'var(--text-heading)',
                      marginBottom: 20,
                      borderLeft: '3px solid var(--color-accent)',
                      paddingLeft: 12
                    }}>
                      Services Included & Deliverables
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {category.groups.map((group) => (
                        <div
                          key={group.groupId}
                          style={{
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 12,
                            padding: '24px',
                            backgroundColor: 'var(--bg-card)'
                          }}
                        >
                          <h4 style={{
                            fontSize: '1.04rem',
                            color: 'var(--color-accent)',
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                          }}>
                            <span>▪</span>
                            <span>{group.groupTitle}</span>
                          </h4>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                  </div>

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
                      Ready to get started with <strong>{category.title}</strong>?
                    </span>
                    <Link
                      href="/contact"
                      className="btn-modern-primary"
                      style={{ fontSize: '0.88rem', padding: '10px 22px' }}
                    >
                      <span>Let's Build Something</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Full-Width Conversion CTA */}
      <section className="section-cta-banner">
        <div className="rc-container">
          <div className="cta-banner-full">
            <span className="rc-badge" style={{ marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Let's Connect
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: 14 }}>
              Need a Customized Digital Solution?
            </h2>
            <p style={{ maxWidth: 620, margin: '0 auto 2.2rem auto', color: 'var(--hero-sub-color)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Every business has distinct requirements. Tell us about your goals and our Coimbatore team will tailor an integrated digital package for your enterprise.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                className="btn-pill-cyan"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/blog"
                className="btn-pill-outline"
              >
                <span>Read Knowledge Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

