import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Layers, Share2, RefreshCw, Zap, ShieldCheck, Clock, Users, Sparkles, MessageSquare, Terminal, FileCode, Check, Code2 } from 'lucide-react';
import HeroParticles from '@/components/HeroParticles';
import CapabilitiesInspector from '@/components/CapabilitiesInspector';
import AgencyTruthComparison from '@/components/AgencyTruthComparison';
import ClientFaqAccordion from '@/components/ClientFaqAccordion';

export const metadata = {
  title: 'RoughClick Digital | Modern Web Development & Digital Engineering Agency',
  description: 'Bespoke web architecture, custom applications, and social media creative systems engineered for high-performance businesses. Built by real engineers, not sales reps.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION (100% PRESERVED CONTENT & VISUAL STRUCTURE) */}
      <section className="modern-hero">
        <HeroParticles />
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="rc-container hero-container-rel">
          <div className="hero-grid-2col">
            <div>
              {/* Hero Section Brand Name */}
              <div className="hero-brand-masthead" role="banner" aria-label="RoughClick Digital">
                <div className="hero-brand-masthead-title">
                  <span className="brand-word-rough">ROUGHCLICK</span>{' '}
                  <span className="brand-word-digital">DIGITAL</span>
                </div>
              </div>

              <h1 className="hero-main-title">
                Architecting High-Performance <span className="text-cyan">Digital Experiences</span>
              </h1>

              <p className="hero-subtext">
                We design and engineer bespoke web platforms, custom cloud applications, and data-driven creative systems for modern ambitious brands.
              </p>

              <div className="hero-btn-group">
                <Link href="/contact" className="btn-pill-cyan">
                  <span>Start Your Project</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn-pill-secondary">
                  <span>Explore Capabilities</span>
                </Link>
              </div>

              <div className="hero-metrics-strip">
                <div className="hero-metric-item">
                  <div className="metric-bold">99.8%</div>
                  <div className="metric-label">Uptime &amp; Speed Reliability</div>
                </div>
                <div className="hero-metric-item">
                  <div className="metric-bold">&lt; 0.7s</div>
                  <div className="metric-label">Core Web Vitals Standard</div>
                </div>
                <div className="hero-metric-item">
                  <div className="metric-bold">100%</div>
                  <div className="metric-label">In-House Engineering</div>
                </div>
              </div>
            </div>

            <div className="hero-visual-frame">
              <div className="floating-hero-badge badge-pos-top-left" aria-hidden="true">
                <span className="badge-pulse-indicator" />
                <span className="badge-text-primary">Sub-Second Speed</span>
                <span className="badge-text-secondary">&lt; 0.7s LCP Benchmark</span>
              </div>

              <div className="floating-hero-badge badge-pos-bottom-right" aria-hidden="true">
                <span className="badge-pulse-indicator success" />
                <span className="badge-text-primary">99.9%</span>
                <span className="badge-text-secondary">System Availability</span>
              </div>

              <div className="hero-visual-light-wrap">
                <img
                  src="/brand/hero_option_devices.jpg"
                  alt="RoughClick Digital Ecosystem Showcase"
                  className="hero-visual-light"
                />
              </div>

              <div className="hero-visual-dark-wrap">
                <img
                  src="/brand/hero_option_devices_gold.jpg"
                  alt="RoughClick Digital Luxury Ecosystem Showcase"
                  className="hero-visual-dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL AGENCY MANIFESTO & STANDARDS (Fluid Editorial Spread, Zero Card Boxes) */}
      <section className="editorial-manifesto-section">
        <div className="rc-container">
          <div className="editorial-manifesto-grid reveal-on-scroll">
            {/* Left Column: Bold Editorial Statement */}
            <div className="manifesto-left-col">
              <span className="editorial-category-tag">
                01 // PHILOSOPHY &amp; PRINCIPLES
              </span>
              <h2 className="manifesto-headline">
                Hand-Crafted Engineering Built Around Your Business
              </h2>
              <p className="manifesto-lead-p">
                Most websites today are held together by 40 bloated plugins, slow drag-and-drop builders, and layers of account managers playing telephone. We do the opposite: <strong>clean, custom code engineered by hand</strong> for businesses that value speed, clarity, and real customer conversions.
              </p>
              <p className="manifesto-body-p">
                RoughClick Digital is a modern digital engineering agency. We partner directly with forward-thinking businesses to build lightning-fast web platforms, custom operational tools, and cohesive visual asset systems that stand the test of time.
              </p>
              <div className="manifesto-action-row">
                <Link href="/services" className="editorial-link-arrow">
                  <span>Explore Our Full Capabilities</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Engineering Benchmarks Ledger (Hairline Lines, Zero Card Boxes) */}
            <div className="manifesto-right-col">
              <div className="editorial-benchmarks-ledger reveal-card">
                <div className="benchmarks-header">
                  <span className="benchmarks-header-title">ENGINEERING BENCHMARKS</span>
                  <span className="benchmarks-header-tag">ZERO BLOAT</span>
                </div>

                <div className="benchmarks-list">
                  <div className="benchmark-entry">
                    <div className="benchmark-idx">01</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Direct Builder Access</h4>
                      <p className="benchmark-desc">Communicate directly with the software engineer and designer crafting your product. No account managers playing telephone.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">02</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">100% Code &amp; IP Ownership</h4>
                      <p className="benchmark-desc">All source code, design systems, and GitHub repository rights are transferred to you upon launch. Zero proprietary lock-in.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">03</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Sub-0.7s Speed Standard</h4>
                      <p className="benchmark-desc">Every page pre-rendered on edge networks with 95+ Google Core Web Vitals scores, boosting conversion and SEO rankings.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">04</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Maintainable Architecture</h4>
                      <p className="benchmark-desc">Clean semantic Next.js 14 code with modular components that any professional software engineer can easily scale and maintain.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CAPABILITIES DIRECTORY (Fluid Directory, Zero Outer Box) */}
      <section className="section-capabilities-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">02 // CAPABILITIES &amp; DISCIPLINES</span>
            <h2 className="editorial-section-title">Interactive Capabilities Directory</h2>
            <p className="editorial-section-subtitle">
              Inspect our verified deliverables, modern technology architectures, and real business outcomes across each discipline.
            </p>
          </div>

          <CapabilitiesInspector />
        </div>
      </section>

      {/* 4. THE AGENCY TRUTH: BLOATED AGENCY VS ROUGHCLICK DIGITAL (Editorial Ledger) */}
      <section className="section-truth-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">03 // TRANSPARENCY &amp; STANDARDS</span>
            <h2 className="editorial-section-title">The Agency Truth: Bloat vs. Precision</h2>
            <p className="editorial-section-subtitle">
              A transparent breakdown of why bespoke engineering and direct builder communication outperform bloated agency retainers.
            </p>
          </div>

          <AgencyTruthComparison />
        </div>
      </section>

      {/* 5. CONNECTED DELIVERY TIMELINE (Continuous Flow, Zero Enclosing Box Cards) */}
      <section className="section-lifecycle-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">04 // METHODOLOGY &amp; TIMELINE</span>
            <h2 className="editorial-section-title">Transparent 4-Step Delivery Lifecycle</h2>
            <p className="editorial-section-subtitle">
              A straightforward, milestone-driven collaboration with tangible checkpoints, rapid iterations, and zero surprise billing.
            </p>
          </div>

          <div className="editorial-timeline-flow reveal-stagger">
            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">01</span>
              </div>
              <h3 className="timeline-step-title">Scope &amp; Flat Quote</h3>
              <p className="timeline-step-desc">
                We jump on a focused 30-minute discovery call to map exact business objectives and technical requirements. You receive a guaranteed flat quote with zero hidden fees.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Fixed Scope Roadmap</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">02</span>
              </div>
              <h3 className="timeline-step-title">Interactive Prototype</h3>
              <p className="timeline-step-desc">
                We design responsive Figma layouts and live clickable prototypes so you can test user flows and visual styling before a single line of backend code is committed.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Clickable Prototype Sign-Off</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">03</span>
              </div>
              <h3 className="timeline-step-title">Modular Next.js Build</h3>
              <p className="timeline-step-desc">
                We engineer clean semantic HTML, modular React components, and optimized database pipelines, rigorously tested across real physical mobile and desktop devices.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Sub-0.7s Core Web Vitals</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">04</span>
              </div>
              <h3 className="timeline-step-title">Turnkey Launch &amp; Handoff</h3>
              <p className="timeline-step-desc">
                Production rollout, SSL certification, Google Search Console indexing, and recorded video walkthroughs empowering your team with complete operational autonomy.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: 100% IP &amp; 30-Day Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT FAQ SECTION (Minimalist Hairline Accordion, Zero Card Boxes) */}
      <section className="section-faq-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">05 // CLARITY &amp; TRANSPARENCY</span>
            <h2 className="editorial-section-title">Frequently Asked Questions</h2>
            <p className="editorial-section-subtitle">
              Straightforward answers about project timelines, source code ownership, technical stacks, and post-launch maintenance.
            </p>
          </div>

          <ClientFaqAccordion />
        </div>
      </section>

      {/* 6. EDITORIAL ARTICLES / PERSPECTIVES */}
      <section className="section-perspectives-fluid">
        <div className="rc-container">
          <div className="editorial-split-header reveal-on-scroll">
            <div>
              <span className="editorial-category-tag">06 // PERSPECTIVES &amp; ANALYSIS</span>
              <h2 className="editorial-section-title">Engineering Perspectives</h2>
              <p className="editorial-section-subtitle">
                Deep dives into modern web performance, custom software design, and digital brand equity.
              </p>
            </div>
            <Link href="/blog" className="editorial-secondary-btn">
              <span>View All Articles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="editorial-articles-grid reveal-stagger">
            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">Performance Engineering</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog">
                  Why 90% of WordPress Sites Fail Google Core Web Vitals in 2026
                </Link>
              </h3>
              <p className="article-excerpt">
                An architectural analysis of render-blocking script bloat, unoptimized database queries, and how pre-rendered React architectures deliver sub-700ms speeds.
              </p>
              <Link href="/blog" className="article-read-link">
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </article>

            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">Software Architecture</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog">
                  When Spreadsheets Break: The ROI of Custom Internal Web Portals
                </Link>
              </h3>
              <p className="article-excerpt">
                How growing companies save 15+ hours weekly by replacing fragmented Google Sheets and Excel files with tailor-made web tools and role-based workflows.
              </p>
              <Link href="/blog" className="article-read-link">
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </article>

            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">Brand Systems</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog">
                  The Multi-Platform Asset System: Beyond Generic Social Templates
                </Link>
              </h3>
              <p className="article-excerpt">
                Why one-off social posts fail to build recognition and how a cohesive Figma design system drives high-recall organic brand consistency.
              </p>
              <Link href="/blog" className="article-read-link">
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 9. DIRECT HUMAN CTA BANNER */}
      <section className="section-cta-banner" id="contact-cta">
        <div className="rc-container">
          <div className="cta-banner-full">
            <span className="rc-badge" style={{ marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Direct Builder Conversation
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: 14 }}>
              Ready to Build Something That Actually Performs?
            </h2>
            <p style={{ maxWidth: 640, margin: '0 auto 2.2rem auto', color: 'var(--hero-sub-color)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              No high-pressure sales reps. You will speak directly with a lead digital engineer to audit your current platform, map technical scope, and provide a clear milestone roadmap.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <Link href="/contact" className="btn-pill-cyan">
                <span>Schedule Discovery Call</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="editorial-cta-trust" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
              <span>Direct Engineer Access</span>
              <span className="trust-dot" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
              <span>Production-Grade SLA</span>
              <span className="trust-dot" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
              <span>Fixed Milestones &amp; Scope</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
