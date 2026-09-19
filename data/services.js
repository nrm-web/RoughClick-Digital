/**
 * ROUGHCLICK DIGITAL - Client-Approved Multi-Platform Service Catalog
 * 
 * Includes all original client-approved services from live deployment (Static Website,
 * Dynamic Website, SEO Website, Web Upkeep, Custom Apps, Social Media) alongside the
 * requested WordPress, Custom PHP, Wix Studio, and CMS platform solutions.
 */

export const SERVICE_CATEGORIES = [
  {
    id: "website-development",
    aliases: ["website-services", "web-architecture", "wordpress-development", "php-development", "wix-development"],
    number: "01",
    tag: "Web Architecture & CMS",
    title: "Website Development",
    homeDescription: "Static websites, dynamic web platforms, custom WordPress & WooCommerce, robust PHP applications, Wix Studio, and high-performance Next.js architectures.",
    fullDescription: "We engineer responsive, clean-coded, and SEO-optimized web platforms across static builds, dynamic applications, WordPress, custom PHP, Wix Studio, and Next.js. Whether your priority is instantaneous static speed, a database-backed dynamic portal, an easily editable corporate WordPress site, or an enterprise Next.js React platform, we engineer the optimal architecture tailored to your specific business goals, budget, and growth timeline.",
    valueProposition: "Your website is your primary digital headquarters. Rather than forcing a single framework onto every project, we assess your operational needs and deliver the right balance of speed, content freedom, search visibility, and maintainability.",
    benefits: [
      "Custom responsive layouts built on clean semantic code (Static, Dynamic, PHP, WordPress & Wix)",
      "Sub-second load speeds optimizing Google Core Web Vitals",
      "Structured SEO schema (JSON-LD) and automated metadata generation",
      "Modular components engineered for seamless scalability",
      "Bespoke WordPress & WooCommerce theme builds with zero plugin bloat",
      "Tailor-made PHP 8+ architectures for proprietary business workflows",
      "Wix Studio & visual CMS setups for fast-turnaround, client-editable sites"
    ],
    groups: [
      {
        groupId: "core-web-engineering",
        groupTitle: "Web Engineering Disciplines",
        services: [
          {
            name: "Static Website Development",
            desc: "Ultra-fast, lightweight, and secure static builds designed for maximum uptime, high security, and zero server bloat. Built with clean HTML5/CSS3 and modern Jamstack architectures."
          },
          {
            name: "Dynamic Website Development",
            desc: "Database-backed corporate platforms, client portals, custom PHP & Next.js backends, interactive user flows, and dynamic data-driven experiences engineered for scale."
          },
          {
            name: "SEO-Optimized Website Development",
            desc: "Structured data schemas (JSON-LD), semantic markup, commercial keyword optimization, search engine compliance, and high crawlability for organic search dominance."
          }
        ]
      },
      {
        groupId: "wordpress-php-cms",
        groupTitle: "WordPress, PHP & CMS Platforms",
        services: [
          {
            name: "Custom WordPress Development",
            desc: "Bespoke WordPress theme architecture with Advanced Custom Fields (ACF Pro), lightweight clean code, zero commercial theme bloat, and intuitive drag-and-drop content editing for your team."
          },
          {
            name: "WooCommerce E-Commerce Stores",
            desc: "High-converting online storefronts with custom product filters, secure payment gateway integrations (Stripe, PayPal, Razorpay), automated invoice generation, and inventory tracking."
          },
          {
            name: "Custom PHP Web Applications",
            desc: "Tailored PHP 8+ solutions built with clean MVC architectures for businesses requiring proprietary logic, high-performance database processing, and freedom from recurring SaaS subscription fees."
          },
          {
            name: "Wix Studio & Low-Code CMS",
            desc: "Fast-launch marketing websites and boutique portfolios built on Wix Studio and modern visual CMS platforms, allowing non-technical marketing teams to publish updates effortlessly."
          },
          {
            name: "CMS Migration & Maintenance",
            desc: "Seamless, zero-downtime website migrations between platforms (e.g., legacy PHP to WordPress, WordPress to Next.js), paired with automated daily backups, security monitoring, and regular updates."
          }
        ]
      },
      {
        groupId: "web-support-optimization",
        groupTitle: "Web Upkeep & Optimization",
        services: [
          {
            name: "Website Maintenance & Support",
            desc: "Reliable technical upkeep, continuous security monitoring, regular framework updates, daily cloud backups, and prompt bug fixes."
          },
          {
            name: "Speed & Performance Optimization",
            desc: "Asset minification, responsive image compression (WebP/AVIF), script deferral, database query tuning, and CDN edge caching to achieve sub-second load times."
          },
          {
            name: "Website Redesign & Modernization",
            desc: "Transform outdated digital presences into clean, modern, mobile-first, and conversion-focused experiences that restore user trust."
          }
        ]
      }
    ]
  },
  {
    id: "custom-applications",
    aliases: ["custom-application-development", "software-engineering", "internal-tools"],
    number: "02",
    tag: "Custom Engineering",
    title: "Custom Application Development",
    homeDescription: "Tailored web applications, internal business portals, real-time analytics dashboards, and automated operational tools.",
    fullDescription: "Scale your business operations with purpose-built digital tools. We architect resilient web applications, interactive management dashboards, and specialized software systems that automate manual overhead and unlock productivity.",
    valueProposition: "Avoid the constraints of generic software. We develop custom applications tailored precisely to your operational workflow, data requirements, and client interaction models.",
    benefits: [
      "Bespoke application logic aligned with your exact business processes",
      "Secure authentication, role-based access, and encrypted endpoints",
      "Intuitive real-time dashboards visualizing actionable KPIs",
      "Clean RESTful APIs ready for cross-platform integration"
    ],
    groups: [
      {
        groupId: "custom-application-disciplines",
        groupTitle: "Application Engineering Disciplines",
        services: [
          {
            name: "Custom Web Applications",
            desc: "Full-stack tailored platforms engineered with high performance, scalability, and robust cloud hosting."
          },
          {
            name: "Business & Internal Applications",
            desc: "Operations portals, employee dashboards, quotation tools, and automated business workflow systems."
          },
          {
            name: "Interactive Analytics Dashboards",
            desc: "Real-time telemetry panels and data visualizers with multi-tier role filtering and reporting."
          },
          {
            name: "Specialized Software Solutions",
            desc: "Domain-specific digital tools and automation routines tailored to unique enterprise challenges."
          }
        ]
      }
    ]
  },
  {
    id: "social-media-content",
    aliases: ["social-media-content-creation", "social-media-services", "creative-design"],
    number: "03",
    tag: "Creative Visuals",
    title: "Social Media Content Creation",
    homeDescription: "Strategic visual storytelling, annual content planning, high-impact carousels, and consistent brand asset systems.",
    fullDescription: "Transform your social media channels into authoritative brand assets. We craft strategic multi-channel creative campaigns, high-impact carousel systems, and refined brand visual kits that elevate recall.",
    valueProposition: "Generic posts are ignored. We develop intentional, cohesive visual systems that reflect your brand authority across Instagram, LinkedIn, Facebook, and video platforms.",
    benefits: [
      "Cohesive brand visual language across every social channel",
      "Thematic editorial roadmaps preventing gaps in communication",
      "Educational multi-slide carousels engineered for engagement",
      "Export packages optimized for desktop and mobile feeds"
    ],
    groups: [
      {
        groupId: "social-content-disciplines",
        groupTitle: "Creative Content Disciplines",
        services: [
          {
            name: "Annual Creative Content Planning",
            desc: "52-week editorial roadmaps, quarterly thematic pillars, and recurring visual hooks for reliable presence."
          },
          {
            name: "Social Media Post & Carousel Creatives",
            desc: "High-resolution graphic assets, multi-slide educational carousels, and promotional campaign banners."
          },
          {
            name: "Reels & Short-Form Video Editing",
            desc: "Clean, paced short video formats and motion snippets calibrated for modern vertical feeds."
          },
          {
            name: "Brand Asset Design Systems",
            desc: "Standardized story kits, channel banners, highlight covers, and brand visual guidelines."
          }
        ]
      }
    ]
  },
  {
    id: "social-media-management",
    aliases: ["social-media-post-updating", "business-profile-services", "local-seo", "complete-digital-presence"],
    number: "04",
    tag: "Channel Operations & Local SEO",
    title: "Social Media Management & Digital Presence",
    homeDescription: "Scheduled post publishing, Google Business Profile optimization, local map rankings, and complete profile synchronization.",
    fullDescription: "Reliable post publishing schedules, swift asset adjustments, and continuous channel hygiene so your brand always remains active, verified, and discovered on Google Maps and directories.",
    valueProposition: "Never let your channels go stale. Our ongoing management keeps your social profiles updated, your local business listings verified, and your brand touchpoints synchronized.",
    benefits: [
      "Consistent, dependable publishing schedules with zero missed slots",
      "Rapid turnaround for announcements, banner refreshes, and bio updates",
      "Verified Google Business Profile and local maps presence",
      "Monthly channel hygiene reviews ensuring all links and info stay accurate"
    ],
    groups: [
      {
        groupId: "social-management-disciplines",
        groupTitle: "Management & Profile Operations",
        services: [
          {
            name: "Regular Post Updating & Publishing",
            desc: "Organized multi-platform publishing following consistent weekly schedules."
          },
          {
            name: "Ongoing Channel Maintenance Support",
            desc: "Rapid turnaround for notices, bio revisions, profile banner updates, and asset adjustments."
          },
          {
            name: "Google Business Profile & Maps Setup",
            desc: "Creation, verification, category optimization, and accurate location pinning on Google & Bing."
          },
          {
            name: "Complete Digital Presence Sync",
            desc: "Unified interconnection across your website, social channels, and local business directories."
          }
        ]
      }
    ]
  }
];

export const SERVICE_SELECT_OPTIONS = [
  { value: "static-website", label: "Static Website Development" },
  { value: "dynamic-website", label: "Dynamic Website Development" },
  { value: "custom-wordpress", label: "Custom WordPress & WooCommerce Development" },
  { value: "custom-php", label: "Custom PHP Web Application / Database Portal" },
  { value: "wix-cms", label: "Wix Studio / Modern Low-Code CMS Website" },
  { value: "nextjs-engineering", label: "Next.js & React High-Performance Web App" },
  { value: "custom-applications", label: "Custom Business Software & Internal Tools" },
  { value: "social-media-content", label: "Social Media Content Creation & Design" },
  { value: "social-media-management", label: "Social Media Management & Local SEO" },
  { value: "complete-digital-presence", label: "Complete Digital Presence & SEO Package" },
  { value: "other", label: "Other Inquiries" }
];
