import ToolLayout from "@/components/ToolLayout";
import KeywordDensityClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Keyword Density Checker";
const OUTPUT_TYPE = "keyword density analysis";
const AUDIENCE = "SEO professionals, writers, and marketers";
const SLUG = "keyword-density-checker";
const FOCUS_KEYWORD = "keyword density checker";

const HERO = {
  src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
  alt: "Keyword density checker analyzing SEO keyword usage on an analytics dashboard",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free Keyword Density Checker for SEO Content Optimization in 2026",
  metaDescription:
    "Check keyword density, repeated words, and SEO keyword usage in your content with Realaiva's free keyword density checker. No signup. Browser-only analysis.",
});

const faqs = [
  {
    question: "What is a keyword density checker?",
    answer:
      "A keyword density checker is a free SEO tool that calculates how often your focus keyword appears in your content, expressed as a percentage of total words.",
  },
  {
    question: "Is this keyword density checker free?",
    answer: "Yes. The Realaiva keyword density checker is 100% free and requires no signup.",
  },
  {
    question: "How does this keyword density checker work?",
    answer:
      "Paste your content into the tool and optionally enter your focus keyword. The keyword density checker counts total words and reports the density of your focus keyword plus the most frequent phrases in the text.",
  },
  {
    question: "Is keyword density still a ranking factor in 2026?",
    answer:
      "Keyword density is not a direct ranking factor, but using your keyword naturally (and avoiding stuffing) helps Google understand the topic and keeps you safe from spam-policy penalties.",
  },
  {
    question: "Does this tool store my content?",
    answer:
      "No. The keyword density checker runs in your browser and never sends your text to a server.",
  },
  {
    question: "What is the ideal keyword density?",
    answer:
      "A natural density between 0.5% and 1.5% works best in 2026. Anything above 2.5% risks being flagged as keyword stuffing.",
  },
  {
    question: "Can the keyword density checker be used for business?",
    answer:
      "Yes. Content managers and agencies use it to audit writer submissions before publishing on corporate blogs and landing pages.",
  },
];

const contentSections = [
  {
    title: "What Is a Keyword Density Checker?",
    content: (
      <>
        <p>
          A keyword density checker is a free SEO tool that measures how frequently your focus
          keyword appears in your content. The Realaiva keyword density checker runs entirely in
          your browser — paste a draft, get an instant report on word count, character count, and
          the percentage density of your main keyword and related phrases.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Keyword Density Checker",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste your full article into the input box.</li>
          <li>Optionally enter the focus keyword (otherwise the tool surfaces top phrases).</li>
          <li>Read the report: density %, total words, repeated phrases.</li>
          <li>Rewrite if density is below 0.5% or above 1.5%.</li>
        </ol>
      </>
    ),
  },
  {
    title: "What Is Keyword Density?",
    content: (
      <>
        <p>
          Keyword density is the number of times your focus keyword appears, divided by total
          words, expressed as a percentage. In a 1,000-word article that uses &quot;keyword density
          checker&quot; 10 times, the density is 1%.
        </p>
        <p>
          Modern search engines rely on semantic understanding more than raw density, but density
          remains a useful sanity check for over- and under-optimization.
        </p>
      </>
    ),
  },
  {
    title: "Does Keyword Density Still Matter for SEO?",
    content: (
      <>
        <p>
          Yes, but not in the way it used to. Google&apos;s helpful content guidance prioritises
          natural, useful writing over exact-match keyword frequency. A keyword density checker is
          still helpful because it catches two common mistakes:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Density of 0% — meaning your focus keyword does not appear, and Google has no anchor.</li>
          <li>Density above 3% — meaning Google&apos;s spam policies may flag the page as stuffed.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How to Use Keywords Naturally",
    content: (
      <>
        <p>
          I do not recommend chasing an exact keyword density number blindly. A page can have a
          perfect percentage and still read badly. Use the keyword density checker as a warning
          signal, not as the final SEO decision.
        </p>
        <p>Use your main keyword in:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>SEO title</li>
          <li>Meta description</li>
          <li>URL</li>
          <li>First paragraph (within the first 100 words)</li>
          <li>At least one H2</li>
          <li>Image alt text</li>
          <li>Naturally throughout the content, with synonyms</li>
        </ul>
      </>
    ),
  },
  {
    title: "Keyword Stuffing vs Helpful Optimization",
    content: (
      <>
        <p>
          Keyword stuffing means inserting the focus keyword unnaturally — repeating it inside the
          same sentence, packing it into every H2, or hiding it in white text. Helpful
          optimization means using the keyword where a reader would naturally expect it.
        </p>
        <p>
          The keyword density checker cannot tell the difference between &quot;natural&quot; and
          &quot;stuffed.&quot; That judgement is yours — but the percentage is a strong first signal.
        </p>
      </>
    ),
  },
  {
    title: "Keyword Density Examples",
    content: (
      <>
        <p>
          <strong>Stuffed (3%+):</strong> Our keyword density checker is the best keyword density
          checker. Use this keyword density checker to check keyword density. The keyword density
          checker checks keyword density…
        </p>
        <p>
          <strong>Natural (~1%):</strong> A keyword density checker counts how often your focus
          keyword appears in a piece of content. The Realaiva tool runs in your browser, returns a
          fast report, and helps you avoid stuffing without obsessing over the exact percentage.
        </p>
      </>
    ),
  },
  {
    title: "Related SEO Tools",
    content: (
      <>
        <p>Pair the keyword density checker with these Realaiva tools:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/meta-description-generator">Meta Description Generator</a></li>
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a></li>
          <li><a className="underline" href="/blog-outline-generator">Blog Outline Generator</a></li>
          <li><a className="underline" href="/ai-prompt-generator">AI Prompt Generator</a></li>
        </ul>
        <p>
          Read the full guide:{" "}
          <a className="underline" href="/blog/best-ai-seo-tools-2026">
            Best AI SEO Tools in 2026
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "Meta Description Generator", slug: "meta-description-generator" },
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
];

const externalRefs = [
  {
    label: "Google Search Central: Spam policies",
    href: "https://developers.google.com/search/docs/essentials/spam-policies",
  },
  {
    label: "Rank Math: General Tab On-Page SEO",
    href: "https://rankmath.com/kb/general-tab/",
  },
];

export default function KeywordDensityPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The free ${FOCUS_KEYWORD} by Realaiva analyses any draft for ${OUTPUT_TYPE} — fast, in-browser, and without saving your text.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <KeywordDensityClient />
      </ToolLayout>
    </>
  );
}
