import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: "Free AI Tools Suite by Realaiva - SEO & Marketing Tools",
  description:
    "A comprehensive suite of free AI tools designed to turbocharge your SEO, content creation, and marketing strategies.",
  alternates: { canonical: 'https://tools.realaiva.com' },
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
      </main>
      <footer className="mt-auto py-8 text-center text-[#8A857C]">
        <p>© {new Date().getFullYear()} Realaiva. All rights reserved.</p>
      </footer>
    </div>
  );
}
