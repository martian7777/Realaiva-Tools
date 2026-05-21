import ToolLayout from "@/components/ToolLayout";
import EmailSubjectGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Email Subject Line Generator";
const OUTPUT_TYPE = "email subject lines";
const AUDIENCE = "newsletters, cold emails, and marketing campaigns";
const SLUG = "ai-email-subject-line-generator";
const FOCUS_KEYWORD = "AI email subject line generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1600&q=80&auto=format&fit=crop",
  alt: "AI email subject line generator for newsletters and marketing emails on a clean dashboard",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free AI Email Subject Line Generator for Better Open Rates in 2026",
  metaDescription:
    "Create 10+ catchy email subject lines for newsletters, promotions, cold emails, and follow-ups with our free AI email subject line generator. No signup required.",
});

const faqs = [
  {
    question: "What is an AI email subject line generator?",
    answer:
      "An AI email subject line generator is a free tool that analyzes the purpose, tone, and audience of your email and instantly outputs multiple high-converting subject line options designed to boost open rates.",
  },
  {
    question: "Is this AI email subject line generator free?",
    answer: "Yes, the Realaiva AI email subject line generator is fully free with no signup.",
  },
  {
    question: "How does this AI email subject line generator work?",
    answer:
      "Enter the topic of your email, your target audience, tone, and length preference. The tool outputs a list of creative subject lines with preview text recommendations and a basic spam-word check.",
  },
  {
    question: "What is the ideal email subject line length?",
    answer:
      "Around 6 to 8 words, or roughly 40–50 characters. Mobile inboxes typically crop anything longer.",
  },
  {
    question: "Does this tool store my email content?",
    answer:
      "No. The AI email subject line generator processes your input in real time and does not save your text.",
  },
  {
    question: "Can the AI email subject line generator be used for cold emails?",
    answer:
      "Yes. The tool produces curiosity-driven, low-pressure subject lines specifically tuned for cold outreach without triggering spam filters.",
  },
  {
    question: "Can I use this AI email subject line generator for business?",
    answer:
      "Absolutely. It works for B2B cold outreach, ecommerce promotions, SaaS newsletters, and corporate announcements.",
  },
];

const contentSections = [
  {
    title: "What Is an AI Email Subject Line Generator?",
    content: (
      <>
        <p>
          An AI email subject line generator is a free tool that writes the most important line of
          your campaign — the one that decides whether the email gets opened at all. The Realaiva
          AI email subject line generator turns a topic + audience + tone into a ranked list of
          subject lines you can A/B test in your email platform.
        </p>
        <p>
          Used right, it removes the &quot;blank inbox&quot; problem and lets you ship newsletters,
          cold sequences, and promo campaigns faster.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Email Subject Line Tool",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the topic or purpose of your email.</li>
          <li>Select audience (newsletter, customers, cold prospects).</li>
          <li>Pick tone (friendly, urgent, professional).</li>
          <li>Set length: mobile-optimized (under 50 chars) or standard.</li>
          <li>Generate. Pick two for A/B testing.</li>
        </ol>
      </>
    ),
  },
  {
    title: "What Makes an Email Subject Line Work?",
    content: (
      <>
        <p>
          My personal rule is simple: if the subject line sounds like something I would instantly
          delete from my inbox, I do not use it. Good email subject lines create curiosity, but they
          should not trick the reader.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Specific &gt; clever.</li>
          <li>Curiosity &gt; aggressive sales language.</li>
          <li>Personalisation (name, city, recent action) &gt; generic blasts.</li>
          <li>Short &gt; long. Mobile cuts most lines after 40 characters.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Email Subject Line Examples by Use Case",
    content: (
      <>
        <p><strong>Newsletter:</strong> 5 AI tools worth trying this week</p>
        <p><strong>Promotion:</strong> Your 20% discount ends tonight</p>
        <p><strong>Cold email:</strong> Quick idea for improving your website content</p>
        <p><strong>Follow-up:</strong> Following up on my previous message</p>
        <p><strong>Re-engagement:</strong> We miss you — here&apos;s a 15% gift inside</p>
        <p><strong>Product launch:</strong> Meet the new [Product Name] — built for [Audience]</p>
      </>
    ),
  },
  {
    title: "Best Practices for Promotional Emails",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lead with the benefit, not the brand.</li>
          <li>Use one emoji at most, and only if it matches tone.</li>
          <li>State the deadline if there is one (&quot;ends tonight&quot;, &quot;48 hours left&quot;).</li>
          <li>Avoid ALL CAPS, exclamation marks, and the word &quot;FREE&quot; in capitals.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Best Practices for Cold Email Subject Lines",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep it lowercase and casual — looks like a real person, not a marketing blast.</li>
          <li>Ask a soft, useful question (&quot;quick idea for X?&quot;).</li>
          <li>Avoid &quot;Re:&quot; tricks unless it really is a reply.</li>
          <li>Mention something specific about the recipient when possible.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Mistakes That Make Emails Look Like Spam",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Words like &quot;FREE!!!&quot;, &quot;GUARANTEED&quot;, &quot;ACT NOW&quot; in caps.</li>
          <li>Three or more emojis in a row.</li>
          <li>Misleading subject lines that do not match the email body.</li>
          <li>Reusing the same subject across every campaign.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Related Free Tools",
    content: (
      <>
        <p>
          Combine the AI email subject line generator with these tools to ship a full campaign:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a> — for the lead-magnet blog post you link to.</li>
          <li><a className="underline" href="/ai-product-description-generator">AI Product Description Generator</a> — for the email body when promoting a product.</li>
          <li><a className="underline" href="/ai-prompt-generator">AI Prompt Generator</a> — for body-copy rewriting in ChatGPT or Claude.</li>
          <li><a className="underline" href="/pinterest-pin-title-generator">Pinterest Pin Title Generator</a> — for matching social distribution.</li>
        </ul>
        <p>
          Read the broader guide:{" "}
          <a className="underline" href="/blog/best-ai-tools-for-digital-marketing">
            Best AI Tools for Digital Marketing
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "AI Product Description Generator", slug: "ai-product-description-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
  { name: "Pinterest Pin Title Generator", slug: "pinterest-pin-title-generator" },
];

const externalRefs = [
  {
    label: "Google Search Central: Spam policies",
    href: "https://developers.google.com/search/docs/essentials/spam-policies",
  },
  {
    label: "Google SEO Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
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
        intro={`The free ${FOCUS_KEYWORD} by Realaiva helps marketers and creators write ${OUTPUT_TYPE} that lift open rates — for newsletters, promotions, and cold outreach.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <EmailSubjectGeneratorClient />
      </ToolLayout>
    </>
  );
}
