'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Which platform is right for my website?',
    a: 'That depends on what the website needs to do, how often you will update it, who will manage it, and the budget for building and maintaining it. We can compare suitable options before you commit to a platform.'
  },
  {
    q: 'Can you improve an existing website?',
    a: 'Yes. A review can identify issues with content, layout, accessibility, performance, enquiries, or maintainability. The recommendation may be targeted improvements or a broader rebuild, depending on the existing setup.'
  },
  {
    q: 'Do you work with WordPress, PHP, Wix, and Next.js?',
    a: 'These are part of the current service offering. The platform and development approach are chosen around the agreed requirement rather than applied automatically to every project.'
  },
  {
    q: 'Can our team update the website after launch?',
    a: 'Where content editing is part of the scope, the project can include an appropriate editing workflow. We will explain which items your team can manage and which changes need development support.'
  },
  {
    q: 'How much will the project cost, and how long will it take?',
    a: 'A meaningful estimate needs an agreed scope, content requirements, integrations, and review process. Your proposal should identify the planned work, dependencies, costs, and schedule. Changes to that scope may affect the estimate.'
  },
  {
    q: 'Who owns the website and accounts?',
    a: 'The proposal should explain ownership and access for custom work, domains, hosting, content, and third-party services. Platform subscriptions, licensed assets, plugins, and other third-party software remain subject to their own terms.'
  },
  {
    q: 'Do you provide maintenance and ongoing updates?',
    a: 'Ongoing support can be scoped separately for website upkeep, content updates, social publishing, or profile maintenance. The included tasks, responsibilities, and any additional costs should be agreed in advance.'
  },
  {
    q: 'Can you guarantee rankings, traffic, or a particular speed score?',
    a: 'These outcomes depend on the implementation, content, competition, hosting, devices, networks, and other factors. We can define appropriate checks and optimization work, but a platform choice or technical score alone does not guarantee business results.'
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

            <div className="editorial-faq-collapse" style={{ maxHeight: isOpen ? '340px' : '0' }}>
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
