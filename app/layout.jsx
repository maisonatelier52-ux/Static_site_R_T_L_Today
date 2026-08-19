import '@/app/globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export const metadata = {
  metadataBase: new URL('https://rtltoday.example'),
  title: { default: 'RTL Today News', template: '%s | RTL Today' },
  description: 'Independent Luxembourg news, analysis, culture, sport and useful local context.',
  keywords: ['Luxembourg news', 'RTL Today', 'Europe news', 'Luxembourg life'],
  openGraph: {
    title: 'RTL Today News',
    description: 'Independent Luxembourg news and useful local context.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'RTL Today'
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="m-0 text-ink bg-white font-sans antialiased">
        <a
          className="fixed top-2 left-2 z-[1000] -translate-y-[160%] focus:translate-y-0 bg-white border-2 border-ink px-3.5 py-2.5 font-bold transition-transform"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
