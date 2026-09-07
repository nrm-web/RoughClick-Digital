/**
 * ROUGHCLICK DIGITAL - Client-Provided Approved Service Catalog
 * 
 * Central data architecture designed so additional services or categories
 * can easily be added without redesigning the website.
 */

export const SERVICE_CATEGORIES = [
  {
    id: "website-development",
    aliases: ["website-services", "web-architecture"],
    number: "01",
    tag: "Web Architecture",
    title: "Website Development",
    homeDescription: "High-performance static, dynamic, and SEO-optimized web presences engineered for search ranking and conversion.",
    fullDescription: "We engineer responsive, clean-coded, and SEO-optimized web presences. Whether your priority is instantaneous static speed or complex dynamic workflows, we build platforms that convert visitors into clients.",
    valueProposition: "Your website is your digital headquarters. We eliminate template bloat and deliver sub-second loading speeds, semantic markup, and reliable mobile responsiveness that inspire trust.",
    benefits: [
      "Custom responsive layouts built on clean semantic code",
      "Sub-second load speeds optimizing Core Web Vitals",
      "Structured SEO schema and automated metadata generation",
      "Modular components engineered for seamless scalability"
    ],
    groups: [
      {
        groupId: "core-web-engineering",
        groupTitle: "Web Engineering Disciplines",
        services: [
          { name: "Static Website Development", desc: "Ultra-fast, lightweight, and secure static builds designed for maximum uptime and zero server bloat." },
          { name: "Dynamic Website Development", desc: "Database-backed corporate platforms, client portals, CMS architectures, and real-time interactive user flows." },
          { name: "SEO-Optimized Website Development", desc: "Structured data schemas (JSON-LD), semantic markup, search engine compliance, and high crawlability." }
        ]
      },
      {
        groupId: "web-support-optimization",
        groupTitle: "Web Upkeep & Optimization",
        services: [
          { name: "Website Maintenance & Support", desc: "Reliable technical upkeep, security monitoring, and regular framework maintenance." },
          { name: "Speed & Performance Optimization", desc: "Asset minification, responsive image compression, and edge caching for swift rendering." },
          { name: "Website Redesign & Modernization", desc: "Transform outdated digital presences into clean, modern, and conversion-focused experiences." }
        ]
      }
    ]
  },
  {
    id: "custom-applications",
    aliases: ["custom-application-development", "software-engineering"],
    number: "02",
    tag: "Custom Engineering",
    title: "Custom Application Development",
    homeDescription: "Custom web applications, business automation software, real-time dashboards, and specialized digital tools.",
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
          { name: "Custom Web Applications", desc: "Full-stack tailored platforms engineered with high performance, scalability, and robust cloud hosting." },
          { name: "Business & Internal Applications", desc: "Operations portals, employee dashboards, quotation tools, and automated business workflow systems." },
          { name: "Interactive Analytics Dashboards", desc: "Real-time telemetry panels and data visualizers with multi-tier role filtering and reporting." },
          { name: "Specialized Software Solutions", desc: "Domain-specific digital tools and automation routines tailored to unique enterprise challenges." }
        ]
      }
    ]
  },
  {
    id: "social-media-content",
    aliases: ["social-media-content-creation", "social-media-services"],
    number: "03",
    tag: "Creative Visuals",
    title: "Social Media Content Creation",
    homeDescription: "Strategic visual storytelling, annual campaign planning, high-impact creatives, and brand asset systems.",
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
          { name: "Annual Creative Content Planning", desc: "52-week editorial roadmaps, quarterly thematic pillars, and recurring visual hooks for reliable presence." },
          { name: "Social Media Post & Carousel Creatives", desc: "High-resolution graphic assets, multi-slide educational carousels, and promotional campaign banners." },
          { name: "Reels & Short-Form Video Editing", desc: "Clean, paced short video formats and motion snippets calibrated for modern vertical feeds." },
          { name: "Brand Asset Design Systems", desc: "Standardized story kits, channel banners, highlight covers, and brand visual guidelines." }
        ]
      }
    ]
  },
  {
    id: "social-media-management",
    aliases: ["social-media-post-updating", "business-profile-services", "complete-digital-presence"],
    number: "04",
    tag: "Channel Operations",
    title: "Social Media Management & Digital Presence",
    homeDescription: "Scheduled post management, swift graphic updates, ongoing maintenance, and consistent profile upkeep.",
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
          { name: "Regular Post Updating & Publishing", desc: "Organized multi-platform publishing following consistent weekly schedules." },
          { name: "Ongoing Channel Maintenance Support", desc: "Rapid turnaround for notices, bio revisions, profile banner updates, and asset adjustments." },
          { name: "Google Business Profile & Maps Setup", desc: "Creation, verification, category optimization, and accurate location pinning on Google & Bing." },
          { name: "Complete Digital Presence Sync", desc: "Unified interconnection across your website, social channels, and local business directories." }
        ]
      }
    ]
  }
];

export const SERVICE_SELECT_OPTIONS = [
  { value: "website-development", label: "Website Development" },
  { value: "custom-applications", label: "Custom Application Development" },
  { value: "social-media-content", label: "Social Media Content Creation" },
  { value: "social-media-management", label: "Social Media Management & Presence" },
  { value: "complete-digital-presence", label: "Complete Digital Presence Package" },
  { value: "other", label: "Other Inquiries" }
];
