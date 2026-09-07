/**
 * ROUGHCLICK DIGITAL - Shared Data & Content Engine
 * Brand: RoughClick Digital
 * Tagline: Ideas in Motion
 * 
 * Updated with the Client-Provided Approved Service Catalog (4 Categories)
 */

const RC_DATA = {
  brand: {
    masterBrand: "ROUGHCLICK",
    name: "RoughClick Digital",
    branch: "Digital Services",
    tagline: "IDEAS IN MOTION",
    shortDescription: "RoughClick Digital is the digital branch of RoughClick, turning ideas into purposeful digital experiences for businesses.",
    heroHeadline: "Turning Ideas Into Digital Experiences",
    heroSubcopy: "From websites and custom applications to social media and business presence, we create purposeful digital experiences around your business.",
    primaryCTA: "Let's Build Something",
    secondaryCTA: "Explore Services",
    contactPlaceholders: {
      location: "Coimbatore, Tamil Nadu, India",
      addressDisplay: "[Coimbatore Office Address]",
      phone: "[Phone Number]",
      email: "[Email Address]",
      whatsapp: "[WhatsApp Number]",
      WHATSAPP_NUMBER: "WHATSAPP_NUMBER",
      businessHours: "Monday – Friday: 9:30 AM – 6:30 PM IST"
    }
  },

  // Client Approved 4-Category Service Architecture
  services: [
    {
      id: "website-services",
      number: "01",
      title: "Website Services",
      homeDescription: "Websites designed to present your business professionally and perform effectively.",
      fullDescription: "Build, improve and maintain a professional website that supports your business goals.",
      valueProposition: "Your website is your primary digital headquarters. We engineer clean, fast, and scalable websites that establish credibility and convert visitors into long-term clients.",
      benefits: [
        "Custom responsive design tailored to your brand identity",
        "Fast page load speeds and high Core Web Vitals scores",
        "Built with clean semantic code and technical SEO best practices",
        "Scalable modular architecture ready for future business growth"
      ],
      groups: [
        {
          groupTitle: "Website Design & Development",
          services: [
            "Website Design & Development",
            "Business & Corporate Websites",
            "E-Commerce Websites",
            "Landing Pages",
            "Website Redesign"
          ]
        },
        {
          groupTitle: "Website Support & Optimization",
          services: [
            "Website Maintenance & Support",
            "Website Speed Optimization",
            "Website SEO Setup"
          ]
        }
      ]
    },
    {
      id: "social-media-services",
      number: "02",
      title: "Social Media Services",
      homeDescription: "Creative content and social media support to keep your brand active and engaging.",
      fullDescription: "Create a consistent and engaging social presence that keeps your brand active and connected.",
      valueProposition: "Maintain a cohesive visual identity across platforms. We help brands communicate their message consistently through structured planning and creative execution.",
      benefits: [
        "Cohesive brand visual identity across all social channels",
        "Strategic content planning that prevents gaps in communication",
        "Professional design standards tailored for mobile screen consumption",
        "Consistent audience touchpoints that build brand recall"
      ],
      groups: [
        {
          groupTitle: "Social Media Setup",
          services: [
            "Social Media Profile Setup",
            "Profile Optimization & Branding"
          ]
        },
        {
          groupTitle: "Social Media Content",
          services: [
            "Social Media Creative Design",
            "Posts & Carousel Design",
            "Reels & Short Video Editing",
            "Content Planning & Calendars"
          ]
        }
      ]
    },
    {
      id: "business-profile-services",
      number: "03",
      title: "Business Profile Services",
      homeDescription: "Build a stronger local presence across Google, Apple, Bing and business directories.",
      fullDescription: "Strengthen your local online presence and make your business easier to discover.",
      valueProposition: "When local clients search for solutions, make sure your business is discoverable, verified, and accurately presented on maps and enterprise directories.",
      benefits: [
        "Enhanced local search visibility when customers search nearby",
        "Accurate, verified contact information and hours across mapping engines",
        "Professional presentation on Google Maps and Bing Places",
        "Structured business directory presence establishing search trust"
      ],
      groups: [
        {
          groupTitle: "Business Profile Setup & Optimization",
          services: [
            "Google Business Profile Setup",
            "Google Business Profile Optimization",
            "Google Maps Business Presence",
            "Bing Places for Business",
            "Online Business Directory Listings"
          ]
        },
        {
          groupTitle: "Business Profile Management",
          services: [
            "Business Profile Management",
            "Business Information Optimization",
            "Local Business Presence Optimization"
          ]
        }
      ]
    },
    {
      id: "complete-digital-presence",
      number: "04",
      title: "Complete Digital Presence",
      homeDescription: "Connect your website, social platforms and business profiles into one consistent online presence.",
      fullDescription: "Bring your essential online channels together with a complete digital presence built around your business.",
      valueProposition: "Avoid disconnected digital touchpoints. We connect your website, social media, and local business profiles into an integrated, unified system that works in harmony.",
      benefits: [
        "One unified brand experience across web, social, and search maps",
        "Cross-channel integration linking social channels, maps, and website",
        "Thorough evaluation of your current online footprint",
        "A streamlined foundation ready for long-term business growth"
      ],
      groups: [
        {
          groupTitle: "Integrated Presence Solutions",
          services: [
            "Complete Business Online Setup",
            "Website + Social Media Integration",
            "Google Business Profile + Maps Setup",
            "Digital Presence Audit & Consultation"
          ]
        }
      ]
    }
  ],

  // 4-Step Process
  approach: [
    { step: "01", name: "Understand", desc: "We learn about your business, goals and audience." },
    { step: "02", name: "Create", desc: "We design and build with purpose and creativity." },
    { step: "03", name: "Launch", desc: "We ensure a smooth and reliable launch." },
    { step: "04", name: "Support", desc: "We stay with you as your digital presence evolves." }
  ],

  // Why Us
  whyChooseUs: [
    { title: "Strategy First", desc: "Understand the business before building the solution." },
    { title: "Creative Thinking", desc: "Create digital experiences that are clear, useful and engaging." },
    { title: "Reliable Support", desc: "Continued support when your business needs it." },
    { title: "Results Focused", desc: "Build with purpose and measurable business goals in mind." }
  ],

  // Placeholders for Featured Work
  featuredWork: [
    { category: "Website Development", title: "Corporate Web Platform", frameType: "Website Frame", desc: "High-performance corporate web presence with clean information architecture and sub-second page rendering." },
    { category: "Custom Application", title: "Operations & Analytics Portal", frameType: "Application Frame", desc: "Tailored business web application featuring real-time data queues and role-based workflows." },
    { category: "Social Media Content", title: "Digital Brand Visual System", frameType: "Content Frame", desc: "Multi-channel visual storytelling system with cohesive promotional post layouts and motion assets." }
  ],

  // Articles
  blogs: [
    {
      id: "blog-01",
      slug: "architecting-digital-experiences-performance",
      category: "Website Services",
      title: "Architecting Digital Experiences: Why Performance Is the Ultimate Brand Differentiator",
      date: "Sep 2026",
      readTime: "4 min read",
      author: "RoughClick Editorial",
      content: "In an era of sub-second attention spans, technical web performance directly drives conversion rates and brand trust. Discover how zero-bloat web code matters for business growth."
    },
    {
      id: "blog-02",
      slug: "connecting-website-social-business-profiles",
      category: "Complete Digital Presence",
      title: "Connecting the Dots: How a Unified Digital Presence Accelerates Business Growth",
      date: "Aug 2026",
      readTime: "5 min read",
      author: "RoughClick Strategy",
      content: "A website without social alignment or verified business profiles creates customer friction. Learn how uniting your touchpoints drives cohesive credibility."
    },
    {
      id: "blog-03",
      slug: "building-strong-local-business-profile-presence",
      category: "Business Profile Services",
      title: "Why Local Business Profile Optimization Matters for Modern Discovery",
      date: "Aug 2026",
      readTime: "3 min read",
      author: "RoughClick Editorial",
      content: "Strengthen your local presence across Google Maps, Bing Places, and verified directories to make your business easily discoverable by nearby clients."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.RC_DATA = RC_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RC_DATA;
}
