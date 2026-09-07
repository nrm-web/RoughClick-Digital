import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/data/config';
import { BLOG_POSTS } from '@/data/blogs';
import HeroParticles from '@/components/HeroParticles';
import { 
  ArrowRight, Globe, Layers, Share2, RefreshCw, 
  Zap, Target, Sparkles, Box, CheckCircle2, Clock
} from 'lucide-react';

export const metadata = {
  title: 'RoughClick Digital | Ideas in Motion',
  description: 'RoughClick Digital transforms ideas into purposeful digital experiences — from high-performance websites and custom applications to social media content and business presence solutions.'
};

export default function HomePage() {
  const latestBlogs = BLOG_POSTS.slice(0, 3);

  return (
    <>
      {/* 1. HERO SECTION (Dual-Concept Responsive Hero with Metrics & Interactive Canvas) */}
      <section className="mockup-hero">
        {/* Interactive Particle Network Canvas */}
        <HeroParticles />

        {/* Animated Background Atmosphere */}
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="rc-container">
          <div className="hero-grid-2col">
            <div>
              <span className="hero-eyebrow-tag">ROUGHCLICK DIGITAL</span>
              
              <h1 className="hero-main-title">
                Turning Ideas Into
                <span className="text-cyan">Digital Experiences</span>
              </h1>
              
              <p className="hero-subtext">
                From websites and custom applications to social media content, we create purposeful digital experiences designed around your business.
              </p>
              
              <div className="hero-btn-group">
                <Link href="/contact" className="btn-pill-cyan">
                  <span>Let's Build Something</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/services" className="btn-pill-outline">
                  <span>Explore Services</span>
                </Link>
              </div>

              {/* Live KPI Metric Strip */}
              <div className="kpi-metric-strip">
                <div className="kpi-stat-item">
                  <div className="kpi-stat-number">99.9%</div>
                  <div className="kpi-stat-label">System Uptime</div>
                </div>
                <div className="kpi-stat-item">
                  <div className="kpi-stat-number">&lt; 0.7s</div>
                  <div className="kpi-stat-label">Load Speed</div>
                </div>
                <div className="kpi-stat-item">
                  <div className="kpi-stat-number">100%</div>
                  <div className="kpi-stat-label">Custom Architecture</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase (Theme-Aware with Floating Micro-Badges) */}
            <div className="hero-visual-frame">
              {/* Floating Badge 1: Top Left */}
              <div className="floating-hero-badge badge-pos-top-left" aria-hidden="true">
                <span className="badge-pulse-indicator" />
                <span className="badge-text-primary">&lt; 0.7s</span>
                <span className="badge-text-secondary">Sub-Second Speed</span>
              </div>

              {/* Floating Badge 2: Bottom Right */}
              <div className="floating-hero-badge badge-pos-bottom-right" aria-hidden="true">
                <span className="badge-pulse-indicator success" />
                <span className="badge-text-primary">99.9%</span>
                <span className="badge-text-secondary">System Availability</span>
              </div>

              {/* Concept 2 Light Mode Visual */}
              <div className="hero-visual-light-wrap">
                <img
                  src="/brand/hero_option_devices.jpg"
                  alt="RoughClick Digital Ecosystem Showcase"
                  className="hero-visual-light"
                />
              </div>

              {/* Concept 1 Dark Mode Visual: Luxury Gold Ecosystem */}
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

      {/* 2. BRAND INTRODUCTION / ABOUT SECTION (Dedicated Spacious Card) */}
      <section className="section-about">
        <div className="rc-container">
          <div className="brand-intro-card reveal-on-scroll">
            <div className="responsive-2col-grid">
              <div>
                <span className="rc-badge" style={{ marginBottom: 14 }}>About Us</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-heading)', marginTop: 8, marginBottom: 14 }}>
                  Focused On Business Solutions
                </h2>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.75, fontSize: '1.02rem', maxWidth: 540 }}>
                  <strong>RoughClick Digital</strong> transforms ideas into purposeful digital experiences — from high-performance websites and custom software tools to full-cycle social media management.
                </p>
                <div style={{ marginTop: 20 }}>
                  <Link href="/services" className="link-teal-arrow">
                    <span>Explore Our Capabilities</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="brand-intro-highlight">
                <p className="brand-quote">
                  &ldquo;Designed around your business. Built on modern web architecture for real-world growth.&rdquo;
                </p>
                <div className="brand-pillars-mini">
                  <div className="brand-pillar-item">
                    <strong style={{ color: 'var(--color-accent)' }}>01</strong>
                    <span>Zero Template Bloat</span>
                  </div>
                  <div className="brand-pillar-item">
                    <strong style={{ color: 'var(--color-accent)' }}>02</strong>
                    <span>Clean Modular Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE DIGITAL SERVICES SECTION (4 Balanced Cards with Deliverable Pills) */}
      <section className="section-services bg-subtle">
        <div className="rc-container">
          <div className="section-header-centered reveal-on-scroll">
            <span className="rc-badge">What We Do</span>
            <h2 className="section-title">Core Digital Services</h2>
            <p className="section-subtitle">
              Modular service offerings built to scale seamlessly as your business expands.
            </p>
          </div>

          <div className="modern-services-grid reveal-stagger">
            {/* Service 1: Website Development */}
            <article className="modern-service-card reveal-card">
              <div>
                <div className="service-icon-box icon-box-mint">
                  <Globe size={24} className="icon-svg-globe" />
                </div>
                <h3 className="service-card-heading">Website Development</h3>
                <p className="service-card-desc">
                  High-performance static, dynamic, and SEO-optimized web presences engineered for search ranking and conversion.
                </p>
                <div className="modern-pill-list">
                  <span className="modern-pill">Static Web</span>
                  <span className="modern-pill">Dynamic Portals</span>
                  <span className="modern-pill">SEO-Optimized</span>
                </div>
              </div>
              <Link href="/services#website-development" className="modern-link-arrow">
                <span>View Deliverables</span>
                <ArrowRight size={14} />
              </Link>
            </article>

            {/* Service 2: Custom Application Development */}
            <article className="modern-service-card reveal-card">
              <div>
                <div className="service-icon-box icon-box-blue">
                  <Layers size={24} className="icon-svg-layers" />
                </div>
                <h3 className="service-card-heading">Custom Applications</h3>
                <p className="service-card-desc">
                  Custom web applications, business automation software, real-time dashboards, and specialized digital tools.
                </p>
                <div className="modern-pill-list">
                  <span className="modern-pill">Custom Web Apps</span>
                  <span className="modern-pill">Business Tools</span>
                  <span className="modern-pill">Dashboards</span>
                </div>
              </div>
              <Link href="/services#custom-applications" className="modern-link-arrow">
                <span>View Deliverables</span>
                <ArrowRight size={14} />
              </Link>
            </article>

            {/* Service 3: Social Media Content Creation */}
            <article className="modern-service-card reveal-card">
              <div>
                <div className="service-icon-box icon-box-amber">
                  <Share2 size={24} className="icon-svg-share" />
                </div>
                <h3 className="service-card-heading">Social Media Content</h3>
                <p className="service-card-desc">
                  Strategic visual storytelling, annual campaign planning, high-impact creatives, and brand asset systems.
                </p>
                <div className="modern-pill-list">
                  <span className="modern-pill">Annual Content</span>
                  <span className="modern-pill">Social Creatives</span>
                  <span className="modern-pill">Asset Design</span>
                </div>
              </div>
              <Link href="/services#social-media-content" className="modern-link-arrow">
                <span>View Deliverables</span>
                <ArrowRight size={14} />
              </Link>
            </article>

            {/* Service 4: Social Media Post Updating / Management */}
            <article className="modern-service-card reveal-card">
              <div>
                <div className="service-icon-box icon-box-emerald">
                  <RefreshCw size={24} className="icon-svg-refresh" />
                </div>
                <h3 className="service-card-heading">Social Media Management</h3>
                <p className="service-card-desc">
                  Scheduled post management, swift graphic updates, ongoing maintenance, and consistent profile upkeep.
                </p>
                <div className="modern-pill-list">
                  <span className="modern-pill">Post Updates</span>
                  <span className="modern-pill">Maintenance Support</span>
                  <span className="modern-pill">Ongoing Upkeep</span>
                </div>
              </div>
              <Link href="/services#social-media-management" className="modern-link-arrow">
                <span>View Deliverables</span>
                <ArrowRight size={14} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 4. THE ENGINEERING ADVANTAGE / WHY US (4 Clean Pillar Cards) */}
      <section className="section-pillars">
        <div className="rc-container">
          <div className="section-header-centered reveal-on-scroll">
            <span className="rc-badge">Why RoughClick Digital</span>
            <h2 className="section-title">The Engineering Advantage</h2>
            <p className="section-subtitle">
              We combine clean technological execution with brand clarity and business-driven design.
            </p>
          </div>

          <div className="modern-pillars-grid reveal-stagger">
            <div className="modern-pillar-card reveal-card">
              <div className="pillar-icon-wrap">
                <Zap size={22} className="pillar-svg-zap" />
              </div>
              <h3 className="pillar-card-title">Engineered for Speed</h3>
              <p className="pillar-card-desc">
                Optimized for sub-second speeds, zero code bloat, and top Core Web Vitals performance across all devices.
              </p>
            </div>

            <div className="modern-pillar-card reveal-card">
              <div className="pillar-icon-wrap">
                <Target size={22} className="pillar-svg-target" />
              </div>
              <h3 className="pillar-card-title">Business-Aligned Solutions</h3>
              <p className="pillar-card-desc">
                Every build is customized around your business workflow and operational goals rather than constrained by templates.
              </p>
            </div>

            <div className="modern-pillar-card reveal-card">
              <div className="pillar-icon-wrap">
                <Sparkles size={22} className="pillar-svg-sparkles" />
              </div>
              <h3 className="pillar-card-title">Digital Innovation</h3>
              <p className="pillar-card-desc">
                Fluid micro-interactions, responsive states, and kinetic digital storytelling that keep users engaged.
              </p>
            </div>

            <div className="modern-pillar-card reveal-card">
              <div className="pillar-icon-wrap">
                <Box size={22} className="pillar-svg-box" />
              </div>
              <h3 className="pillar-card-title">Modular Architecture</h3>
              <p className="pillar-card-desc">
                Easily expand your digital services portfolio as your business scales over time without rebuilding from scratch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-STAGE PROCESS / OUR APPROACH (Clean Milestone Workflow) */}
      <section className="section-process bg-subtle">
        <div className="rc-container">
          <div className="section-header-centered reveal-on-scroll">
            <span className="rc-badge">Our Process</span>
            <h2 className="section-title">Structured 4-Stage Approach</h2>
            <p className="section-subtitle">
              A transparent, milestone-driven delivery lifecycle engineered for reliability and long-term momentum.
            </p>
          </div>

          <div className="modern-process-grid reveal-stagger">
            <div className="modern-process-step reveal-card">
              <div className="modern-step-num">STAGE 01</div>
              <h3 className="step-title">Discovery</h3>
              <p className="step-desc">
                Analyzing business requirements, target audience, and operational goals to establish a clear architectural roadmap.
              </p>
            </div>

            <div className="modern-process-step reveal-card">
              <div className="modern-step-num">STAGE 02</div>
              <h3 className="step-title">Architecture</h3>
              <p className="step-desc">
                Defining system data models, UI wireframes, UX flows, and design components tailored specifically to your brand.
              </p>
            </div>

            <div className="modern-process-step reveal-card">
              <div className="modern-step-num">STAGE 03</div>
              <h3 className="step-title">Development</h3>
              <p className="step-desc">
                Building with clean semantic HTML, modular CSS, modern React frameworks, and robust software standards.
              </p>
            </div>

            <div className="modern-process-step reveal-card">
              <div className="modern-step-num">STAGE 04</div>
              <h3 className="step-title">Deployment</h3>
              <p className="step-desc">
                Production rollout, SEO verification, performance audit, and ongoing maintenance support for uninterrupted growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED WORK / CASE STUDIES (3 Clean Polished Showcase Cards) */}
      <section className="section-portfolio">
        <div className="rc-container">
          <div className="section-header-flex reveal-on-scroll">
            <div>
              <span className="rc-badge">Portfolio</span>
              <h2 className="section-title" style={{ marginBottom: 6 }}>Featured Work Demonstrations</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                High-impact showcases across corporate web portals, business tools, and brand visual kits.
              </p>
            </div>
            <Link href="/services" className="btn-modern-secondary" style={{ padding: '10px 22px' }}>
              <span>View All Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="modern-portfolio-grid reveal-stagger">
            {/* Card 1 */}
            <div className="modern-portfolio-card reveal-card">
              <div className="modern-portfolio-frame">
                <span className="portfolio-frame-badge">Website Frame</span>
                <img src="/brand/fw_laptop.png" alt="Corporate Web Platform" className="portfolio-thumb-img" />
              </div>
              <div className="modern-portfolio-content">
                <span className="portfolio-cat-tag">Website Development</span>
                <h3 className="portfolio-card-title">High-Traffic Corporate Portal</h3>
                <p className="portfolio-card-desc">
                  SEO-optimized web presence with sub-second page rendering and clean modular architecture.
                </p>
                <Link href="/services#website-development" className="modern-link-arrow">
                  <span>Explore Architecture</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="modern-portfolio-card reveal-card">
              <div className="modern-portfolio-frame">
                <span className="portfolio-frame-badge">Application Frame</span>
                <img src="/brand/fw_tablet.png" alt="Operations & Analytics Hub" className="portfolio-thumb-img" />
              </div>
              <div className="modern-portfolio-content">
                <span className="portfolio-cat-tag">Custom Application</span>
                <h3 className="portfolio-card-title">Operations & Analytics Hub</h3>
                <p className="portfolio-card-desc">
                  Real-time KPI telemetry, automated workflow queues, and role-based client administration tools.
                </p>
                <Link href="/services#custom-applications" className="modern-link-arrow">
                  <span>Explore Architecture</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="modern-portfolio-card reveal-card">
              <div className="modern-portfolio-frame">
                <span className="portfolio-frame-badge">Content Frame</span>
                <img src="/brand/fw_phone.png" alt="Multi-Platform Visual System" className="portfolio-thumb-img" />
              </div>
              <div className="modern-portfolio-content">
                <span className="portfolio-cat-tag">Social Media Content</span>
                <h3 className="portfolio-card-title">Multi-Platform Visual System</h3>
                <p className="portfolio-card-desc">
                  Year-round thematic content templates, motion assets, and scheduled channel management.
                </p>
                <Link href="/services#social-media-content" className="modern-link-arrow">
                  <span>Explore Architecture</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST INSIGHTS / KNOWLEDGE HUB (3 Clean Connected Blog Cards) */}
      <section className="section-blog bg-subtle">
        <div className="rc-container">
          <div className="section-header-flex reveal-on-scroll">
            <div>
              <span className="rc-badge">Knowledge Hub</span>
              <h2 className="section-title" style={{ marginBottom: 6 }}>Latest Perspectives</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                Practical viewpoints on web engineering, social consistency, and digital growth.
              </p>
            </div>
            <Link href="/blog" className="btn-modern-secondary" style={{ padding: '10px 22px' }}>
              <span>View All Blogs</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="modern-blog-grid reveal-stagger">
            {latestBlogs.map((post) => (
              <article key={post.slug} className="modern-blog-card reveal-card">
                <div>
                  <div className="blog-card-meta">
                    <span className="blog-cat-badge">{post.category}</span>
                    <span className="blog-read-time">
                      <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="blog-card-excerpt">
                    {post.excerpt}
                  </p>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Link href={`/blog/${post.slug}`} className="modern-link-arrow">
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FULL-WIDTH CTA BANNER (High-Impact Conversion Banner) */}
      <section className="section-cta-banner">
        <div className="rc-container">
          <div className="cta-banner-full reveal-on-scroll">
            <div className="cta-ambient-glow" aria-hidden="true" />
            <span className="rc-badge" style={{ marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Let's Connect
            </span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', color: '#FFFFFF', marginBottom: 14 }}>
              Ready to Build Something Meaningful?
            </h2>
            <p style={{ maxWidth: 640, margin: '0 auto 2.2rem auto', color: 'var(--hero-sub-color)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              Get in touch with our Coimbatore team for website builds, custom software applications, and social media creative solutions.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-pill-cyan">
                <span>Let's Build Something</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-pill-outline">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

