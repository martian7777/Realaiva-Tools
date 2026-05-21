import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Search,
  Mail,
  Youtube,
  Wrench,
  Terminal,
  BarChart,
  LayoutList,
  Pin,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { getRecentArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Tools for Content, SEO, YouTube, Pinterest and Business",
  description:
    "Explore free AI tools by Realaiva for blog titles, meta descriptions, email subject lines, YouTube titles, prompts, product descriptions, keyword density, and more.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Free AI Tools for Content, SEO, YouTube, Pinterest and Business",
    description:
      "Explore free AI tools by Realaiva for blog titles, meta descriptions, email subject lines, YouTube titles, prompts, product descriptions, keyword density, and more.",
    url: SITE_URL,
    siteName: "Realaiva Tools",
    type: "website",
  },
};

interface Tool {
  name: string;
  description: string;
  slug: string;
  icon: LucideIcon;
}

interface Category {
  name: string;
  description: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    name: "AI Writing Tools",
    description: "Generate titles, outlines and descriptions that convert.",
    tools: [
      {
        name: "AI Blog Title Generator",
        description: "Create SEO-friendly blog titles for articles, guides, reviews, and list posts.",
        slug: "ai-blog-title-generator",
        icon: FileText,
      },
      {
        name: "Blog Outline Generator",
        description: "Structure your articles with comprehensive, SEO-optimized outlines.",
        slug: "blog-outline-generator",
        icon: LayoutList,
      },
      {
        name: "AI Product Description Generator",
        description: "Write persuasive product descriptions for Etsy, Amazon, and Shopify.",
        slug: "ai-product-description-generator",
        icon: ShoppingBag,
      },
    ],
  },
  {
    name: "SEO Tools",
    description: "Optimize on-page SEO with keyword and meta-data helpers.",
    tools: [
      {
        name: "Meta Description Generator",
        description: "Generate compelling meta descriptions to improve your CTR and SEO.",
        slug: "meta-description-generator",
        icon: Search,
      },
      {
        name: "Keyword Density Checker",
        description: "Analyze your text to optimize keyword usage and avoid keyword stuffing.",
        slug: "keyword-density-checker",
        icon: BarChart,
      },
    ],
  },
  {
    name: "YouTube Tools",
    description: "Craft click-worthy video titles and thumbnail text.",
    tools: [
      {
        name: "YouTube Title Generator",
        description: "Create click-worthy YouTube video titles optimized for search.",
        slug: "youtube-title-generator",
        icon: Youtube,
      },
    ],
  },
  {
    name: "Social Media Tools",
    description: "Win the scroll on Pinterest and beyond.",
    tools: [
      {
        name: "Pinterest Pin Title Generator",
        description: "Create viral pin titles and descriptions for Pinterest.",
        slug: "pinterest-pin-title-generator",
        icon: Pin,
      },
    ],
  },
  {
    name: "Email Tools",
    description: "Boost open rates with high-performing subject lines.",
    tools: [
      {
        name: "AI Email Subject Line Generator",
        description: "Write email subject lines that boost open rates for your campaigns.",
        slug: "ai-email-subject-line-generator",
        icon: Mail,
      },
    ],
  },
  {
    name: "Prompt & Discovery Tools",
    description: "Engineer better prompts and find the right AI tool for any job.",
    tools: [
      {
        name: "AI Prompt Generator",
        description: "Generate expert-level prompts for ChatGPT, Claude, and Gemini.",
        slug: "ai-prompt-generator",
        icon: Terminal,
      },
      {
        name: "AI Tool Finder",
        description: "Find the perfect AI tool for any specific use case or budget.",
        slug: "ai-tool-finder",
        icon: Wrench,
      },
    ],
  },
];

export default function Home() {
  const recentArticles = getRecentArticles(3);

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center">
      <header className="w-full h-16 flex items-center px-8 bg-white border-b border-[#D9D1C7]">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#2C2C24]">
            Realaiva <span className="text-[#5A5A40]">Tools</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/" className="text-sm font-medium text-[#5A5A40] hover:text-[#2C2C24]">
              All Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-[#8A857C] hover:text-[#5A5A40]">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C24] tracking-tight mb-4">
            Free AI Tools for Content Creators, Bloggers, Marketers and Businesses
          </h1>
          <p className="text-lg md:text-xl text-[#7A756C] max-w-3xl mx-auto leading-relaxed">
            A curated suite of free AI tools by Realaiva — for blog titles, meta descriptions,
            email subject lines, YouTube titles, product descriptions, prompts, Pinterest pins,
            and keyword density checks. No signup. No paywalls.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.name} aria-labelledby={`cat-${category.name}`}>
              <div className="mb-6">
                <h2
                  id={`cat-${category.name}`}
                  className="text-2xl md:text-3xl font-serif text-[#2C2C24]"
                >
                  {category.name}
                </h2>
                <p className="text-[#7A756C] mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.tools.map((tool) => (
                  <ToolCard key={tool.slug} {...tool} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20" aria-labelledby="from-the-blog">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2
                id="from-the-blog"
                className="text-2xl md:text-3xl font-serif text-[#2C2C24]"
              >
                From the Realaiva Blog
              </h2>
              <p className="text-[#7A756C] mt-1">
                Honest guides on AI tools, SEO, and content marketing.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-[#5A5A40] hover:text-[#2C2C24] hidden sm:inline"
            >
              View all posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((a) => (
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
                  <h3 className="text-lg font-serif text-[#2C2C24] mb-2 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[#7A756C] leading-relaxed flex-1">{a.excerpt}</p>
                  <div className="text-xs text-[#8A857C] mt-3">{a.readMinutes} min read</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
