import ToolLayout from "@/components/ToolLayout";
import ProductDescriptionClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Product Description Generator";
const OUTPUT_TYPE = "persuasive product descriptions";
const AUDIENCE = "Etsy sellers, Gumroad creators, and Shopify store owners";
const SLUG = "ai-product-description-generator";
const FOCUS_KEYWORD = "AI product description generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop",
  alt: "AI product description generator creating ecommerce product descriptions for online stores",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free AI Product Description Generator for Ecommerce Listings in 2026",
  metaDescription:
    "Generate persuasive product descriptions for ecommerce stores, Etsy, Shopify, Amazon-style listings, and digital products with our free AI product description generator.",
});

const faqs = [
  {
    question: "What is an AI product description generator?",
    answer:
      "An AI product description generator is a free copywriting tool that transforms a list of product features into a benefit-led, conversion-optimized description suitable for Shopify, Etsy, Gumroad, or Amazon-style listings.",
  },
  {
    question: "Is this AI product description generator free?",
    answer: "Yes, the Realaiva AI product description generator is completely free.",
  },
  {
    question: "How does the AI product description generator work?",
    answer:
      "Enter your product name, target audience, key features, and the platform you sell on. The AI product description generator outputs a complete listing — hook, bullets, benefits, and CTA — tailored to that platform.",
  },
  {
    question: "Can the AI product description generator help with SEO?",
    answer:
      "Yes. It generates SEO-friendly titles and search tags, helping your products rank in platform-specific search engines like Etsy Search and Amazon's A10.",
  },
  {
    question: "Does this tool store my product information?",
    answer:
      "No. Your inputs are processed in real time and not saved on our servers.",
  },
  {
    question: "What makes a good product description?",
    answer:
      "A good product description sells the transformation, not the feature list. It explains how the product solves a pain point or improves the buyer's life in short, skimmable bullets.",
  },
  {
    question: "Can I use this AI product description generator for digital products?",
    answer:
      "Yes. The AI product description generator is optimized for digital templates, courses, and ebooks on Gumroad and Notion.",
  },
];

const contentSections = [
  {
    title: "What Is an AI Product Description Generator?",
    content: (
      <>
        <p>
          An AI product description generator is a free copywriting tool that turns product
          features into a buyer-ready listing. The Realaiva AI product description generator builds
          full descriptions — hook, benefit bullets, FAQ, and CTA — that fit Shopify, Etsy,
          Gumroad, Amazon, and similar platforms.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Product Description Generator",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the product name.</li>
          <li>Describe the target audience (be specific — &quot;new moms&quot;, &quot;solo founders&quot;).</li>
          <li>List 3–5 key features.</li>
          <li>Choose the platform (Shopify, Etsy, Gumroad, Amazon).</li>
          <li>Generate and paste into your listing.</li>
        </ol>
      </>
    ),
  },
  {
    title: "What Makes a Product Description Sell?",
    content: (
      <>
        <p>
          In my opinion, the biggest mistake in product descriptions is listing features without
          explaining why they matter. A customer does not only want to know what the product has.
          They want to know how it helps them, saves time, solves a problem, or improves their
          life.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Hook in the first sentence.</li>
          <li>Benefits before features.</li>
          <li>Short, skimmable bullets.</li>
          <li>One specific CTA at the end.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Product Description Examples by Product Type",
    content: (
      <>
        <p>
          <strong>Weak:</strong> Stainless steel bottle, 1000ml, insulated, portable.
        </p>
        <p>
          <strong>Better:</strong> Keep your drinks hot or cold for hours with this 1000ml
          stainless steel insulated bottle — designed for travel, office use, gym routines, and
          everyday hydration.
        </p>
        <p>
          <strong>Weak (digital):</strong> Notion template, productivity, dashboard.
        </p>
        <p>
          <strong>Better (digital):</strong> The all-in-one Notion productivity dashboard that
          replaces your task app, journal, and weekly planner — set up in under 5 minutes, even if
          you&apos;ve never used Notion before.
        </p>
      </>
    ),
  },
  {
    title: "Features vs Benefits: What Should You Write?",
    content: (
      <>
        <p>
          A feature is what the product has. A benefit is what the customer gets.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Feature:</strong> 500GB storage. <strong>Benefit:</strong> Hold 100,000 photos without ever running out.</li>
          <li><strong>Feature:</strong> 8-hour battery. <strong>Benefit:</strong> Work a full day without finding a charger.</li>
          <li><strong>Feature:</strong> Organic cotton. <strong>Benefit:</strong> Feels softer after every wash without itching.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Ecommerce SEO Tips for Product Descriptions",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the focus keyword in the title, first sentence, and one bullet.</li>
          <li>Write unique descriptions for every variant — never duplicate.</li>
          <li>Include common search terms (size, color, use case).</li>
          <li>Add an FAQ block for long-tail keyword coverage.</li>
          <li>Use platform-specific tags (Etsy tags, Amazon backend keywords).</li>
        </ul>
      </>
    ),
  },
  {
    title: "Common Product Description Mistakes",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Listing features without explaining benefits.</li>
          <li>Writing one giant paragraph instead of skimmable bullets.</li>
          <li>Using the same description for every product variant.</li>
          <li>Burying the call to action.</li>
          <li>Stuffing keywords until the copy reads unnaturally.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Related Business Tools",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-email-subject-line-generator">AI Email Subject Line Generator</a></li>
          <li><a className="underline" href="/pinterest-pin-title-generator">Pinterest Pin Title Generator</a></li>
          <li><a className="underline" href="/ai-prompt-generator">AI Prompt Generator</a></li>
          <li><a className="underline" href="/meta-description-generator">Meta Description Generator</a></li>
        </ul>
        <p>
          Read more:{" "}
          <a className="underline" href="/blog/best-ai-tools-for-digital-marketing">
            Best AI Tools for Digital Marketing
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Email Subject Line Generator", slug: "ai-email-subject-line-generator" },
  { name: "Pinterest Pin Title Generator", slug: "pinterest-pin-title-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
  { name: "Meta Description Generator", slug: "meta-description-generator" },
];

const externalRefs = [
  {
    label: "Google Search Central: Product structured data",
    href: "https://developers.google.com/search/docs/appearance/structured-data/product",
  },
  {
    label: "Google SEO Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
];

export default function ProductDescriptionPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The free ${FOCUS_KEYWORD} by Realaiva writes benefit-led ${OUTPUT_TYPE} for Shopify, Etsy, Gumroad, and Amazon-style listings in seconds.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <ProductDescriptionClient />
      </ToolLayout>
    </>
  );
}
