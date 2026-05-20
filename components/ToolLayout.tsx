import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";

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
                <span className="text-[#5A5A40] font-semibold">{title.replace('Free ', '')}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2C24] mb-4">{title}</h1>
          <p className="text-lg text-[#7A756C] max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#D9D1C7] p-6 sm:p-8 mb-16">
          {children}
        </div>

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

        <FAQSection faqs={faqs} />

        <RelatedTools tools={relatedTools} />
      </main>
    </div>
  );
}
