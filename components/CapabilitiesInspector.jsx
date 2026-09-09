'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Layers, Share2, RefreshCw, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'web-architecture',
    icon: Globe,
    number: '01',
    tabTitle: 'Website Development',
    discipline: 'WEB ENGINEERING',
    heading: 'Hand-Crafted Web Presences Engineered for Real Conversion',
    summary: 'We build fast, bespoke websites written in clean modern code. Zero template bloat, zero heavy page builders — just instant load times, structured Google SEO schema, and seamless mobile responsiveness.',
    deliverables: [
      'Bespoke responsive layout built with Next.js 14 App Router',
      'Sub-0.7s load speeds optimizing Google Core Web Vitals',
      'Structured JSON-LD schema for top local and national search visibility',
      '100% full intellectual property & clean source code handoff'
    ],
    bestFor: 'Established businesses upgrading from slow WordPress/Wix sites, SaaS landing pages, and corporate platforms.',
    techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'Vercel Edge', 'JSON-LD Schema'],
    serviceHref: '/services#website-development'
  },
  {
    id: 'custom-applications',
    icon: Layers,
    number: '02',
    tabTitle: 'Custom Applications',
    discipline: 'SOFTWARE ENGINEERING',
    heading: 'Purpose-Built Business Tools & Interactive Portals',
    summary: 'Off-the-shelf software rarely fits exact business workflows. We engineer tailor-made client portals, operational dashboards, and automated web tools that eliminate manual spreadsheet headaches and streamline operations.',
    deliverables: [
      'Role-based authentication & secure enterprise user sessions',
      'Interactive operational dashboards with live status telemetry',
      'Custom business workflows with automated WhatsApp / email alerts',
      'Modular REST APIs and clean, scalable database architectures'
    ],
    bestFor: 'Growing companies outgrowing spreadsheets, booking workflows, internal team tools, and client collaboration portals.',
    techStack: ['React / Next.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Role-Based Auth'],
    serviceHref: '/services#custom-applications'
  },
  {
    id: 'creative-content',
    icon: Share2,
    number: '03',
    tabTitle: 'Social Media Content',
    discipline: 'CREATIVE DIRECTION',
    heading: 'Cohesive Visual Brand Storytelling & Content Systems',
    summary: 'High-recall brands are not built with generic templates. We develop comprehensive visual asset systems, high-impact carousel templates, motion graphics, and strategic campaigns that make your business look world-class.',
    deliverables: [
      'Bespoke visual identity kit, typographic hierarchy, and style guide',
      'High-conversion multi-slide carousel and promo asset templates',
      'Short-form motion graphics and branded dynamic video overlays',
      'Strategic editorial cadence guidelines for dependable brand recall'
    ],
    bestFor: 'Brands needing a premium, recognizable social media presence without hiring a full in-house creative team.',
    techStack: ['Figma Master Kit', 'Motion Graphics', 'Visual Standards', 'Multi-Format Export'],
    serviceHref: '/services#social-media-content'
  },
  {
    id: 'presence-upkeep',
    icon: RefreshCw,
    number: '04',
    tabTitle: 'Profile & Search Upkeep',
    discipline: 'LOCAL SEARCH & GROWTH',
    heading: 'Active Local Search Footprint & Continuous Web Upkeep',
    summary: 'Your digital presence does not stop at launch. We manage your Google Business Profile, local map rankings, post scheduling, framework security patches, and ongoing speed optimization so your business keeps growing.',
    deliverables: [
      'Google Business Profile optimization & local search ranking growth',
      'Scheduled post publishing & swift graphic asset refreshes',
      'Proactive Next.js framework updates, security checks, and backups',
      'Monthly Core Web Vitals speed monitoring and edge caching tuning'
    ],
    bestFor: 'Businesses wanting dependable technical upkeep, active search visibility, and zero maintenance headaches.',
    techStack: ['Google Maps SEO', 'Local Schema', 'Security Patches', 'Speed Audits'],
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
                <TabIcon size={16} className="tab-icon-svg" />
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
                {activeCap.number} // {activeCap.discipline}
              </span>
              <span className="editorial-status-dot">
                <span className="pulse-ping" />
                VERIFIED ARCHITECTURE
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
                  <IconComponent size={22} />
                </div>
                <div>
                  <div className="spec-tag-sub">DISCIPLINE SPECIFICATION</div>
                  <div className="spec-tag-main">{activeCap.tabTitle}</div>
                </div>
              </div>

              <div className="spec-hairline" />

              <div className="spec-stack-group">
                <span className="spec-hairline-label">TECHNOLOGY STACK</span>
                <div className="spec-pills-row">
                  {activeCap.techStack.map((tech, i) => (
                    <span key={i} className="spec-hairline-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="spec-metrics-ledger">
                <div className="spec-metric-entry">
                  <span className="spec-metric-label">PERFORMANCE GUARANTEE</span>
                  <span className="spec-metric-val">&lt; 0.7s LCP / 95+ Lighthouse</span>
                </div>
                <div className="spec-metric-entry">
                  <span className="spec-metric-label">CODE REPOSITORY RIGHTS</span>
                  <span className="spec-metric-val">100% Client Ownership (No Lock-In)</span>
                </div>
              </div>

              <div className="spec-cta-wrap">
                <Link href={activeCap.serviceHref} className="btn-modern-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>View Complete {activeCap.tabTitle} Scope</span>
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
