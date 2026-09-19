import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Layers, Share2, RefreshCw, Zap, ShieldCheck, Clock, Users, Sparkles, MessageSquare, Terminal, FileCode, Check, Code2, Code, Layout, Cpu } from 'lucide-react';
import HeroParticles from '@/components/HeroParticles';
import CapabilitiesInspector from '@/components/CapabilitiesInspector';
import AgencyTruthComparison from '@/components/AgencyTruthComparison';
import ClientFaqAccordion from '@/components/ClientFaqAccordion';

export const metadata = {
  title: 'RoughClick Digital | WordPress, Custom PHP, Wix & Next.js Web Development Agency',
  description: 'Professional web development services across custom WordPress, bespoke PHP, Wix Studio, and Next.js. We engineer fast, SEO-optimized websites, custom business portals, and local SEO presence.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
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
                From custom WordPress and robust PHP systems to modern Next.js applications, Wix solutions, and complete social presence—we engineer purposeful digital platforms tailored to your business.
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

      {/* 2. EDITORIAL AGENCY MANIFESTO & STANDARDS */}
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
                Most websites today are held together by 40 bloated plugins, slow drag-and-drop builders, and layers of account managers playing telephone. We do the opposite: <strong>clean, custom code engineered by hand</strong> across WordPress, Custom PHP, Wix, and Next.js for businesses that value speed, clarity, and real customer conversions.
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

            {/* Right Column: Engineering Benchmarks Ledger */}
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
                      <h4 className="benchmark-title">Versatile Architecture</h4>
                      <p className="benchmark-desc">Bespoke WordPress themes, custom PHP 8+ portals, Wix setups, or Next.js frontends engineered with clean semantic code that any professional engineer can scale.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CAPABILITIES DIRECTORY */}
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

      {/* 4. PLATFORM SELECTION GUIDE (WORDPRESS, PHP, WIX, NEXT.JS) */}
      <section className="section-platform-guide">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">03 // PLATFORM SELECTION GUIDE</span>
            <h2 className="editorial-section-title">The Right Platform for Your Business Goals</h2>
            <p className="editorial-section-subtitle">
              We select and engineer the technology stack that fits your operational requirements, internal team skills, and growth trajectory—with zero dogmatic lock-in.
            </p>
          </div>

          <div className="editorial-platform-grid reveal-stagger">
            {/* Platform 1: Custom WordPress & WooCommerce */}
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Content &amp; E-Commerce</span>
                  <div className="platform-icon-wrap">
                    <Layout size={18} />
                  </div>
                </div>
                <h3 className="platform-card-title">Custom WordPress &amp; WooCommerce</h3>
                <p className="platform-card-desc">
                  Ideal for businesses needing an intuitive editorial dashboard where non-technical team members can publish articles, update pages, and manage online stores with ease.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>ACF Pro custom fields (zero visual builder bloat)</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>WooCommerce custom checkout &amp; payment gateway</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Sub-second page speeds with optimized caching</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>100% full client ownership &amp; zero licensing fees</span>
                  </li>
                </ul>
              </div>
              <Link href="/services#website-development" className="platform-card-cta">
                <span>Explore WordPress Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Platform 2: Custom PHP & Database Systems */}
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Bespoke Logic</span>
                  <div className="platform-icon-wrap">
                    <Code size={18} />
                  </div>
                </div>
                <h3 className="platform-card-title">Custom PHP &amp; Database Systems</h3>
                <p className="platform-card-desc">
                  Ideal for companies requiring proprietary business tools, quotation calculators, multi-role client portals, and automated workflows without paying expensive monthly SaaS fees.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Tailored PHP 8+ MVC backend built for your workflow</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>High-performance MySQL / PostgreSQL relational data</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Custom RESTful APIs connecting external software</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Zero per-user monthly SaaS subscription fees</span>
                  </li>
                </ul>
              </div>
              <Link href="/services#custom-applications" className="platform-card-cta">
                <span>Explore Custom PHP Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Platform 3: Wix Studio & Low-Code CMS */}
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Fast Go-To-Market</span>
                  <div className="platform-icon-wrap">
                    <Sparkles size={18} />
                  </div>
                </div>
                <h3 className="platform-card-title">Wix Studio &amp; Low-Code CMS</h3>
                <p className="platform-card-desc">
                  Ideal for boutique creative portfolios, local service businesses, and rapid-launch marketing campaign pages that need polished design with zero server maintenance.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Rapid turnaround: launch high-converting pages quickly</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Fully managed cloud hosting, SSL &amp; security patches</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Granular responsive layout control across viewports</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Visual CMS allowing effortless client copy edits</span>
                  </li>
                </ul>
              </div>
              <Link href="/services#website-development" className="platform-card-cta">
                <span>Explore Wix Solutions</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Platform 4: Next.js & React Web Engineering */}
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Maximum Speed &amp; Scale</span>
                  <div className="platform-icon-wrap">
                    <Zap size={18} />
                  </div>
                </div>
                <h3 className="platform-card-title">Next.js &amp; React Platforms</h3>
                <p className="platform-card-desc">
                  Ideal for high-growth tech startups, SaaS landing platforms, and enterprise digital products demanding instant page rendering and peak Google Core Web Vitals.
                </p>
                <ul className="platform-features-list">
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Sub-700ms LCP speeds on global edge CDN networks</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Automated JSON-LD schemas &amp; OpenGraph previews</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Headless CMS integrations (Sanity, Strapi, WordPress)</span>
                  </li>
                  <li className="platform-feature-item">
                    <Check size={14} />
                    <span>Fluid interactive animations and component scalability</span>
                  </li>
                </ul>
              </div>
              <Link href="/services#website-development" className="platform-card-cta">
                <span>Explore Next.js Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE AGENCY TRUTH: BLOATED AGENCY VS ROUGHCLICK DIGITAL */}
      <section className="section-truth-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">04 // TRANSPARENCY &amp; STANDARDS</span>
            <h2 className="editorial-section-title">The Agency Truth: Bloat vs. Precision</h2>
            <p className="editorial-section-subtitle">
              A transparent breakdown of why bespoke engineering and direct builder communication outperform bloated agency retainers.
            </p>
          </div>

          <AgencyTruthComparison />
        </div>
      </section>

      {/* 6. CONNECTED DELIVERY TIMELINE */}
      <section className="section-lifecycle-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">05 // METHODOLOGY &amp; TIMELINE</span>
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
              <h3 className="timeline-step-title">Modular Platform Build</h3>
              <p className="timeline-step-desc">
                We develop clean semantic code—whether custom WordPress themes, tailored PHP/MySQL backends, Wix Studio setups, or Next.js frontends—rigorously tested across physical devices.
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

      {/* 7. CLIENT FAQ SECTION */}
      <section className="section-faq-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">06 // CLARITY &amp; TRANSPARENCY</span>
            <h2 className="editorial-section-title">Frequently Asked Questions</h2>
            <p className="editorial-section-subtitle">
              Straightforward answers about platform selection, source code ownership, technical stacks, and post-launch maintenance.
            </p>
          </div>

          <ClientFaqAccordion />
        </div>
      </section>

      {/* 8. EDITORIAL ARTICLES / PERSPECTIVES */}
      <section className="section-perspectives-fluid">
        <div className="rc-container">
          <div className="editorial-split-header reveal-on-scroll">
            <div>
              <span className="editorial-category-tag">07 // PERSPECTIVES &amp; ANALYSIS</span>
              <h2 className="editorial-section-title">Engineering Perspectives</h2>
              <p className="editorial-section-subtitle">
                Deep dives into modern web performance, custom software design, and digital brand equity.
              </p>
            </div>
            <Link href="/blog" className="btn-modern-primary" style={{ fontSize: '0.88rem', padding: '10px 22px' }}>
              <span>View All Articles</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="editorial-articles-grid reveal-stagger">
            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">Platform Guide</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog/wordpress-vs-nextjs-vs-wix-php-comparison-2026">
                  WordPress, Custom PHP, Wix, or Next.js: How to Choose the Right Platform in 2026
                </Link>
              </h3>
              <p className="article-excerpt">
                A practical guide for business owners comparing WordPress, custom PHP, Wix, and Next.js across speed, ease of editing, maintenance overhead, and total cost of ownership.
              </p>
              <Link href="/blog/wordpress-vs-nextjs-vs-wix-php-comparison-2026" className="article-read-link">
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </article>

            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">WordPress &amp; CMS</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog/custom-wordpress-development-performance-guide">
                  Why Custom WordPress Development Outperforms Pre-Built Themes in SEO &amp; Speed
                </Link>
              </h3>
              <p className="article-excerpt">
                Commercial themes bundle 40+ unneeded plugins that hurt your Google ranking. Discover how custom WordPress architecture with ACF Pro delivers blazing speeds and higher conversions.
              </p>
              <Link href="/blog/custom-wordpress-development-performance-guide" className="article-read-link">
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </article>

            <article className="editorial-article-entry reveal-card">
              <div className="article-meta-line">
                <span className="article-category">Custom Applications</span>
                <span className="article-date">Published Recently</span>
              </div>
              <h3 className="article-headline">
                <Link href="/blog/strategic-power-of-custom-php-web-development">
                  The Enduring Power of Custom PHP: When Tailored Code Beats Bloated SaaS
                </Link>
              </h3>
              <p className="article-excerpt">
                Why growing companies choose custom PHP and MySQL for internal portals, quotation tools, and database applications without paying thousands in recurring monthly SaaS fees.
              </p>
              <Link href="/blog/strategic-power-of-custom-php-web-development" className="article-read-link">
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
