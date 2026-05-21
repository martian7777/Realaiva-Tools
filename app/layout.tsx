import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.realaiva.com'),
  title: {
    default: 'Realaiva AI Tools Suite – Free SEO, Writing & Marketing Tools',
    template: '%s | Realaiva Tools',
  },
  description:
    'A comprehensive suite of free AI tools by Realaiva for SEO, content creation, YouTube, social media, email and product marketing.',
  alternates: {
    canonical: 'https://tools.realaiva.com',
  },
  verification: {
    google: 'r2F6SX0sERQbpLz7Gzg2aIpQh1tz-D4_4AYEP5ND3EA',
  },
  appleWebApp: {
    title: 'Ai Tools',
  },
  openGraph: {
    title: 'Realaiva AI Tools Suite – Free SEO, Writing & Marketing Tools',
    description:
      'A comprehensive suite of free AI tools by Realaiva for SEO, content creation, YouTube, social media, email and product marketing.',
    url: 'https://tools.realaiva.com',
    siteName: 'Realaiva Tools',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Ai Tools" />
      </head>
      <body
        className="bg-[#F8F5F2] text-[#3A3A32] flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <div className="flex-1">{children}</div>
        <footer className="bg-white border-t border-[#D9D1C7] py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#7A756C]">
            <div>
              <Link href="/" className="text-base font-bold tracking-tight text-[#2C2C24]">
                Realaiva <span className="text-[#5A5A40]">Tools</span>
              </Link>
              <p className="mt-2 text-xs">
                Free AI tools for SEO, content, and marketing. Built by Realaiva.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#2C2C24] mb-2">Explore</h2>
              <ul className="space-y-1">
                <li><Link href="/" className="hover:text-[#5A5A40]">All Tools</Link></li>
                <li><Link href="/blog" className="hover:text-[#5A5A40]">Blog</Link></li>
                <li>
                  <a
                    href="https://realaiva.com"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[#5A5A40]"
                  >
                    Realaiva.com ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#2C2C24] mb-2">Authoritative SEO Sources</h2>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[#5A5A40]"
                  >
                    Google SEO Starter Guide ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://rankmath.com/kb/score-100-in-tests/"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[#5A5A40]"
                  >
                    Rank Math: Score 100 in Tests ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-xs text-[#8A857C] text-center">
            © {new Date().getFullYear()} Realaiva. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
