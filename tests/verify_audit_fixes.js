/**
 * RoughClick Digital - Comprehensive Audit Remediation Verification Suite
 * Verifies RC-01 through RC-26 programmatic fixes.
 * Run via: npm test
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n=============================================================');
console.log('ROUGHCLICK DIGITAL - CLIENT AUDIT REMEDIATION VERIFICATION');
console.log('=============================================================\n');

// -----------------------------------------------------------------------------
// RC-06: CSV Formula Injection Sanitization
// -----------------------------------------------------------------------------
console.log('--- Phase 1: Security & Backend Reliability ---');

runTest('RC-06: CSV export neutralizes formula injection triggers (=, +, -, @, \\t, \\r)', () => {
  const exportRouteCode = fs.readFileSync(path.join(__dirname, '../app/api/admin/inquiries/export/route.js'), 'utf8');
  assert(exportRouteCode.includes('escapeCsvField'), 'escapeCsvField helper must be defined');
  assert(exportRouteCode.includes('/^[=\\+\\-@\\t\\r]/.test(str)') || exportRouteCode.includes('/^[=+\\-@\\t\\r]/.test(str)'), 'Formula triggers must be tested');
  assert(exportRouteCode.includes("`'${str}`") || exportRouteCode.includes("'\\'' + str") || exportRouteCode.includes("\"'\" + str"), 'Field must be prefixed with single quote');
});

// -----------------------------------------------------------------------------
// RC-03: Fail-Closed Production Authentication
// -----------------------------------------------------------------------------
runTest('RC-03: Authentication fails closed in production when secrets are unconfigured', () => {
  const sessionCode = fs.readFileSync(path.join(__dirname, '../lib/auth/session.js'), 'utf8');
  assert(sessionCode.includes('process.env.NODE_ENV === \'production\''), 'Production environment check must be present');
  assert(sessionCode.includes('throw new Error') || sessionCode.includes('return false'), 'Must fail closed with explicit throw/false');
  assert(!sessionCode.includes('return \'roughclick-fallback-secret-2026-production\''), 'Hardcoded production secret must not exist');
});

// -----------------------------------------------------------------------------
// RC-04: Cryptographic Middleware Session Verification
// -----------------------------------------------------------------------------
runTest('RC-04: Middleware uses Web Crypto HMAC SHA-256 signature verification', () => {
  const middlewareCode = fs.readFileSync(path.join(__dirname, '../middleware.js'), 'utf8');
  assert(middlewareCode.includes('verifyToken') || middlewareCode.includes('verifyHmacSignature'), 'HMAC signature verification function must exist');
  assert(middlewareCode.includes('crypto.subtle'), 'Web Crypto subtle must be used for Edge runtime');
  assert(middlewareCode.includes('SHA-256'), 'SHA-256 algorithm must be specified');
  assert(middlewareCode.includes('status: 307') || middlewareCode.includes('redirect'), 'Invalid signature must redirect to login');
});

// -----------------------------------------------------------------------------
// RC-05: Application Abuse Controls & Rate Limiting
// -----------------------------------------------------------------------------
runTest('RC-05: Rate limiting middleware and payload caps applied to public endpoints', () => {
  assert(fs.existsSync(path.join(__dirname, '../lib/rateLimit.js')), 'lib/rateLimit.js must exist');
  const contactRoute = fs.readFileSync(path.join(__dirname, '../app/api/contact/route.js'), 'utf8');
  const loginRoute = fs.readFileSync(path.join(__dirname, '../app/api/auth/login/route.js'), 'utf8');
  assert(contactRoute.includes('checkRateLimit'), 'Contact route must enforce rate limiting');
  assert(contactRoute.includes('32768') || contactRoute.includes('32 * 1024'), 'Contact route must enforce payload size cap');
  assert(loginRoute.includes('checkRateLimit'), 'Login route must enforce rate limiting');
  assert(loginRoute.includes('16384') || loginRoute.includes('16 * 1024'), 'Login route must enforce payload size cap');
});

// -----------------------------------------------------------------------------
// RC-01 & RC-02: Atomic Inquiry Storage & Error Handling
// -----------------------------------------------------------------------------
runTest('RC-01 & RC-02: Inquiry persistence generates atomic UUIDs and throws explicitly on failure', () => {
  const dbCode = fs.readFileSync(path.join(__dirname, '../lib/db/index.js'), 'utf8');
  assert(dbCode.includes('crypto.randomUUID') || dbCode.includes('randomBytes'), 'Must generate high-entropy atomic ID');
  assert(dbCode.includes('throw new Error') && dbCode.includes('deleteInquiry'), 'deleteInquiry must throw explicitly on failure');
  const contactApiCode = fs.readFileSync(path.join(__dirname, '../app/api/contact/route.js'), 'utf8');
  assert(contactApiCode.includes('persistenceStatus: \'durable\''), 'Contact API must confirm durable persistence');
});

console.log('\n--- Phase 2: Accessibility & UI Components ---');

// -----------------------------------------------------------------------------
// RC-11, RC-12: Phone or Email & Focus Trap in QuickBookingModal
// -----------------------------------------------------------------------------
runTest('RC-11 & RC-12: QuickBookingModal enforces focus containment and phone-or-email parity', () => {
  const modalCode = fs.readFileSync(path.join(__dirname, '../components/QuickBookingModal.jsx'), 'utf8');
  assert(modalCode.includes('modalRef'), 'modalRef must be present for focus trapping');
  assert(modalCode.includes('focusableSelector') || modalCode.includes('querySelectorAll'), 'Focusable elements must be queried');
  assert(modalCode.includes('Shift+Tab') || modalCode.includes('e.shiftKey'), 'Shift+Tab backwards trap must be handled');
  assert(modalCode.includes('previousActiveElement') || modalCode.includes('prevActiveElement') || modalCode.includes('triggerRef'), 'Focus must be restored to opener on close');
  assert(modalCode.includes('Phone or Email') || modalCode.includes('!formData.phone.trim() && !formData.email.trim()'), 'Phone or Email parity must be supported');
  assert(modalCode.includes('autoComplete="name"') && modalCode.includes('autoComplete="email"'), 'Autocomplete attributes must be present');
});

// -----------------------------------------------------------------------------
// RC-17: ContactForm Autocomplete & Layout Skip Link
// -----------------------------------------------------------------------------
runTest('RC-17: ContactForm autocomplete attributes, error alert, and Skip to Main link', () => {
  const contactForm = fs.readFileSync(path.join(__dirname, '../components/ContactForm.jsx'), 'utf8');
  assert(contactForm.includes('autoComplete="name"'), 'Name autocomplete must exist');
  assert(contactForm.includes('autoComplete="email"'), 'Email autocomplete must exist');
  assert(contactForm.includes('autoComplete="tel"'), 'Tel autocomplete must exist');
  assert(contactForm.includes('autoComplete="organization"'), 'Organization autocomplete must exist');
  assert(contactForm.includes('role="alert"'), 'Accessible role="alert" must be rendered for errors');

  const layoutCode = fs.readFileSync(path.join(__dirname, '../app/layout.jsx'), 'utf8');
  assert(layoutCode.includes('href="#main-content"'), 'Skip to main content link must exist in layout');
  assert(layoutCode.includes('id="main-content"'), 'Main tag must have id="main-content"');

  const cssCode = fs.readFileSync(path.join(__dirname, '../styles/globals.css'), 'utf8');
  assert(cssCode.includes('.skip-to-content'), '.skip-to-content CSS class must be defined');
});

// -----------------------------------------------------------------------------
// RC-13: WCAG AA Text Contrast
// -----------------------------------------------------------------------------
runTest('RC-13: WCAG AA Contrast tokens defined for active tabs, inline code, and links', () => {
  const cssCode = fs.readFileSync(path.join(__dirname, '../styles/globals.css'), 'utf8');
  assert(cssCode.includes('.editorial-tab-trigger.is-active'), 'Active tab trigger rule must exist');
  assert(cssCode.includes('color: #042F2E !important;') || cssCode.includes('color: #0E0F12 !important;'), 'Active tab must have dark text meeting 4.5:1 ratio on accent');
  assert(cssCode.includes('--color-accent-dark: #086d60'), 'Accessible accent dark token must be defined in :root');
  assert(cssCode.includes('--color-code-inline: #086d60'), 'Accessible inline code token must be defined in :root');
});

// -----------------------------------------------------------------------------
// RC-14: Header Mobile Navigation Accessibility
// -----------------------------------------------------------------------------
runTest('RC-14: Mobile navigation drawer has aria-expanded, dialog role, focus trap, and Escape handler', () => {
  const headerCode = fs.readFileSync(path.join(__dirname, '../components/Header.jsx'), 'utf8');
  assert(headerCode.includes('aria-expanded={mobileOpen}'), 'Hamburger button must expose aria-expanded');
  assert(headerCode.includes('aria-controls="mobile-nav-drawer"'), 'Hamburger button must expose aria-controls');
  assert(headerCode.includes('id="mobile-nav-drawer"'), 'Drawer container must have id="mobile-nav-drawer"');
  assert(headerCode.includes('role="dialog"'), 'Drawer container must have role="dialog"');
  assert(headerCode.includes('aria-modal="true"'), 'Drawer container must declare aria-modal="true"');
  assert(headerCode.includes('e.key === \'Escape\''), 'Escape key must close drawer');
  assert(headerCode.includes('toggleBtnRef.current?.focus()'), 'Focus must be restored to toggle button');
});

// -----------------------------------------------------------------------------
// RC-15: Capabilities Tabs WAI-ARIA Pattern
// -----------------------------------------------------------------------------
runTest('RC-15: Capabilities tabs implement roving tabindex, arrow navigation, and tabpanel relationship', () => {
  const capCode = fs.readFileSync(path.join(__dirname, '../components/CapabilitiesInspector.jsx'), 'utf8');
  assert(capCode.includes('role="tablist"'), 'Tab container must have role="tablist"');
  assert(capCode.includes('role="tab"'), 'Tab triggers must have role="tab"');
  assert(capCode.includes('tabIndex={isActive ? 0 : -1}'), 'Roving tabindex must be implemented');
  assert(capCode.includes('aria-controls={`capability-panel-${cap.id}`}') || capCode.includes('capability-panel-'), 'Tab trigger must have aria-controls');
  assert(capCode.includes('e.key === \'ArrowRight\'') && capCode.includes('e.key === \'ArrowLeft\''), 'Arrow keys navigation must be supported');
  assert(capCode.includes('role="tabpanel"'), 'Content canvas must have role="tabpanel"');
  assert(capCode.includes('aria-labelledby={`capability-tab-${activeCap.id}`}') || capCode.includes('capability-tab-'), 'Tabpanel must reference its active tab');
});

// -----------------------------------------------------------------------------
// RC-16: Blog Article Formatting & List Semantics
// -----------------------------------------------------------------------------
runTest('RC-16: Blog renderer uses semantic ol/li lists and line-safe heading parsing', () => {
  const blogSlugCode = fs.readFileSync(path.join(__dirname, '../app/blog/[slug]/page.jsx'), 'utf8');
  assert(blogSlugCode.includes('<ol style='), 'Numbered lists must render semantic <ol> elements');
  assert(blogSlugCode.includes('<li key={iIdx}'), 'Numbered list items must render semantic <li> elements');
  assert(blogSlugCode.includes('firstLine.startsWith(\'## \')'), 'Headings must be parsed line-by-line');

  // Verify WordPress security sentence fix in posts-data.json and blogs.js
  const postsData = fs.readFileSync(path.join(__dirname, '../data/posts-data.json'), 'utf8');
  const blogsJs = fs.readFileSync(path.join(__dirname, '../data/blogs.js'), 'utf8');
  assert(!postsData.includes('remains significantly reduces exposure'), 'Damaged WordPress sentence must be removed from posts-data.json');
  assert(!blogsJs.includes('remains significantly reduces exposure'), 'Damaged WordPress sentence must be removed from blogs.js');
  assert(postsData.includes('remains secure while significantly reducing exposure'), 'Repaired sentence must exist in posts-data.json');
});

// -----------------------------------------------------------------------------
// RC-22: BrandPreloader Parity & Reduced Motion
// -----------------------------------------------------------------------------
runTest('RC-22: BrandPreloader removes bot user-agent sniffing and respects reduced motion everywhere', () => {
  const preloaderCode = fs.readFileSync(path.join(__dirname, '../components/BrandPreloader.jsx'), 'utf8');
  assert(!preloaderCode.includes('isAuditBot'), 'Bot user-agent sniffing (isAuditBot) must be removed');
  assert(!preloaderCode.includes('/Lighthouse|PageSpeed|HeadlessChrome/i'), 'Lighthouse UA regex must be removed');
  assert(preloaderCode.includes('prefersReducedMotion'), 'prefersReducedMotion must be checked');
  assert(preloaderCode.includes('sessionStorage.getItem(\'rc_preloader_seen\')'), 'SessionStorage must prevent repeated visitor delays');
});

// -----------------------------------------------------------------------------
// RC-23: HeroParticles Observer & Offscreen Pausing
// -----------------------------------------------------------------------------
runTest('RC-23: HeroParticles actively observes canvas and pauses loop offscreen / tab hidden', () => {
  const particlesCode = fs.readFileSync(path.join(__dirname, '../components/HeroParticles.jsx'), 'utf8');
  assert(particlesCode.includes('visibilityObserver.observe(canvas)'), 'IntersectionObserver must actively observe canvas element');
  assert(particlesCode.includes('visibilitychange'), 'Document visibilitychange must be monitored');
  assert(particlesCode.includes('cancelAnimationFrame(animationFrameId)'), 'Animation frame must be cancelled when not visible');
  assert(particlesCode.includes('ctx.clearRect') && particlesCode.includes('prefersReducedMotion'), 'Static particle frame must render for reduced-motion');
});

console.log('\n--- Phase 3: Content, Privacy & SEO ---');

// -----------------------------------------------------------------------------
// RC-19: Social Metadata & Robots.txt Admin Crawler Policy
// -----------------------------------------------------------------------------
runTest('RC-19: public/robots.txt disallows all admin aliases, and admin layouts enforce noindex', () => {
  const robotsTxt = fs.readFileSync(path.join(__dirname, '../public/robots.txt'), 'utf8');
  assert(robotsTxt.includes('Disallow: /admin/'), 'Disallow /admin/ must be present');
  assert(robotsTxt.includes('Disallow: /admin-blog/'), 'Disallow /admin-blog/ must be present');
  assert(robotsTxt.includes('Disallow: /admin-inquiries/'), 'Disallow /admin-inquiries/ must be present');
  assert(robotsTxt.includes('Disallow: /api/admin/'), 'Disallow /api/admin/ must be present');
  assert(robotsTxt.includes('Disallow: /api/admin-posts/'), 'Disallow /api/admin-posts/ must be present');

  const adminBlogLayout = fs.readFileSync(path.join(__dirname, '../app/admin-blog/layout.jsx'), 'utf8');
  assert(adminBlogLayout.includes('index: false') && adminBlogLayout.includes('follow: false'), 'admin-blog layout must enforce noindex');

  const servicesPage = fs.readFileSync(path.join(__dirname, '../app/services/page.jsx'), 'utf8');
  assert(servicesPage.includes('url: \'/services\''), 'Services page must have route-specific openGraph url');

  const contactPage = fs.readFileSync(path.join(__dirname, '../app/contact/page.jsx'), 'utf8');
  assert(contactPage.includes('url: \'/contact\''), 'Contact page must have route-specific openGraph url');
});

// -----------------------------------------------------------------------------
// RC-20: Privacy Policy Retention & Third-Party Disclosures
// -----------------------------------------------------------------------------
runTest('RC-20: Privacy Policy discloses 12-month retention, on-demand deletion, Maps, WhatsApp & storage', () => {
  const privacyCode = fs.readFileSync(path.join(__dirname, '../app/privacy/page.jsx'), 'utf8');
  assert(privacyCode.includes('Google Maps Embed'), 'Google Maps embed must be disclosed');
  assert(privacyCode.includes('WhatsApp Click-to-Chat'), 'WhatsApp data processing must be disclosed');
  assert(privacyCode.includes('12 months'), '12-month retention schedule must be disclosed');
  assert(privacyCode.includes('Browser Storage (Cookies &amp; LocalStorage)') || privacyCode.includes('Browser Storage (Cookies & LocalStorage)'), 'Browser storage usage must be disclosed');
  assert(privacyCode.includes('url: \'/privacy\''), 'Privacy page must have route-specific openGraph url');
});

// -----------------------------------------------------------------------------
// RC-24: Environment Variables Documentation
// -----------------------------------------------------------------------------
runTest('RC-24: .env.example contains complete inventory of operational variables', () => {
  const envExample = fs.readFileSync(path.join(__dirname, '../.env.example'), 'utf8');
  assert(envExample.includes('NEXT_PUBLIC_SITE_URL='), 'NEXT_PUBLIC_SITE_URL must be documented');
  assert(envExample.includes('ADMIN_SESSION_SECRET='), 'ADMIN_SESSION_SECRET must be documented');
  assert(envExample.includes('RESEND_API_KEY='), 'RESEND_API_KEY must be documented');
  assert(envExample.includes('RESEND_FROM_EMAIL='), 'RESEND_FROM_EMAIL must be documented');
  assert(envExample.includes('KV_REST_API_URL='), 'KV_REST_API_URL must be documented');
  assert(envExample.includes('KV_REST_API_TOKEN='), 'KV_REST_API_TOKEN must be documented');
  assert(envExample.includes('GITHUB_TOKEN='), 'GITHUB_TOKEN must be documented');
});

// -----------------------------------------------------------------------------
// RC-26: Content Ingestion & Browser Security Headers
// -----------------------------------------------------------------------------
runTest('RC-26: Security headers configured in next.config.js, markdown links sanitized, JSON-LD escaped', () => {
  const nextConfig = fs.readFileSync(path.join(__dirname, '../next.config.js'), 'utf8');
  assert(nextConfig.includes('X-Content-Type-Options') && nextConfig.includes('nosniff'), 'nosniff header must be configured');
  assert(nextConfig.includes('X-Frame-Options') && nextConfig.includes('SAMEORIGIN'), 'X-Frame-Options must be configured');
  assert(nextConfig.includes('Referrer-Policy') && nextConfig.includes('strict-origin-when-cross-origin'), 'Referrer-Policy must be configured');
  assert(nextConfig.includes('Permissions-Policy'), 'Permissions-Policy must be configured');

  const blogSlugCode = fs.readFileSync(path.join(__dirname, '../app/blog/[slug]/page.jsx'), 'utf8');
  assert(blogSlugCode.includes('isSafeScheme'), 'Markdown link protocol sanitizer must be present');
  assert(blogSlugCode.includes('.replace(/</g, \'\\\\u003c\')'), 'JSON-LD less-than script termination escaping must be present');
});

const percent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
console.log('\n=============================================================');
console.log(`TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${percent}%)`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
