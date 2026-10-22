/**
 * ROUGHCLICK DIGITAL - Client-Approved Multi-Platform Service Catalog
 * 
 * Sourced from Section C of the client draft:
 * S02 Website Development, S03 Custom Applications,
 * S04 Social Media Content Creation, S05 Social Media Management & Digital Presence.
 */

export const SERVICE_CATEGORIES = [
  {
    id: "website-development",
    aliases: ["website-services", "web-architecture", "wordpress-development", "php-development", "wix-development"],
    number: "01",
    tag: "Websites & Online Stores",
    title: "Website Development",
    homeDescription: "Static business sites, dynamic web platforms, WordPress & WooCommerce, custom PHP, Wix Studio, and Next.js website functionality.",
    fullDescription: "Your website should help visitors understand your business and take an appropriate next step. We work on new websites, redesigns, online stores, and improvements to existing sites, with functionality and editing arrangements suited to your team.",
    valueProposition: "Who it suits: Businesses that need a clearer online presence, an editable website, an online store, or functionality that their current website does not provide.",
    benefits: [
      "Business and service websites with clear page structure and navigation",
      "Campaign, product, and landing pages",
      "Editable content and publishing workflows",
      "Online stores and agreed purchase journeys",
      "Forms, integrations, and database-backed features",
      "Responsive layouts and accessibility improvements",
      "Technical SEO foundations and performance review"
    ],
    proposalNote: "What the proposal should specify: Pages and features, content inputs, editing access, integrations, review stages, hosting, licenses, handoff, and any ongoing support.",
    scopeNote: "Important scope note: The items above describe available capabilities. The agreed proposal determines what is included in your project and which costs are paid separately.",
    buttonText: "Discuss Your Website",
    groups: [
      {
        groupId: "detailed-capabilities",
        groupTitle: "Detailed Capabilities",
        services: [
          {
            name: "Static Websites",
            desc: "Business, campaign, and informational websites with an appropriate content structure and a defined method for future updates."
          },
          {
            name: "Dynamic Websites",
            desc: "Websites with user interaction, stored information, content management, or other functionality that needs an application backend."
          },
          {
            name: "Technical SEO Setup",
            desc: "Page titles, descriptions, crawlable content, internal links, canonical configuration, sitemap handling, and relevant structured data. These provide a foundation for discovery; they do not guarantee search placement."
          },
          {
            name: "WordPress Development",
            desc: "Themes, content structures, and functionality suited to the website's requirements. Any plugin, page builder, or custom approach should be assessed for maintainability and editing needs."
          },
          {
            name: "WooCommerce Stores",
            desc: "Store structure, product presentation, checkout, and agreed payment or operational integrations. Payment-provider approval, transaction charges, and third-party subscriptions are separate considerations."
          },
          {
            name: "Custom PHP Development",
            desc: "Website features and database-backed functionality built around a defined requirement, including integrations or modernization of an existing PHP system."
          },
          {
            name: "Wix Studio Websites",
            desc: "Business websites using Wix Studio's hosted design and content tools where its capabilities fit the requirement. Subscription levels and platform limits should be considered in the proposal."
          },
          {
            name: "Next.js and React Websites",
            desc: "Component-based websites and frontends where custom functionality, integrations, or the chosen architecture justify the approach."
          },
          {
            name: "Migration and Redesign",
            desc: "Planning content and URL changes, moving approved material, and checking the new website before release. Search traffic and third-party behavior cannot be guaranteed to remain unchanged."
          },
          {
            name: "Maintenance and Support",
            desc: "Agreed updates, content changes, issue investigation, and other upkeep. Backup responsibilities, monitoring, response expectations, and excluded work must be stated in the support scope."
          },
          {
            name: "Performance Optimization",
            desc: "Reviewing the causes of slow or unstable experiences, making suitable improvements, and comparing results under documented conditions."
          }
        ]
      }
    ]
  },
  {
    id: "custom-applications",
    aliases: ["custom-application-development", "software-engineering", "internal-tools"],
    number: "02",
    tag: "Workflows & Operations Tools",
    title: "Custom Applications",
    homeDescription: "Turn defined business processes into practical applications with mapped users, workflows, and reporting.",
    fullDescription: "A custom application can help when a specific business process is difficult to manage through spreadsheets, manual handoffs, or disconnected software. We start by mapping the workflow, users, information, and decisions the tool needs to support.",
    valueProposition: "Who it suits: Teams with a defined operational problem that cannot be addressed well enough through an existing tool or a simpler process change.",
    benefits: [
      "Internal operations and staff portals",
      "Quotation and estimation tools",
      "Client portals and approval workflows",
      "Dashboards, reports, and data views",
      "Database-backed business applications",
      "Connections to agreed external services",
      "Automation of repeatable tasks",
      "Existing application review and modernization"
    ],
    proposalNote: "What the proposal should specify: User roles, core journeys, data requirements, integrations, acceptance checks, delivery stages, documentation, and ongoing responsibilities.",
    scopeNote: "Important scope note: Custom software has development and maintenance costs. It does not automatically remove all subscription fees, operating costs, or scaling requirements.",
    buttonText: "Discuss Your Application",
    groups: [
      {
        groupId: "planning-considerations",
        groupTitle: "Planning Considerations",
        services: [
          {
            name: "Workflow Mapping",
            desc: "What happens today, who is involved, and which steps need to change?"
          },
          {
            name: "Data & Access",
            desc: "What information is collected, who can access it, and how is it retained or removed?"
          },
          {
            name: "External Integrations",
            desc: "Which external systems are required, and what limitations or charges apply?"
          },
          {
            name: "Ongoing Operations",
            desc: "Who will manage hosting, updates, backups, support, and future changes?"
          }
        ]
      }
    ]
  },
  {
    id: "social-media-content",
    aliases: ["social-media-content-creation", "social-media-services", "creative-design"],
    number: "03",
    tag: "Creative & Brand Assets",
    title: "Social Media Content Creation",
    homeDescription: "Consistent visual direction, monthly/annual editorial planning, educational carousels, and reusable brand assets.",
    fullDescription: "Help your audience recognize your business through useful topics and a consistent visual style. We plan and create social content around your services, customer questions, available images, and current priorities.",
    valueProposition: "Who it suits: Businesses that need a planned approach to creative content across their chosen social channels.",
    benefits: [
      "Monthly, quarterly, or annual editorial planning",
      "Topic pillars and content calendars",
      "Single-image posts and multi-slide carousels",
      "Promotional and announcement graphics",
      "Reels and short-form video editing",
      "Profile banners, highlight covers, and story templates",
      "Reusable brand assets and visual guidelines"
    ],
    proposalNote: "What the proposal should specify: Channels, content quantities, formats, source material, writing/design responsibilities, review rounds, publishing responsibility, and delivery schedule.",
    scopeNote: "Important scope note: Photography, filming, paid advertising, community management, and stock-asset licensing are included only when explicitly agreed. Content production does not guarantee reach, followers, or sales.",
    buttonText: "Discuss Your Content",
    groups: [
      {
        groupId: "content-shaping",
        groupTitle: "How Content is Shaped",
        services: [
          {
            name: "Audience & Messaging",
            desc: "Identify the audience, core message, and key communication priorities."
          },
          {
            name: "Source Material & Assets",
            desc: "Use your services, customer questions, and available images as content foundations."
          },
          {
            name: "Formats & Deliverables",
            desc: "Produce single posts, carousels, short-form video snippets, and announcements suited to your target platforms."
          },
          {
            name: "Approval Workflow",
            desc: "Structured review and sign-off rounds before any content is released or published."
          }
        ]
      }
    ]
  },
  {
    id: "social-media-management",
    aliases: ["digital-presence-support", "social-media-post-updating", "business-profile-services", "local-seo", "complete-digital-presence"],
    number: "04",
    tag: "Channel Upkeep & Profile Sync",
    title: "Social Media Management and Digital Presence",
    homeDescription: "Keep your business information current, publish approved posts, update channels, and coordinate local business profiles.",
    fullDescription: "Keep your business information current and your approved content organized across the channels you use. This service supports the recurring work behind an active, connected online presence.",
    valueProposition: "Who it suits: Businesses that need agreed ongoing support for publishing, profile updates, website content, and local business information.",
    benefits: [
      "Publishing approved posts to agreed channels",
      "Updating profile descriptions, banners, and contact details",
      "Maintaining agreed website and channel content",
      "Helping set up or update Google Business Profile and relevant directories",
      "Reviewing links, opening hours, categories, and business information",
      "Coordinating website, social, and profile information",
      "Reporting on agreed activities and available channel metrics"
    ],
    proposalNote: "What the proposal should specify: Account access, supported channels, publishing frequency, approvals, included updates, response responsibilities, reporting, and any platform costs.",
    scopeNote: "Important scope note: Business-profile verification and visibility are controlled by the relevant platform. We can assist with accurate setup and required information, but cannot guarantee verification, ranking, or placement.",
    buttonText: "Discuss Ongoing Support",
    groups: [
      {
        groupId: "recurring-support",
        groupTitle: "Key Support Areas",
        services: [
          {
            name: "Channel Publishing",
            desc: "Dependable publishing of approved materials across agreed platforms."
          },
          {
            name: "Profile & Bio Updates",
            desc: "Timely updates to bio descriptions, banners, contact numbers, and service listings."
          },
          {
            name: "Google Business & Directories",
            desc: "Accurate setup assistance, category alignment, and location details on major search maps."
          },
          {
            name: "Digital Presence Coordination",
            desc: "Keeping information unified across your website, social accounts, and map listings."
          }
        ]
      }
    ]
  }
];

export const SERVICE_SELECT_OPTIONS = [
  { value: "unsure-need-advice", label: "Unsure / Need Advice" },
  { value: "static-website", label: "Static Website" },
  { value: "dynamic-website", label: "Dynamic Website" },
  { value: "wordpress-woocommerce", label: "WordPress or WooCommerce Website" },
  { value: "custom-php", label: "Custom PHP Application" },
  { value: "wix-studio", label: "Wix Studio Website" },
  { value: "nextjs-react", label: "Next.js or React Website/Application" },
  { value: "custom-applications", label: "Custom Business Application" },
  { value: "social-media-content", label: "Social Media Content Creation" },
  { value: "social-management-presence", label: "Social Media Management and Digital Presence" },
  { value: "combined-digital-services", label: "Combined Digital Services" },
  { value: "other", label: "Other" }
];
