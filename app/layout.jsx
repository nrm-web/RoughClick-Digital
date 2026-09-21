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

export const metadata = {
  metadataBase: new URL('https://roughclick.com'),
  title: {
    default: 'RoughClick Digital | Ideas in Motion',
    template: '%s | RoughClick Digital'
  },
  description: 'RoughClick Digital transforms ideas into purposeful digital experiences — from websites and custom applications to social media and business presence solutions.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/brand/roughclick-monogram.svg'
  },
  openGraph: {
    title: 'RoughClick Digital | Ideas in Motion',
    description: 'Purposeful digital experiences around your business: websites, custom applications, social media services, and local business presence.',
    url: 'https://roughclick.com',
    siteName: 'RoughClick Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoughClick Digital | Ideas in Motion',
    description: 'Purposeful digital experiences around your business.'
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme', 'light');`
          }}
        />
      </head>
      <body>
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
