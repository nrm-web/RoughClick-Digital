'use client';

import React from 'react';

/**
 * Animated Platform Icons
 * 
 * Replaces static icons with bespoke, GPU-accelerated micro-animated SVGs
 * matching the animated aesthetic of the Capabilities Inspector tab bar (Image 5).
 * 
 * 1. AnimatedLayout (WordPress & WooCommerce) -> Modular CMS layout & block assembly motion
 * 2. AnimatedCode (Custom PHP & Database Systems) -> Dynamic bracket expansion & typing cursor
 * 3. AnimatedSparkles (Wix Studio & Low-Code CMS) -> Multi-tier shimmering stars & twinkle cycle
 * 4. AnimatedZap (Next.js & React Platforms) -> Kinetic lightning surge & electric energy pulse
 */

export function AnimatedLayout({ size = 18, className = '' }) {
  return (
    <span className={`platform-animated-icon icon-layout-container ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-svg-platform-layout"
      >
        {/* Outer browser/canvas window */}
        <rect x="3" y="3" width="18" height="18" rx="2" className="anim-layout-frame" />
        {/* Top header navigation bar */}
        <line x1="3" y1="9" x2="21" y2="9" className="anim-layout-header" />
        {/* Sidebar divider */}
        <line x1="9" y1="21" x2="9" y2="9" className="anim-layout-sidebar" />
        {/* Modular content blocks inside body */}
        <line x1="13" y1="13" x2="18" y2="13" className="anim-layout-block anim-layout-block-1" strokeWidth="1.8" />
        <line x1="13" y1="17" x2="16.5" y2="17" className="anim-layout-block anim-layout-block-2" strokeWidth="1.8" />
      </svg>
    </span>
  );
}

export function AnimatedCode({ size = 18, className = '' }) {
  return (
    <span className={`platform-animated-icon icon-code-container ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-svg-platform-code"
      >
        {/* Left angle bracket < */}
        <polyline points="8 6 2 12 8 18" className="anim-code-bracket anim-code-left" />
        {/* Center blinking code cursor */}
        <line x1="12" y1="8" x2="12" y2="16" className="anim-code-cursor" strokeWidth="2.2" />
        {/* Right angle bracket > */}
        <polyline points="16 18 22 12 16 6" className="anim-code-bracket anim-code-right" />
      </svg>
    </span>
  );
}

export function AnimatedSparkles({ size = 18, className = '' }) {
  return (
    <span className={`platform-animated-icon icon-sparkles-container ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-svg-platform-sparkles"
      >
        {/* Primary center 4-point star */}
        <path
          d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
          className="anim-sparkle-primary"
        />
        {/* Top-right sparkle */}
        <path d="M5 3v4" className="anim-sparkle-star-1" />
        <path d="M3 5h4" className="anim-sparkle-star-1" />
        {/* Bottom-right / bottom sparkle */}
        <path d="M19 17v4" className="anim-sparkle-star-2" />
        <path d="M17 19h4" className="anim-sparkle-star-2" />
      </svg>
    </span>
  );
}

export function AnimatedZap({ size = 18, className = '' }) {
  return (
    <span className={`platform-animated-icon icon-zap-container ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-svg-platform-zap"
      >
        <polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          className="anim-zap-bolt"
        />
      </svg>
    </span>
  );
}
