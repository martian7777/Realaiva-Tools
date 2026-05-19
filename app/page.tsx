import Link from "next/link";
import { ArrowRight, FileText, Search, Mail, Youtube, Wrench, Terminal, BarChart, LayoutList, Pin, ShoppingBag } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Tools Suite by Realaiva - SEO & Marketing Tools",
  description: "A comprehensive suite of free AI tools designed to turbocharge your SEO, content creation, and marketing strategies.",
};

const tools = [
  {
    name: "AI Blog Title Generator",
    description: "Create SEO-friendly blog titles for articles, guides, reviews, and list posts.",
    slug: "ai-blog-title-generator",
    icon: FileText,
  },
  {
    name: "Meta Description Generator",
    description: "Generate compelling meta descriptions to improve your CTR and SEO.",
    slug: "meta-description-generator",
    icon: Search,
  },
  {
    name: "AI Email Subject Line Generator",
    description: "Write email subject lines that boost open rates for your campaigns.",
    slug: "ai-email-subject-line-generator",
    icon: Mail,
  },
  {
    name: "YouTube Title Generator",
    description: "Create click-worthy YouTube video titles optimized for search.",
    slug: "youtube-title-generator",
    icon: Youtube,
  },
  {
    name: "AI Tool Finder",
    description: "Find the perfect AI tool for any specific use case or budget.",
    slug: "ai-tool-finder",
    icon: Wrench,
  },
  {
    name: "AI Prompt Generator",
    description: "Generate expert-level prompts for ChatGPT, Claude, and Gemini.",
    slug: "ai-prompt-generator",
    icon: Terminal,
  },
  {
    name: "Keyword Density Checker",
    description: "Analyze your text to optimize keyword usage and avoid keyword stuffing.",
    slug: "keyword-density-checker",
    icon: BarChart,
  },
  {
    name: "Blog Outline Generator",
    description: "Structure your articles with comprehensive, SEO-optimized outlines.",
    slug: "blog-outline-generator",
    icon: LayoutList,
  },
  {
    name: "Pinterest Pin Title Generator",
    description: "Create viral pin titles and descriptions for Pinterest.",
    slug: "pinterest-pin-title-generator",
    icon: Pin,
  },
  {
    name: "AI Product Description Generator",
    description: "Write persuasive product descriptions for Etsy, Amazon, and Shopify.",
    slug: "ai-product-description-generator",
    icon: ShoppingBag,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center">
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C24] tracking-tight mb-4">
            Realaiva AI Tools Suite
          </h1>
          <p className="text-lg md:text-xl text-[#7A756C] max-w-2xl mx-auto">
            Supercharge your marketing and content creation with our collection of free, high-quality AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link 
                key={tool.slug} 
                href={`/tools/${tool.slug}`}
                className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 border border-[#D9D1C7] flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-[#F1F0EA] text-[#5A5A40] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-[#2C2C24] mb-2 group-hover:text-[#5A5A40] transition-colors">
                  {tool.name}
                </h2>
                <p className="text-[#7A756C] mb-6 flex-grow">
                  {tool.description}
                </p>
                <div className="flex items-center text-[#5A5A40] font-medium tracking-wide uppercase text-sm">
                  Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </main>
      <footer className="mt-auto py-8 text-center text-[#8A857C]">
         <p>© {new Date().getFullYear()} Realaiva. All rights reserved.</p>
      </footer>
    </div>
  );
}
