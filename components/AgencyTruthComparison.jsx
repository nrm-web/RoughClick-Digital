'use client';

import React from 'react';
import { Check, X, Code2, Zap, Users, LockOpen } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    category: 'Agreed Scope',
    tag: '01. DEFINITION',
    icon: Code2,
    question: 'What Are We Building?',
    approach: 'We define the audience, pages, features, content, and important user journeys before development begins.'
  },
  {
    category: 'Review Checkpoints',
    tag: '02. PROGRESS',
    icon: Zap,
    question: 'How Will We Review Progress?',
    approach: 'The proposal sets out review stages, required inputs, and the process for approving work or requesting changes.'
  },
  {
    category: 'Operational Access',
    tag: '03. RESPONSIBILITY',
    icon: Users,
    question: 'What Will the Business Manage?',
    approach: 'We explain the editing workflow, account access, hosting, licenses, and day-to-day responsibilities.'
  },
  {
    category: 'Post-Launch Support',
    tag: '04. CONTINUITY',
    icon: LockOpen,
    question: 'What Happens After Launch?',
    approach: 'Handoff and ongoing support are agreed as part of the scope, with additional work and third-party costs identified separately.'
  }
];

export default function AgencyTruthComparison() {
  return (
    <div className="editorial-ledger-wrap reveal-on-scroll">
      {/* Table-Style Editorial Header (Hairline Border, Zero Box Cards) */}
      <div className="editorial-ledger-header">
        <div className="ledger-col-head typical-side">
          <span className="ledger-head-eyebrow">PROJECT QUESTION</span>
          <h4 className="ledger-head-title">Key Question Before Building</h4>
        </div>
        <div className="ledger-col-head roughclick-side">
          <span className="ledger-head-eyebrow accent-text">OUR APPROACH</span>
          <h4 className="ledger-head-title">How We Keep Decisions Clear</h4>
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
                {/* Project Question Side */}
                <div className="ledger-side typical-side">
                  <div className="ledger-indicator" style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#00B89C' }}>
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <p className="ledger-side-copy" style={{ fontWeight: 700, fontSize: '1.02rem' }}>{row.question}</p>
                </div>

                {/* Our Approach Side */}
                <div className="ledger-side roughclick-side">
                  <div className="ledger-indicator vibrant-check">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <p className="ledger-side-copy bold-copy">{row.approach}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
