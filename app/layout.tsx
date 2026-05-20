import type {Metadata} from 'next';
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
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F5F2] text-[#3A3A32]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
