import ToolLayout from "@/components/ToolLayout";
import ProductDescriptionClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Product Description Generator";
const OUTPUT_TYPE = "persuasive product descriptions";
const AUDIENCE = "Etsy sellers, Gumroad creators, and Shopify store owners";
const SLUG = "ai-product-description-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is an AI Product Description Generator?",
    answer: "It is an AI-powered copywriting tool that takes your basic product features and transforms them into a highly persuasive, conversion-optimized sales page or listing description."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva AI Product Description Generator is completely free."
  },
  {
    question: "How does this tool work?",
    answer: "You input your product name, who it is for, and its key features. You then select where you are selling it (e.g., Etsy, Gumroad). The AI then formats a complete story-driven listing including hooks, bullet points, and even FAQs tailored specifically for that platform."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes, the tool generates SEO-friendly titles and search tags at the bottom of the output, which helps your products rank higher in platform-specific search engines like Etsy Search or Amazon A10."
  },
  {
    question: "Does it store my data?",
    answer: "No, your product ideas and generated copy are not stored remotely on our servers."
  },
  {
    question: "What makes a good product description?",
    answer: "A good product description doesn't just list features; it sells the transformation. It explains how the product solves a specific pain point or improves the buyer's life, using easy-to-read bullet points and a clear call to action."
  },
  {
    question: "Can I use this for digital products?",
    answer: "Absolutely. The tool is heavily optimized for digital creators selling templates, courses, and e-books on platforms like Gumroad and Notion."
  }
];

const contentSections = [
  {
    title: "What is an AI Product Description Generator?",
    content: <p>Writing product descriptions is one of the most tedious parts of running an online store. An AI Product Description Generator acts as your personal digital copywriter. Instead of staring at a blank page on Shopify or Gumroad, you provide a few bullet points, and the AI crafts a compelling story that makes customers want to buy immediately.</p>
  },
  {
    title: "How to write product descriptions that sell",
    content: (
      <ul>
        <li><strong>Focus on benefits, not features:</strong> A feature is '500GB storage'. A benefit is 'Hold 100,000 photos of your family without ever seeing a storage warning again.' People buy benefits.</li>
        <li><strong>Know your audience:</strong> If you are selling aesthetic Notion templates to college students, your tone should be casual and aesthetic. If you are selling B2B software, keep it professional and ROI-focused.</li>
        <li><strong>Make it skimmable:</strong> Online shoppers do not read; they skim. Use bold text, short paragraphs, and bullet points to convey the most important information quickly.</li>
      </ul>
    )
  },
  {
    title: "Product description examples",
    content: (
      <ul>
        <li><strong>Etsy Example:</strong> Emphasize the handmade nature, the materials, and how it makes the perfect gift.</li>
        <li><strong>Gumroad Example:</strong> Focus on the immediate digital download, the exact files included, and the massive time-saving benefits.</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "Pinterest Pin Title Generator", slug: "pinterest-pin-title-generator" },
  { name: "Meta Description Generator", slug: "meta-description-generator" }
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
        intro={`The ${TOOL_NAME} by Realaiva helps bloggers, marketers, students, and business owners create SEO-friendly ${OUTPUT_TYPE.toLowerCase()} in seconds.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <ProductDescriptionClient />
      </ToolLayout>
    </>
  );
}
