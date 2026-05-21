import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import HeroImage from "./HeroImage";
import TableOfContents from "./TableOfContents";
import { slugifyHeading } from "@/lib/seo";
import type { Article } from "@/lib/articles";

export default function ArticleLayout({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans">
      <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[#D9D1C7]">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#2C2C24]">
            Realaiva <span className="text-[#5A5A40]">Tools</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/" className="text-sm font-medium text-[#8A857C] hover:text-[#5A5A40]">
              All Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-[#8A857C] hover:text-[#5A5A40]">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <nav className="flex text-sm text-[#8A857C] mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-[#5A5A40] inline-flex items-center">
                🏠 Home
              </Link>
            </li>
            <li className="inline-flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href="/blog" className="hover:text-[#5A5A40]">
                Blog
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-[#5A5A40] font-semibold line-clamp-1">{article.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <HeroImage src={article.hero.src} alt={article.hero.alt} />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2C24] mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-[#7A756C] leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#8A857C]">
            <time dateTime={article.publishedAt}>
              Published{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{article.readMinutes} min read</span>
            <span>·</span>
            <span>Updated {new Date(article.updatedAt).toLocaleDateString("en-US")}</span>
          </div>
        </div>

        <TableOfContents sections={article.sections} />

        <article className="prose prose-stone max-w-none mb-12 text-[#3A3A32]">
          {article.sections.map((section, idx) => {
            const id = slugifyHeading(section.title);
            return (
              <section key={idx} id={id} className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-serif text-[#2C2C24] mb-4">{section.title}</h2>
                <div className="text-[#5A5A40] leading-relaxed space-y-4">{section.content}</div>
              </section>
            );
          })}
        </article>

        {article.externalRefs.length > 0 && (
          <aside className="bg-white rounded-3xl border border-[#D9D1C7] shadow-sm p-6 sm:p-8 mb-12">
            <h2 className="text-lg font-bold text-[#2C2C24] mb-3">Authoritative Sources</h2>
            <ul className="space-y-2 text-[#5A5A40]">
              {article.externalRefs.map((ref) => (
                <li key={ref.href}>
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noopener"
                    className="hover:underline"
                  >
                    {ref.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <FAQSection faqs={article.faqs} />

        <RelatedTools tools={article.relatedTools} articles={article.relatedArticles} />
      </main>
    </div>
  );
}
