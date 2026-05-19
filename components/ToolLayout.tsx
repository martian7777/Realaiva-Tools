import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  title: string;
  intro: string;
  children: React.ReactNode;
  contentSections: { title: string; content: React.ReactNode }[];
  faqs: FAQ[];
  relatedTools: { name: string; slug: string }[];
}

export default function ToolLayout({
  title,
  intro,
  children,
  contentSections,
  faqs,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans">
      <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[#D9D1C7]">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#2C2C24]">
            Realaiva <span className="text-[#5A5A40]">Tools</span>
          </Link>
          <nav>
            <Link href="/" className="text-sm font-medium text-[#8A857C] hover:text-[#5A5A40]">
              All Tools
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-[#8A857C] mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-[#5A5A40] inline-flex items-center">
                🏠 Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link href="/" className="hover:text-[#5A5A40]">Tools</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-[#5A5A40] font-semibold">{title.replace('Free ', '')}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2C24] mb-4">{title}</h1>
          <p className="text-lg text-[#7A756C] max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Tool Application Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#D9D1C7] p-6 sm:p-8 mb-16">
          {children}
        </div>

        {/* SEO Content Sections */}
        <div className="prose max-w-none mb-16 text-[#3A3A32]">
          {contentSections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-2xl font-serif text-[#2C2C24] mb-4">{section.title}</h2>
              <div className="text-[#7A756C] leading-relaxed space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-[#2C2C24] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-[#D9D1C7] p-8">
                <h3 className="text-xl font-bold text-[#2C2C24] mb-2">{faq.question}</h3>
                <p className="text-[#7A756C] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="bg-[#E2DCD3] rounded-3xl p-8 border border-[#D9D1C7]">
          <h2 className="text-xl font-bold text-[#2C2C24] mb-4">Explore More Resources</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map(t => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="text-[#5A5A40] hover:underline font-medium">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://realaiva.com/best-ai-seo-tools" className="text-[#5A5A40] hover:underline font-medium">
                Best AI SEO Tools
              </Link>
            </li>
            <li>
              <Link href="https://realaiva.com/best-ai-tools-for-writing-blog-posts" className="text-[#5A5A40] hover:underline font-medium">
                Best AI Tools for Writing Blog Posts
              </Link>
            </li>
            <li>
              <Link href="/" className="text-[#5A5A40] hover:underline font-medium">
                Main Tools Hub
              </Link>
            </li>
            <li>
              <Link href="https://realaiva.com" className="text-[#5A5A40] hover:underline font-medium">
                Realaiva Homepage
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
