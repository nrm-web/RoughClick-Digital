'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimationProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-stagger:not(.is-revealed), .reveal-card:not(.is-revealed), [data-reveal]:not(.is-revealed)'
      );
      targets.forEach((el) => {
        // If element is already in viewport or above, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run immediately and shortly after mount
    observeElements();
    const timer1 = setTimeout(observeElements, 100);
    const timer2 = setTimeout(observeElements, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
