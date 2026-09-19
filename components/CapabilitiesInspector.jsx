'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Layers, Share2, RefreshCw, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

function AnimatedGlobe({ size = 16, className = '' }) {
  return (
    <span
      className={`animated-globe-container ${className}`}
      style={{ width: size, height: size, display: 'inline-flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-svg-globe"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path className="meridian-sweep-1" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path className="meridian-sweep-2" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      </svg>
    </span>
  );
}

const CAPABILITIES = [
  {
    id: 'web-architecture',
    icon: Globe,
    number: '01',
    tabTitle: 'Website Development',
    discipline: 'WEB ENGINEERING & CMS ARCHITECTURE',
    heading: 'Static Websites, Dynamic Web Platforms & Custom CMS Architectures',
    summary: 'We build responsive, clean-coded, and SEO-optimized web presences across static builds, dynamic platforms, WordPress, custom PHP, Wix Studio, and Next.js. Whether your priority is instantaneous static speed, an interactive dynamic portal, an easily editable corporate WordPress & WooCommerce site, or an enterprise Next.js React platform, we engineer the optimal architecture with zero bloat and sub-second load times.',
    deliverables: [
      'Static Website Development: Ultra-fast, lightweight, and secure static builds with zero server bloat',
      'Dynamic Website Development: Database-backed corporate platforms, client portals & real-time workflows',
      'SEO-Optimized Website Development: Structured data schemas (JSON-LD), semantic markup & high crawlability',
      'Custom WordPress & WooCommerce Development: Bespoke ACF Pro themes, zero plugin bloat & custom storefronts',
      'Custom PHP 8+ Web Applications: Clean MVC architectures, MySQL/PostgreSQL backends & workflow automation',
      'Wix Studio & Visual CMS Setup: Fast-turnaround marketing websites, boutique portfolios & client-editable sites',
      'Website Maintenance, Speed Optimization & Modernization: Sub-second speeds, security upkeep & legacy redesign'
    ],
    bestFor: 'Businesses seeking tailored web engineering—from ultra-fast static sites to dynamic PHP portals, custom WordPress stores, fast Wix sites, or enterprise Next.js applications.',
    techStack: ['Static & Dynamic Web', 'WordPress', 'Custom PHP', 'WooCommerce', 'Wix Studio', 'Next.js 15', 'SEO Schema'],
    statusBadge: 'VERIFIED ARCHITECTURE',
    stackLabel: 'TECHNOLOGY & FRAMEWORK STACK',
    metrics: [
      { label: 'PERFORMANCE & SPEED', val: 'Sub-Second Speeds / Core Web Vitals' },
      { label: 'SOURCE CODE RIGHTS', val: '100% Client Ownership (No Lock-In)' }
    ],
    serviceHref: '/services#website-development'
  },
  {
    id: 'custom-applications',
    icon: Layers,
    number: '02',
    tabTitle: 'Custom Applications',
    discipline: 'ENTERPRISE SOFTWARE TOOLS & PORTALS',
    heading: 'Custom Web Applications, Business Portals & Operational Dashboards',
    summary: 'Scale your business operations with purpose-built digital tools engineered in custom PHP, Node.js, and React. We architect resilient web applications, interactive management dashboards, and specialized software systems that automate manual overhead and unlock productivity.',
    deliverables: [
      'Custom Web Applications: Full-stack tailored platforms engineered with high performance, scalability & cloud hosting',
      'Business & Internal Applications: Operations portals, employee dashboards, quotation tools & automated workflows',
      'Interactive Analytics Dashboards: Real-time telemetry panels, data visualizers & multi-tier role filtering',
      'Specialized Software Solutions: Domain-specific digital tools and automation routines for unique business challenges',
      'REST APIs & System Integrations: Secure endpoints connecting CRMs, payment gateways, ERPs & WhatsApp Business APIs',
      'Role-Based Access Control: Enterprise RBAC, multi-factor auth, encrypted endpoints & 100% client code ownership'
    ],
    bestFor: 'Operations managers, logistics portals, employee task queues, bespoke quotation tools, and businesses avoiding costly SaaS subscriptions.',
    techStack: ['Custom Web Apps', 'PHP 8+ / Node.js', 'React / Next.js', 'PostgreSQL / MySQL', 'REST APIs', 'RBAC Security'],
    statusBadge: 'VERIFIED ARCHITECTURE',
    stackLabel: 'ENGINEERING & ARCHITECTURE STACK',
    metrics: [
      { label: 'SECURITY & COMPLIANCE', val: 'Role-Based RBAC / Encrypted Endpoints' },
      { label: 'IP & CODE RIGHTS', val: '100% Full Client Source Rights' }
    ],
    serviceHref: '/services#custom-applications'
  },
  {
    id: 'creative-content',
    icon: Share2,
    number: '03',
    tabTitle: 'Social Media Content',
    discipline: 'CREATIVE DIRECTION & BRAND ASSETS',
    heading: 'Annual Content Planning, Carousel Systems & Brand Visual Assets',
    summary: 'Transform your social media channels into authoritative brand assets. We craft strategic multi-channel creative campaigns, high-impact educational carousels, short-form video assets, and refined visual design systems that elevate brand recall across Instagram, LinkedIn, Facebook, and video platforms.',
    deliverables: [
      'Annual Creative Content Planning: 52-week editorial roadmaps, quarterly thematic pillars & recurring visual hooks',
      'Social Media Post & Carousel Creatives: High-resolution graphic assets, multi-slide educational carousels & campaign banners',
      'Reels & Short-Form Video Editing: Clean, paced vertical video formats and motion snippets calibrated for modern feeds',
      'Brand Asset Design Systems: Standardized story kits, channel banners, highlight covers & brand visual guidelines',
      'Multi-Format Export Packages: Assets calibrated and optimized for desktop, mobile vertical feeds & ad networks'
    ],
    bestFor: 'Brands needing a premium, recognizable social media presence without hiring a full in-house creative team.',
    techStack: ['Annual Planning', 'Carousel Creatives', 'Reels & Video', 'Brand Asset Kits', 'Multi-Format Export'],
    statusBadge: 'ACTIVE CREATIVE SYSTEM',
    stackLabel: 'CREATIVE TOOLKIT & ASSET FORMATS',
    metrics: [
      { label: 'CREATIVE ASSET RIGHTS', val: '100% Full Asset & Source Ownership' },
      { label: 'EDITORIAL CADENCE', val: '52-Week Structured Consistency' }
    ],
    serviceHref: '/services#social-media-content'
  },
  {
    id: 'presence-upkeep',
    icon: RefreshCw,
    number: '04',
    tabTitle: 'Profile & Search Upkeep',
    discipline: 'CHANNEL OPERATIONS & LOCAL SEARCH',
    heading: 'Scheduled Post Publishing, Google Maps Setup & Digital Presence Sync',
    summary: 'Reliable post publishing schedules, swift asset adjustments, and continuous channel hygiene so your brand always remains active, verified, and discovered on Google Maps and directories.',
    deliverables: [
      'Regular Post Updating & Publishing: Organized multi-platform publishing following consistent weekly schedules',
      'Ongoing Channel Maintenance Support: Rapid turnaround for notices, bio revisions, profile banner updates & asset tweaks',
      'Google Business Profile & Maps Setup: Creation, verification, category optimization & accurate location pinning on Google & Bing',
      'Complete Digital Presence Sync: Unified interconnection across your website, social channels, and local business directories',
      'Proactive Security Updates & Speed Audits: Regular patches, daily backups, edge caching tuning & Core Web Vitals audits'
    ],
    bestFor: 'Businesses wanting dependable technical upkeep, active search visibility, verified Google Maps presence, and zero maintenance headaches.',
    techStack: ['Scheduled Publishing', 'Google Maps Setup', 'Channel Maintenance', 'Digital Presence Sync', 'Local SEO'],
    statusBadge: 'CONTINUOUS CHANNEL SYNC',
    stackLabel: 'MANAGEMENT CHANNELS & DIRECTORIES',
    metrics: [
      { label: 'LOCAL SEARCH VISIBILITY', val: 'Google Maps & Business Verification' },
      { label: 'CHANNEL HYGIENE', val: 'Continuous Upkeep & Directory Sync' }
    ],
    serviceHref: '/services#social-media-management'
  }
];

export default function CapabilitiesInspector() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCap = CAPABILITIES[activeIdx];
  const IconComponent = activeCap.icon;

  return (
    <div className="editorial-capabilities-wrapper">
      {/* Sleek Minimalist Tab Navigation Bar (Highlighted, Animated Symbols) */}
      <div className="editorial-tabs-bar" role="tablist" aria-label="Core Capabilities">
        {CAPABILITIES.map((cap, idx) => {
          const isActive = activeIdx === idx;
          const TabIcon = cap.icon;
          const symbolClass =
            cap.id === 'web-architecture' ? 'tab-symbol-globe' :
            cap.id === 'custom-applications' ? 'tab-symbol-layers' :
            cap.id === 'creative-content' ? 'tab-symbol-share' :
            'tab-symbol-refresh';

          return (
            <button
              key={cap.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveIdx(idx)}
              className={`editorial-tab-trigger ${isActive ? 'is-active' : ''}`}
            >
              <span className="tab-idx-mono">{cap.number}</span>
              <span className={`tab-symbol-wrap ${symbolClass}`}>
                {cap.id === 'web-architecture' ? (
                  <AnimatedGlobe size={16} />
                ) : (
                  <TabIcon
                    size={16}
                    className={`tab-icon-svg ${cap.id === 'custom-applications' ? 'icon-svg-layers' : ''}`}
                  />
                )}
              </span>
              <span className="tab-label-text">{cap.tabTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Fluid Editorial Canvas Display (Zero Outer Box, Zero Nested Cards) */}
      <div className="editorial-cap-canvas reveal-card" key={activeCap.id}>
        <div className="editorial-cap-grid">
          {/* Main Description & Deliverables */}
          <div className="editorial-cap-main">
            <div className="editorial-cap-meta">
              <span className="editorial-section-tag">
                <span className="tag-prefix">DISCIPLINE</span>
                <span className="tag-sep">•</span>
                <span className="tag-name">{activeCap.discipline}</span>
              </span>
              <span className="editorial-status-dot">
                <span className="pulse-ping" />
                {activeCap.statusBadge || 'VERIFIED ARCHITECTURE'}
              </span>
            </div>

            <h3 className="editorial-cap-title">
              {activeCap.heading}
            </h3>

            <p className="editorial-cap-lead">
              {activeCap.summary}
            </p>

            <div className="editorial-deliverables-block">
              <h4 className="deliverables-subheading">VERIFIED DELIVERABLES &amp; HANDOFFS</h4>
              <div className="editorial-checklist">
                {activeCap.deliverables.map((item, i) => (
                  <div key={i} className="editorial-check-row">
                    <span className="editorial-check-icon">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="editorial-check-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="editorial-best-fit">
              <span className="best-fit-label">BEST SUITED FOR:</span>
              <span className="best-fit-desc">{activeCap.bestFor}</span>
            </div>
          </div>

          {/* Right Column: Architectural Spec Ledger (Clean Lines, No Heavy Card) */}
          <div className="editorial-cap-sidebar">
            <div className="editorial-spec-sheet">
              <div className="spec-sheet-top">
                <div className="spec-icon-glyph">
                  {activeCap.id === 'web-architecture' ? (
                    <AnimatedGlobe size={22} />
                  ) : (
                    <IconComponent
                      size={22}
                      className={activeCap.id === 'custom-applications' ? 'icon-svg-layers' : ''}
                    />
                  )}
                </div>
                <div>
                  <div className="spec-tag-sub">DISCIPLINE SPECIFICATION</div>
                  <div className="spec-tag-main">{activeCap.tabTitle}</div>
                </div>
              </div>

              <div className="spec-hairline" />

              <div className="spec-stack-group">
                <span className="spec-hairline-label">{activeCap.stackLabel || 'TECHNOLOGY STACK'}</span>
                <div className="spec-pills-row">
                  {activeCap.techStack.map((tech, i) => (
                    <span key={i} className="spec-hairline-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="spec-metrics-ledger">
                {activeCap.metrics ? (
                  activeCap.metrics.map((metric, i) => (
                    <div key={i} className="spec-metric-entry">
                      <span className="spec-metric-label">{metric.label}</span>
                      <span className="spec-metric-val">{metric.val}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="spec-metric-entry">
                      <span className="spec-metric-label">PERFORMANCE &amp; QUALITY</span>
                      <span className="spec-metric-val">Sub-Second Speeds / Zero Bloat</span>
                    </div>
                    <div className="spec-metric-entry">
                      <span className="spec-metric-label">CODE REPOSITORY RIGHTS</span>
                      <span className="spec-metric-val">100% Client Ownership (No Lock-In)</span>
                    </div>
                  </>
                )}
              </div>

              <div className="spec-cta-wrap">
                <Link href={activeCap.serviceHref} className="btn-modern-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>View Complete Scope</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
