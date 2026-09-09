'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does a bespoke website or application take to build?',
    a: 'Most custom marketing websites take between 2 to 4 weeks from the initial scope call to production launch. Custom web applications and operational portals typically take 4 to 8 weeks depending on database models and user role complexity. We provide a guaranteed milestone schedule before starting, so you always know what is happening when.'
  },
  {
    q: 'Do I own the code, design files, and assets once we finish?',
    a: 'Yes, 100%. Upon project completion and final sign-off, full intellectual property rights, GitHub repository access, Figma design tokens, and digital assets belong entirely to your company. We never hold code hostage, and there are zero proprietary lock-in fees.'
  },
  {
    q: 'Why do you build with Next.js instead of WordPress or Wix?',
    a: 'WordPress platforms depend on dozens of conflicting plugins that slow load speeds to 3-5 seconds, create security vulnerabilities, and frequently break upon updates. Next.js produces clean, pre-rendered React code deployed directly to global edge networks that loads in under 700ms. Google explicitly rewards sub-second speeds with higher organic search rankings.'
  },
  {
    q: 'Can our internal team update blog posts, services, and copy without touching code?',
    a: 'Absolutely. We architect our solutions with intuitive content structures (such as headless CMS integrations or clean modular schemas). Your team can publish new articles, swap service descriptions, update pricing, and upload images effortlessly without any technical background.'
  },
  {
    q: 'What happens after the project launches? Do you provide ongoing support?',
    a: 'Every build includes 30 days of comprehensive post-launch warranty and live telemetry monitoring. Following that period, we offer flexible month-to-month digital upkeep packages covering security patches, Google Business Profile local search upkeep, and ongoing creative feature additions.'
  }
];

export default function ClientFaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="editorial-faq-container">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div 
            key={idx} 
            className={`editorial-faq-item ${isOpen ? 'is-open' : ''} reveal-card`}
          >
            <button
              type="button"
              className="editorial-faq-trigger"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span className="editorial-faq-number">0{idx + 1}</span>
              <span className="editorial-faq-question">{faq.q}</span>
              <span className="editorial-faq-icon">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            <div className="editorial-faq-collapse" style={{ maxHeight: isOpen ? '280px' : '0' }}>
              <div className="editorial-faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
