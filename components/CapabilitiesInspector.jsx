'use client';

import React, { useState, useRef } from 'react';
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
    discipline: 'WEBSITE DEVELOPMENT',
    heading: 'Websites That Explain Your Business and Make Enquiries Easier',
    summary: 'Build a new business website, improve an existing site, or create an online store with the pages and features your customers need. The platform is chosen around content editing, functionality, budget, and ongoing maintenance.',
    deliverables: [
      'Static business and campaign websites',
      'Dynamic websites and content-managed pages',
      'WordPress and WooCommerce development',
      'Custom PHP and Next.js website functionality',
      'Wix Studio setup and client-editable layouts',
      'Website redesign, performance review, and maintenance'
    ],
    bestFor: 'Businesses that need a useful website with clear information, a suitable enquiry or purchase flow, and manageable updates.',
    techStack: ['Static Websites', 'WordPress', 'WooCommerce', 'PHP', 'Wix Studio', 'Next.js'],
    statusBadge: 'SERVICE SCOPE',
    stackLabel: 'PLATFORMS & TECHNOLOGIES',
    metrics: [
      { label: 'SCOPE AGREEMENT', val: 'Scope agreed before build begins' },
      { label: 'CONTENT EDITING', val: 'Editing approach matched to your team' },
      { label: 'HANDOFF & HOSTING', val: 'Hosting and support clearly explained' }
    ],
    serviceHref: '/services#website-development',
    linkText: 'Explore Website Development'
  },
  {
    id: 'custom-applications',
    icon: Layers,
    number: '02',
    tabTitle: 'Custom Applications',
    discipline: 'CUSTOM APPLICATIONS',
    heading: 'Tools Built Around the Way Your Team Works',
    summary: 'Turn a defined business process into a practical application. We help map users, information, approvals, and reporting before building the features needed for that workflow.',
    deliverables: [
      'Quotation and estimation tools',
      'Client and internal operations portals',
      'Role-based dashboards and reporting',
      'Database-backed applications',
      'Integrations with agreed external systems',
      'Workflow automation and application modernization'
    ],
    bestFor: 'Teams dealing with repeated manual work or information spread across disconnected tools.',
    techStack: ['PHP', 'Databases (MySQL / PostgreSQL)', 'REST APIs', 'React', 'Next.js'],
    statusBadge: 'SERVICE SCOPE',
    stackLabel: 'ENGINEERING & ARCHITECTURE',
    metrics: [
      { label: 'WORKFLOW DEFINITION', val: 'Workflow defined first' },
      { label: 'ACCESS & DATA', val: 'Access and data handling considered' },
      { label: 'MAINTENANCE', val: 'Maintenance included in planning' }
    ],
    serviceHref: '/services#custom-applications',
    linkText: 'Explore Custom Applications'
  },
  {
    id: 'creative-content',
    icon: Share2,
    number: '03',
    tabTitle: 'Social Media Content',
    discipline: 'SOCIAL MEDIA CONTENT',
    heading: 'Content That Makes Your Business Easier to Recognize',
    summary: 'Give your social channels a consistent visual direction and a useful mix of content. We help plan and create material around your services, customers\' questions, announcements, and available brand assets.',
    deliverables: [
      'Editorial topics and content calendars',
      'Social posts and multi-slide carousels',
      'Reels and short-form video editing',
      'Campaign graphics and announcements',
      'Profile banners, story templates, and reusable brand assets'
    ],
    bestFor: 'Businesses that need planned, consistent creative content rather than occasional disconnected posts.',
    techStack: ['Content Planning', 'Visual Design', 'Carousels', 'Short Video', 'Brand Assets'],
    statusBadge: 'SERVICE SCOPE',
    stackLabel: 'CREATIVE FORMATS & PLANNING',
    metrics: [
      { label: 'CHANNELS & FORMATS', val: 'Agreed channels and formats' },
      { label: 'APPROVAL FLOW', val: 'Structured approval workflow' },
      { label: 'OUTPUT CADENCE', val: 'Defined content quantities' }
    ],
    serviceHref: '/services#social-media-content',
    linkText: 'Explore Content Creation'
  },
  {
    id: 'presence-upkeep',
    icon: RefreshCw,
    number: '04',
    tabTitle: 'Digital Presence Support',
    discipline: 'DIGITAL PRESENCE SUPPORT',
    heading: 'Keep Your Online Information Current and Connected',
    summary: 'Support the ongoing work behind an active business presence. This can include publishing approved posts, updating channel information, maintaining website content, and helping with local business profiles.',
    deliverables: [
      'Publishing to agreed social channels',
      'Profile descriptions, banners, and contact updates',
      'Google Business Profile and directory assistance',
      'Website and channel information checks',
      'Ongoing content and digital upkeep'
    ],
    bestFor: 'Businesses that need defined, recurring support to keep their digital touchpoints accurate.',
    techStack: ['Publishing', 'Profile Updates', 'Local Presence', 'Channel Upkeep'],
    statusBadge: 'SERVICE SCOPE',
    stackLabel: 'MANAGEMENT CHANNELS & PROFILES',
    metrics: [
      { label: 'RESPONSIBILITIES', val: 'Responsibilities agreed upfront' },
      { label: 'PLATFORM STANDARDS', val: 'Platform requirements respected' },
      { label: 'CHANGE REVIEW', val: 'All changes reviewed prior to update' }
    ],
    serviceHref: '/services#social-media-management',
    linkText: 'Explore Digital Presence Support'
  }
];

export default function CapabilitiesInspector() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef([]);
  const activeCap = CAPABILITIES[activeIdx];
  const IconComponent = activeCap.icon;

  const handleKeyDown = (e, idx) => {
    let nextIdx = null;
    if (e.key === 'ArrowRight') {
      nextIdx = (idx + 1) % CAPABILITIES.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (idx - 1 + CAPABILITIES.length) % CAPABILITIES.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = CAPABILITIES.length - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="editorial-capabilities-wrapper">
      {/* Sleek Minimalist Tab Navigation Bar (Highlighted, Animated Symbols, Roving TabIndex - RC-15) */}
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
              ref={(el) => (tabRefs.current[idx] = el)}
              id={`capability-tab-${cap.id}`}
              role="tab"
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-controls={`capability-panel-${cap.id}`}
              onClick={() => setActiveIdx(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
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

      {/* Fluid Editorial Canvas Display (Accessible Tabpanel Pattern - RC-15) */}
      <div
        id={`capability-panel-${activeCap.id}`}
        role="tabpanel"
        aria-labelledby={`capability-tab-${activeCap.id}`}
        tabIndex={0}
        className="editorial-cap-canvas reveal-card"
        key={activeCap.id}
      >
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
              <h4 className="deliverables-subheading">DELIVERABLES &amp; SCOPE</h4>
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
                  <span>{activeCap.linkText || 'View Complete Scope'}</span>
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
