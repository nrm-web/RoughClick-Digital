'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does a bespoke website or application take to build?',
    a: 'Most custom marketing websites take between 2 to 4 weeks from the initial scope call to production launch. Custom web applications and operational portals typically take 4 to 8 weeks depending on database models and user role complexity. We provide a guaranteed milestone schedule before starting, so you always know what is happening when.'
  },
  {
    q: 'Do you build custom WordPress websites, or do you only work with Next.js?',
    a: 'We build across both ecosystems! We believe in selecting the right architecture for your business rather than forcing one tool onto every project. If your team needs an intuitive editorial interface with rich blogging, WooCommerce e-commerce, or frequent in-house publishing, we engineer custom WordPress themes with Advanced Custom Fields (ACF Pro)—completely free of slow pre-built themes and plugin bloat. For high-growth tech platforms and digital brands demanding sub-second edge speeds, we engineer Next.js web applications. We also build fast Wix Studio sites and custom PHP applications.'
  },
  {
    q: 'Can you develop or maintain custom PHP web applications?',
    a: 'Yes, absolutely. We have extensive expertise in custom PHP 8+ and relational database architectures (MySQL/PostgreSQL). If your company needs a proprietary internal operations portal, quotation generator, inventory tracker, or client portal without paying thousands in recurring monthly per-seat SaaS subscription fees, we engineer tailor-made PHP web applications. We also modernize, debug, and maintain existing legacy PHP codebases.'
  },
  {
    q: 'How do I know whether WordPress, Custom PHP, Wix, or Next.js is right for my project?',
    a: 'During our discovery session, we evaluate your content update frequency, internal team skills, budget, and growth timeline. As a rule of thumb: WordPress is ideal for content-heavy sites and WooCommerce stores; custom PHP is best for proprietary business logic and database tools; Wix Studio is great for fast-launch marketing sites with zero server maintenance; and Next.js is optimal for high-performance SaaS platforms and digital products requiring peak Core Web Vitals.'
  },
  {
    q: 'Can our internal team update blog posts, services, and copy without touching code?',
    a: 'Absolutely. We architect our solutions with intuitive content structures (such as headless CMS integrations, custom WordPress ACF fields, or clean modular schemas). Your team can publish new articles, swap service descriptions, update pricing, and upload images effortlessly without any technical background.'
  },
  {
    q: 'Can you migrate our existing slow WordPress or PHP website without downtime?',
    a: 'Yes. We specialize in zero-downtime website migrations. Whether you are moving from a sluggish shared hosting setup to a modern cloud server, redesigning a bloated WordPress site into a clean custom theme, or migrating a legacy PHP database, we handle the entire transition. We implement 301 redirect mappings to ensure your existing Google search rankings and backlinks are 100% preserved.'
  },
  {
    q: 'Do I own the code, design files, and repository rights once we finish?',
    a: 'Yes, 100%. Upon project completion and final sign-off, all source code, GitHub repository access, database schemas, Figma design tokens, and digital assets belong entirely to your company. We never hold code hostage, and there are zero proprietary lock-in fees.'
  },
  {
    q: 'What happens after the project launches? Do you provide ongoing maintenance?',
    a: 'Every project includes a 30-day post-launch warranty with live performance and error monitoring. Following launch, we offer flexible month-to-month digital upkeep packages covering security patches, CMS core and plugin updates, Google Business Profile local SEO ranking upkeep, daily automated backups, and rapid graphic/content revisions.'
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
