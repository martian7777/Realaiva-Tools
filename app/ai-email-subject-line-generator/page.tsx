import ToolLayout from "@/components/ToolLayout";
import EmailSubjectGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Email Subject Line Generator";
const OUTPUT_TYPE = "email subject lines";
const AUDIENCE = "newsletters, cold emails, and marketing campaigns";
const SLUG = "ai-email-subject-line-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is an AI Email Subject Line Generator?",
    answer: "It is an AI-powered tool that analyzes your email's purpose and audience to instantly generate multiple high-converting subject line variations designed to boost open rates."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the AI Email Subject Line Generator is fully free to use."
  },
  {
    question: "How does this tool work?",
    answer: "You input the topic or purpose of your email, along with target audience, tone, and length preferences. The tool outputs a list of creative subject lines, complete with preview text recommendations and a spam word check."
  },
  {
    question: "Can I use it for SEO?",
    answer: "While email subject lines don't directly affect website SEO, improving your email open rates drives more traffic back to your website, which is a positive engagement signal."
  },
  {
    question: "Does it store my data?",
    answer: "No, sensitive email contents or plans you type into the tool are processed momentarily by the AI to generate answers and are not saved."
  },
  {
    question: "What makes a good email subject line?",
    answer: "A great subject line creates curiosity or urgency without sounding spammy. It should be relatively short (under 50 characters for mobile optimization), personalized if possible, and paired with compelling preview text."
  },
  {
    question: "Can I use this for business?",
    answer: "Yes, it's perfect for B2B cold outreach, e-commerce promotions, SaaS newsletters, and general corporate communications."
  }
];

const contentSections = [
  {
    title: "What is an AI Email Subject Line Generator?",
    content: <p>Your email's subject line is its first impression. If it fails to capture attention, your meticulously crafted email will never be read. An AI Email Subject Line Generator takes the guesswork out of email copy by writing data-backed, psychologically compelling subject lines tailored to your exact marketing scenario.</p>
  },
  {
    title: "Best subject line length",
    content: <p>Mobile devices typically crop subject lines after 40-50 characters. For the best open rates, aim for <strong>6 to 8 words (or around 45 characters)</strong>. If you must use a longer subject line, ensure the most important, attention-grabbing words are at the very beginning.</p>
  },
  {
    title: "Promotional email subject examples",
    content: (
      <ul>
        <li>"Your summer wardrobe: 50% off inside ☀️"</li>
        <li>"Last chance: Your cart is expiring in 2 hours."</li>
        <li>"A special gift just for our VIPs."</li>
      </ul>
    )
  },
  {
    title: "Cold email subject examples",
    content: (
      <ul>
        <li>"Quick question regarding [Company Name]"</li>
        <li>"Ideas for your Q3 marketing strategy"</li>
        <li>"Are you facing this issue with [Pain Point]?"</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "Meta Description Generator", slug: "meta-description-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" }
];

export default function EmailSubjectGeneratorPage() {
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
        <EmailSubjectGeneratorClient />
      </ToolLayout>
    </>
  );
}
