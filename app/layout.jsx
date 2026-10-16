import '@/styles/globals.css';
import { Inter, Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { InquiryModalProvider } from '@/components/QuickBookingModal';
import BrandPreloader from '@/components/BrandPreloader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import ScrollAnimationProvider from '@/components/ScrollAnimationProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pjs',
  weight: ['400', '500', '600', '700', '800'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://roughclick.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  title: {
    default: 'Websites, Applications & Digital Services | RoughClick Digital',
    template: '%s | RoughClick Digital'
  },
  description: 'RoughClick Digital helps businesses plan and build websites, custom applications, social content, and ongoing digital presence support.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/brand/roughclick-monogram.svg'
  },
  openGraph: {
    title: 'Websites, Applications & Digital Services | RoughClick Digital',
    description: 'RoughClick Digital helps businesses plan and build websites, custom applications, social content, and ongoing digital presence support.',
    url: SITE_URL,
    siteName: 'RoughClick Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websites, Applications & Digital Services | RoughClick Digital',
    description: 'RoughClick Digital helps businesses plan and build websites, custom applications, social content, and ongoing digital presence support.'
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${montserrat.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          as="image"
          href="/brand/hero_option_devices_mobile.webp"
          media="(max-width: 768px)"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/brand/hero_option_devices.webp"
          media="(min-width: 769px)"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme', 'light');`
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <BrandPreloader />
        <ThemeProvider>
          <InquiryModalProvider>
            <ScrollAnimationProvider>
              <Header />
              <main id="main-content" style={{ minHeight: '80vh' }}>
                {children}
              </main>
              <Footer />
              <FloatingActionButtons />
            </ScrollAnimationProvider>
          </InquiryModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
