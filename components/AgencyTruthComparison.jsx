'use client';

import React from 'react';
import { Check, X, Code2, Zap, Users, LockOpen } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    category: 'Architecture & Engineering',
    tag: '01. FOUNDATION',
    icon: Code2,
    bloatedAgency: 'Generic WordPress themes or drag-and-drop page builders bogged down with 30+ plugins that break upon updates.',
    roughclick: 'Clean Next.js 14 React architecture hand-crafted with zero template bloat and modular, maintainable code.'
  },
  {
    category: 'Load Velocity & Core Web Vitals',
    tag: '02. PERFORMANCE',
    icon: Zap,
    bloatedAgency: '3.5s to 5.0s load speeds on mobile; failing Google Core Web Vitals leading to lost customer inquiries.',
    roughclick: 'Engineered for sub-0.7s instant rendering with 95+ Google Lighthouse scores and superior edge caching.'
  },
  {
    category: 'Direct Team Access',
    tag: '03. COLLABORATION',
    icon: Users,
    bloatedAgency: 'Non-technical account managers playing telephone between you and offshore junior contractors.',
    roughclick: 'Direct communication with the lead software engineer and designer actually crafting your solution.'
  },
  {
    category: 'Code Ownership & Freedom',
    tag: '04. AUTONOMY',
    icon: LockOpen,
    bloatedAgency: 'Proprietary platform lock-in, monthly hostage maintenance fees, and restricted server access.',
    roughclick: '100% full source code and intellectual property ownership delivered directly to your private repository.'
  }
];

export default function AgencyTruthComparison() {
  return (
    <div className="editorial-ledger-wrap reveal-on-scroll">
      {/* Table-Style Editorial Header (Hairline Border, Zero Box Cards) */}
      <div className="editorial-ledger-header">
        <div className="ledger-col-head typical-side">
          <span className="ledger-head-eyebrow">INDUSTRY STATUS QUO</span>
          <h4 className="ledger-head-title">The Bloated Agency Model</h4>
        </div>
        <div className="ledger-col-head roughclick-side">
          <span className="ledger-head-eyebrow accent-text">THE ROUGHCLICK DIGITAL STANDARD</span>
          <h4 className="ledger-head-title">How We Build For You</h4>
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
