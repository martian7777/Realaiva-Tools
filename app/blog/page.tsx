import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Realaiva Blog: AI Tools, SEO, and Content Marketing Guides",
  description:
    "Read the Realaiva blog for practical guides on free AI tools, SEO, content writing, and digital marketing in 2026. Honest picks, no fluff.",
  alternates: { canonical: `${SITE_URL}/blog/` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Realaiva Blog: AI Tools, SEO, and Content Marketing Guides",
    description:
      "Read the Realaiva blog for practical guides on free AI tools, SEO, content writing, and digital marketing in 2026.",
    url: `${SITE_URL}/blog/`,
    siteName: "Realaiva Tools",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...articles].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Realaiva Blog",
    url: `${SITE_URL}/blog/`,
    blogPost: sorted.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/blog/${a.slug}/`,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
      description: a.metaDescription,
      image: a.hero.src,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[#D9D1C7]">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#2C2C24]">
            Realaiva <span className="text-[#5A5A40]">Tools</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/" className="text-sm font-medium text-[#8A857C] hover:text-[#5A5A40]">
              All Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-[#5A5A40] hover:text-[#2C2C24]">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        <nav className="flex text-sm text-[#8A857C] mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-[#5A5A40] inline-flex items-center">
                🏠 Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-[#5A5A40] font-semibold">Blog</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#2C2C24] mb-4">
            Realaiva Blog
          </h1>
          <p className="text-lg text-[#7A756C] max-w-2xl mx-auto leading-relaxed">
            Practical guides on free AI tools, SEO, content writing, and digital marketing.
            Honest picks, no fluff, no paywalls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="bg-white rounded-3xl border border-[#D9D1C7] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/9] bg-[#E2DCD3]">
                <Image
                  src={a.hero.src}
                  alt={a.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-serif text-[#2C2C24] mb-2 leading-snug">
                  {a.title}
                </h2>
                <p className="text-sm text-[#7A756C] leading-relaxed mb-4 flex-1">
                  {a.excerpt}
                </p>
                <div className="text-xs text-[#8A857C] flex items-center gap-2">
                  <time dateTime={a.publishedAt}>
                    {new Date(a.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{a.readMinutes} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
