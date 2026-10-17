import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Layers, Share2, RefreshCw, Zap, ShieldCheck, Clock, Users, Sparkles, MessageSquare, Terminal, FileCode, Check, Code2, Code, Layout, Cpu } from 'lucide-react';
import HeroParticles from '@/components/HeroParticles';
import CapabilitiesInspector from '@/components/CapabilitiesInspector';
import AgencyTruthComparison from '@/components/AgencyTruthComparison';
import ClientFaqAccordion from '@/components/ClientFaqAccordion';
import { StartProjectButton, ScheduleCallButton } from '@/components/QuickBookingModal';
import { AnimatedLayout, AnimatedCode, AnimatedSparkles, AnimatedZap } from '@/components/AnimatedPlatformIcons';

export const metadata = {
  title: 'Websites, Applications & Digital Services | RoughClick Digital',
  description: 'RoughClick Digital helps businesses plan and build websites, custom applications, social content, and ongoing digital presence support.',
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
                <span className="hero-title-prefix">Websites and Digital Tools</span>{' '}
                <span className="text-cyan hero-title-accent">Built Around Your Business</span>
              </h1>

              <p className="hero-subtext">
                Bring your services, workflows, and online presence together with a website or digital solution shaped around your business. RoughClick Digital helps with planning, design, development, and ongoing updates.
              </p>

              <div className="hero-btn-group">
                <StartProjectButton className="btn-pill-cyan">
                  <span>Discuss Your Project</span>
                  <ArrowRight size={16} />
                </StartProjectButton>
                <Link href="/services" className="btn-pill-secondary">
                  <span>Explore Services</span>
                </Link>
              </div>

              <div className="hero-metrics-strip">
                <div className="hero-metric-item">
                  <div className="metric-bold">Business-First Planning</div>
                  <div className="metric-label">Start with your goals and users.</div>
                </div>
                <div className="hero-metric-item">
                  <div className="metric-bold">Clear Deliverables</div>
                  <div className="metric-label">Understand the agreed project scope.</div>
                </div>
                <div className="hero-metric-item">
                  <div className="metric-bold">Practical Support</div>
                  <div className="metric-label">Plan for updates after launch.</div>
                </div>
              </div>
            </div>

            <div className="hero-visual-frame">
              <div className="floating-hero-badge badge-pos-top-left" aria-hidden="true">
                <span className="badge-pulse-indicator" />
                <div className="badge-text-col">
                  <span className="badge-text-primary">Built for Your Business</span>
                  <span className="badge-text-secondary">Websites, applications, and digital presence</span>
                </div>
              </div>

              <div className="floating-hero-badge badge-pos-bottom-right" aria-hidden="true">
                <span className="badge-pulse-indicator" />
                <div className="badge-text-col">
                  <span className="badge-text-primary">From Plan to Launch</span>
                  <span className="badge-text-secondary">Design, development, and handoff</span>
                </div>
              </div>

              <div className="hero-visual-light-wrap">
                <picture className="hero-visual-light">
                  <source media="(max-width: 768px)" srcSet="/brand/hero_option_devices_mobile.webp" type="image/webp" />
                  <source srcSet="/brand/hero_option_devices.webp" type="image/webp" />
                  <img
                    src="/brand/hero_option_devices.webp"
                    alt="RoughClick Digital Ecosystem Showcase"
                    width={620}
                    height={346}
                    fetchPriority="high"
                    decoding="async"
                    className="hero-visual-img"
                  />
                </picture>
              </div>

              <div className="hero-visual-dark-wrap">
                <picture className="hero-visual-dark">
                  <source media="(max-width: 768px)" srcSet="/brand/hero_option_devices_gold_mobile.webp" type="image/webp" />
                  <source srcSet="/brand/hero_option_devices_gold.webp" type="image/webp" />
                  <img
                    src="/brand/hero_option_devices_gold.webp"
                    alt="RoughClick Digital Luxury Ecosystem Showcase"
                    width={620}
                    height={346}
                    fetchPriority="high"
                    decoding="async"
                    className="hero-visual-img"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL AGENCY MANIFESTO & WORKING PRINCIPLES */}
      <section className="editorial-manifesto-section">
        <div className="rc-container">
          <div className="editorial-manifesto-grid reveal-on-scroll">
            {/* Left Column: Clear Way to Build */}
            <div className="manifesto-left-col">
              <span className="editorial-category-tag">
                01 // ABOUT ROUGHCLICK DIGITAL
              </span>
              <h2 className="manifesto-headline">
                A Clearer Way to Build Your Digital Presence
              </h2>
              <p className="manifesto-lead-p">
                Your website should explain your business, make the next step easy, and remain practical to manage. Your internal tools should support the way your team works. Your social channels should help customers recognize and understand your brand.
              </p>
              <p className="manifesto-body-p">
                RoughClick Digital brings these needs together through website development, custom applications, social content, and digital presence support. We begin with the problem you want to solve, then recommend a suitable approach for your content, budget, and ongoing responsibilities.
              </p>
              <div className="manifesto-action-row">
                <Link href="/services" className="editorial-link-arrow">
                  <span>Explore Our Services</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Working Principles Ledger */}
            <div className="manifesto-right-col">
              <div className="editorial-benchmarks-ledger reveal-card">
                <div className="benchmarks-header">
                  <span className="benchmarks-header-title">WORKING PRINCIPLES</span>
                  <span className="benchmarks-header-tag">CLEAR COMMITMENTS</span>
                </div>

                <div className="benchmarks-list">
                  <div className="benchmark-entry">
                    <div className="benchmark-idx">01</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Understand the Requirement</h4>
                      <p className="benchmark-desc">Define what the website or tool needs to do, who will use it, and how success will be assessed before choosing a platform.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">02</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Keep the Scope Clear</h4>
                      <p className="benchmark-desc">Agree the pages, features, content responsibilities, and review stages so everyone knows what is being delivered.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">03</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Choose Maintainable Solutions</h4>
                      <p className="benchmark-desc">Consider updates, hosting, integrations, and future changes as part of the build rather than leaving them until launch.</p>
                    </div>
                  </div>

                  <div className="benchmark-entry">
                    <div className="benchmark-idx">04</div>
                    <div className="benchmark-content">
                      <h4 className="benchmark-title">Explain the Handoff</h4>
                      <p className="benchmark-desc">Make ownership, account access, licenses, documentation, and ongoing support responsibilities clear in the proposal.</p>
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
            <span className="editorial-category-tag">02 // WHAT WE DO</span>
            <h2 className="editorial-section-title">Digital Services That Support Your Business</h2>
            <p className="editorial-section-subtitle">
              Explore the type of support you need. We can help define the right scope if your project spans more than one service.
            </p>
          </div>

          <CapabilitiesInspector />
        </div>
      </section>

      {/* 4. PLATFORM SELECTION GUIDE (WORDPRESS, PHP, WIX, NEXT.JS) */}
      <section className="section-platform-guide">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">03 // CHOOSING A PLATFORM</span>
            <h2 className="editorial-section-title">Start With the Requirement, Then Choose the Technology</h2>
            <p className="editorial-section-subtitle">
              Compare content editing, functionality, integrations, maintenance, and ongoing costs before choosing the platform for your website.
            </p>
          </div>

          <div className="editorial-platform-grid reveal-stagger">
            {/* Platform 1: Custom WordPress & WooCommerce */}
            <div className="editorial-platform-card reveal-card">
              <div>
                <div className="platform-card-header">
                  <span className="platform-badge">Content &amp; E-Commerce</span>
                  <div className="platform-icon-wrap">
                    <AnimatedLayout size={18} />
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
                    <span>Full custom theme ownership &amp; client-managed hosting</span>
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
                    <AnimatedCode size={18} />
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
                    <span>Zero recurring per-user SaaS license fees</span>
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
                    <AnimatedSparkles size={18} />
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
                    <AnimatedZap size={18} />
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

      {/* 5. OUR WORKING APPROACH & STANDARDS */}
      <section className="section-truth-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">04 // HOW WE WORK</span>
            <h2 className="editorial-section-title">Clear Decisions From the First Conversation</h2>
            <p className="editorial-section-subtitle">
              A useful digital project needs more than a design or a technology choice. It needs an agreed purpose, a manageable scope, and clear responsibilities.
            </p>
          </div>

          <AgencyTruthComparison />
        </div>
      </section>

      {/* 6. CONNECTED DELIVERY TIMELINE */}
      <section className="section-lifecycle-fluid">
        <div className="rc-container">
          <div className="editorial-section-head reveal-on-scroll">
            <span className="editorial-category-tag">05 // FROM IDEA TO LAUNCH</span>
            <h2 className="editorial-section-title">A Project Process You Can Follow</h2>
            <p className="editorial-section-subtitle">
              The exact stages depend on the project. The stages below show how requirements, reviews, and responsibilities fit together.
            </p>
          </div>

          <div className="editorial-timeline-flow reveal-stagger">
            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">01</span>
              </div>
              <h3 className="timeline-step-title">Understand and Scope</h3>
              <p className="timeline-step-desc">
                Discuss the business goal, existing setup, audience, required features, and available content. Agree a suitable approach and a proposal before work begins.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Agreed scope and responsibilities.</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">02</span>
              </div>
              <h3 className="timeline-step-title">Design and Review</h3>
              <p className="timeline-step-desc">
                Review the proposed layout or workflow and provide feedback at the agreed checkpoints. Resolve important content and functionality decisions before they become expensive to change.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Approved design and user flow.</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">03</span>
              </div>
              <h3 className="timeline-step-title">Build and Verify</h3>
              <p className="timeline-step-desc">
                Develop the agreed scope and check the important journeys, content, responsive layouts, accessibility, and technical behavior.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: A reviewable version with test results.</span>
              </div>
            </div>

            <div className="timeline-step-entry reveal-card">
              <div className="timeline-node-header">
                <span className="timeline-step-num">04</span>
              </div>
              <h3 className="timeline-step-title">Launch and Handoff</h3>
              <p className="timeline-step-desc">
                Complete the agreed release checks, confirm account access and responsibilities, and provide the handoff material included in the proposal.
              </p>
              <div className="timeline-deliverable-line">
                <span className="deliverable-arrow">↳</span>
                <span className="deliverable-text">Milestone Output: Approved release and handoff.</span>
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
            <h2 className="editorial-section-title">Questions Before You Start</h2>
            <p className="editorial-section-subtitle">
              Straightforward answers about platform selection, source code ownership, project scoping, and ongoing maintenance.
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
              <span className="editorial-category-tag">07 // PRACTICAL GUIDES</span>
              <h2 className="editorial-section-title">Useful Reading Before Your Next Digital Project</h2>
              <p className="editorial-section-subtitle">
                Clear explanations of website choices, business tools, content planning, and maintaining your online presence.
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
                  WordPress, PHP, Wix, or Next.js: Choosing a Platform
                </Link>
              </h3>
              <p className="article-excerpt">
                Compare editing needs, functionality, maintenance, and ongoing costs before choosing how your website will be built.
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
                  Custom WordPress Development: Benefits and Tradeoffs
                </Link>
              </h3>
              <p className="article-excerpt">
                Understand when a tailored WordPress approach helps, what it changes, and what still needs ongoing attention.
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
                  When a Custom PHP Application Makes Business Sense
                </Link>
              </h3>
              <p className="article-excerpt">
                Evaluate a custom business tool against the workflow, integrations, ownership, and maintenance it will require.
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
              LET'S DISCUSS YOUR REQUIREMENT
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: 14 }}>
              What Would You Like Your Website or Digital Tools to Do Better?
            </h2>
            <p style={{ maxWidth: 640, margin: '0 auto 2.2rem auto', color: 'var(--hero-sub-color)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Tell us about your business, your current setup, and the problem you want to solve. We can help you define a suitable starting point.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
              <StartProjectButton className="btn-pill-cyan">
                <span>Discuss Your Project</span>
                <ArrowRight size={16} />
              </StartProjectButton>
              <Link href="/contact" className="btn-pill-secondary" style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <span>Contact Us</span>
              </Link>
            </div>
            <div className="editorial-cta-trust" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              <span>Websites</span>
              <span className="trust-dot" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
              <span>Custom Applications</span>
              <span className="trust-dot" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
              <span>Social Content</span>
              <span className="trust-dot" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
              <span>Digital Presence</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
