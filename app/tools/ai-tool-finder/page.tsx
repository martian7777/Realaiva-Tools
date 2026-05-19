import ToolLayout from "@/components/ToolLayout";
import AIToolFinderClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Tool Finder";
const OUTPUT_TYPE = "personalized AI tool recommendations";
const AUDIENCE = "students, marketers, creators, and professionals";
const SLUG = "ai-tool-finder";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is the AI Tool Finder?",
    answer: "It is an intelligent recommendation engine that analyzes your specific goals, budget, and skill level to suggest the perfect 'stack' of AI tools for your needs out of thousands of options available today."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, our AI Tool Finder is completely free."
  },
  {
    question: "How does this tool work?",
    answer: "You describe what you are trying to accomplish (e.g., 'edit a podcast' or 'write a book'), your budget, and your experience level. We instantly match you with a curated list of tools along with pros, cons, and pricing."
  },
  {
    question: "Can I use it for business?",
    answer: "Definitely. Businesses frequently use this tool to discover enterprise-grade AI solutions for productivity, customer support, or SEO without spending hours researching."
  },
  {
    question: "Does it store my data?",
    answer: "No, your queries are processed in real-time to generate your custom recommendations and are not saved."
  },
  {
    question: "Why do I need an 'AI Stack'?",
    answer: "Rarely does one single tool do everything perfectly. For instance, you might use ChatGPT for brainstorming, SurferSEO for content optimization, and Midjourney to generate featured images. Building a 'stack' increases efficiency and output quality."
  }
];

const contentSections = [
  {
    title: "How to choose the right AI tool",
    content: (
      <ul>
        <li><strong>Define the problem:</strong> Are you trying to save time, increase quality, or do something you don't have the skills for (like coding or design)? Knowing your exact goal prevents you from subscribing to tools you don't need.</li>
        <li><strong>Check integration capabilities:</strong> Ensure the AI tool integrates well into your current workflow. If you use Google Docs, look for an AI with a Chrome extension.</li>
        <li><strong>Watch out for hidden costs:</strong> Many tools offer a free tier but lock essential features behind expensive monthly paywalls. Always check token limits and export restrictions.</li>
      </ul>
    )
  },
  {
    title: "Best AI tool categories",
    content: <p>The landscape is divided mainly into: Generative Text (ChatGPT, Claude), SEO & Content Marketing (Frase, SurferSEO), Visuals & Video (Midjourney, RunwayML, Canva), and Audio/Speech (ElevenLabs, Descript). Depending on your role, you'll generally pull one tool from a few of these distinct categories.</p>
  },
  {
    title: "Free vs Paid AI Tools",
    content: <p>Freemium tools are adequate for beginners and one-off tasks. However, if you are running a business or a YouTube channel, upgrading to paid tools often grants you commercial rights, API access, faster processing times, and higher quality outputs (like 4K video or GPT-4 level reasoning).</p>
  }
];

const relatedTools = [
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
  { name: "AI Product Description Generator", slug: "ai-product-description-generator" }
];

export default function AIToolFinderPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The ${TOOL_NAME} by Realaiva helps you discover the perfect AI software for any task. Get a custom stack tailored to your budget and needs in seconds.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <AIToolFinderClient />
      </ToolLayout>
    </>
  );
}
