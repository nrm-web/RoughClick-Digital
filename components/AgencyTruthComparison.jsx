'use client';

import React from 'react';
import { Check, X, Code2, Zap, Users, LockOpen } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    category: 'Architecture & Engineering',
    tag: '01. FOUNDATION',
    icon: Code2,
    bloatedAgency: 'Over-reliance on heavy multipurpose templates and unvetted plugins that degrade speed and cause maintenance instability.',
    roughclick: 'Purpose-built architecture engineered with clean, semantic markup, modular styling, and only the plugins or dependencies your project actually requires.'
  },
  {
    category: 'Load Velocity & Core Web Vitals',
    tag: '02. PERFORMANCE',
    icon: Zap,
    bloatedAgency: 'Sluggish mobile load speeds and cumulative layout shifts that increase bounce rates and frustrate prospective customers.',
    roughclick: 'Engineered for sub-second initial rendering, optimized Core Web Vitals benchmarks, modern asset compression, and clean responsive layouts.'
  },
  {
    category: 'Direct Team Access',
    tag: '03. COLLABORATION',
    icon: Users,
    bloatedAgency: 'Multiple non-technical intermediaries delaying feedback and distorting project requirements during development.',
    roughclick: 'Direct communication with the technical developers and designers actively planning, coding, and launching your digital platform.'
  },
  {
    category: 'Code Ownership & Transparency',
    tag: '04. TRANSPARENCY',
    icon: LockOpen,
    bloatedAgency: 'Proprietary platform lock-in and opaque third-party accounts that make migrating or maintaining your website difficult.',
    roughclick: 'Full client ownership of all custom source code, templates, and digital assets created. You maintain direct control over your domain, hosting, and credentials.'
  }
];

export default function AgencyTruthComparison() {
  return (
    <div className="editorial-ledger-wrap reveal-on-scroll">
      {/* Table-Style Editorial Header (Hairline Border, Zero Box Cards) */}
      <div className="editorial-ledger-header">
        <div className="ledger-col-head typical-side">
          <span className="ledger-head-eyebrow">COMMON INDUSTRY PITFALLS</span>
          <h4 className="ledger-head-title">Typical Project Challenges</h4>
        </div>
        <div className="ledger-col-head roughclick-side">
          <span className="ledger-head-eyebrow accent-text">THE ROUGHCLICK STANDARD</span>
          <h4 className="ledger-head-title">Our Delivery Principles</h4>
        </div>
      </div>

      {/* Rows with Hairline Horizontal Dividers */}
      <div className="editorial-ledger-body">
        {COMPARISON_ROWS.map((row, idx) => {
          const RowIcon = row.icon;
          return (
            <div key={idx} className="editorial-ledger-row reveal-card">
              <div className="ledger-row-badge">
                <RowIcon size={14} className="ledger-row-icon" />
                <span>{row.tag} // {row.category}</span>
              </div>

              <div className="ledger-row-content">
                {/* Bloated Side */}
                <div className="ledger-side typical-side">
                  <div className="ledger-indicator muted-cross">
                    <X size={15} />
                  </div>
                  <p className="ledger-side-copy">{row.bloatedAgency}</p>
                </div>

                {/* RoughClick Standard Side */}
                <div className="ledger-side roughclick-side">
                  <div className="ledger-indicator vibrant-check">
                    <Check size={15} strokeWidth={2.5} />
                  </div>
                  <p className="ledger-side-copy bold-copy">{row.roughclick}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
