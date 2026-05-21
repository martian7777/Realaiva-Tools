import ToolLayout from "@/components/ToolLayout";
import MetaDescriptionGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Meta Description Generator";
const OUTPUT_TYPE = "SEO Meta Descriptions";
const AUDIENCE = "blog posts, product pages, tools, and services";
const SLUG = "meta-description-generator";
const FOCUS_KEYWORD = "meta description generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1600&q=80&auto=format&fit=crop",
  alt: "Meta description generator creating SEO-friendly search snippets on a dashboard",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free Meta Description Generator for SEO and Higher CTR in 2026",
  metaDescription:
    "Use our free meta description generator to create clear, SEO-friendly meta descriptions for blog posts, product pages, landing pages, and websites in seconds.",
});

const faqs = [
  {
    question: "What is a meta description generator?",
    answer:
      "A meta description generator is an AI tool that writes the 150–160 character snippet that appears under your page title in Google search results, optimized for clicks and SEO.",
  },
  {
    question: "Is this meta description generator free?",
    answer: "Yes. The Realaiva meta description generator is 100% free with no signup.",
  },
  {
    question: "How does the meta description generator work?",
    answer:
      "Enter your page topic, target keyword, page type, and tone. The AI writes multiple meta description options that fit inside Google's character limit and include a clear call to action.",
  },
  {
    question: "Does the meta description affect SEO?",
    answer:
      "Indirectly. The meta description is not a direct ranking factor, but a well-written one raises click-through rate, which can improve rankings over time.",
  },
  {
    question: "Does this tool store my data?",
    answer:
      "No. The meta description generator processes your inputs in real time and does not save them.",
  },
  {
    question: "What is the ideal meta description length?",
    answer:
      "Between 150 and 160 characters including spaces. Anything longer is truncated by Google with an ellipsis, hiding your call to action.",
  },
  {
    question: "Can I use the meta description generator for ecommerce?",
    answer:
      "Yes. The meta description generator works for blog posts, landing pages, product pages, category pages, and any URL that needs a search snippet.",
  },
];

const contentSections = [
  {
    title: "What Is a Meta Description Generator?",
    content: (
      <>
        <p>
          A meta description generator is a free AI tool that writes the short snippet of text
          shown under your page title in Google search results. The Realaiva meta description
          generator turns a topic + focus keyword into multiple 150–160 character options,
          optimized for click-through rate without sounding spammy.
        </p>
        <p>
          It saves writers, marketers, and store owners the hassle of manually counting characters
          and rewriting until something fits.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Meta Description Generator",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Type the topic of your page (be specific).</li>
          <li>Add the focus keyword.</li>
          <li>Select page type: blog post, product, landing page, or category.</li>
          <li>Pick a tone (friendly, expert, persuasive).</li>
          <li>Generate and copy the option you like best.</li>
        </ol>
        <p>
          I personally prefer meta descriptions that sound natural instead of stuffed with keywords.
          A strong meta description should feel like a short promise: tell the reader what they
          will get, why it matters, and why they should click now.
        </p>
      </>
    ),
  },
  {
    title: "Why Meta Descriptions Matter for SEO",
    content: (
      <>
        <p>
          Google does not use the meta description as a direct ranking signal, but it heavily
          influences what users click on. Higher CTR sends positive engagement signals back to
          Google, which can lift rankings over time.
        </p>
        <p>
          A meta description also reinforces relevance: when the searched phrase appears in the
          snippet, Google bolds it, drawing the eye and making your result feel more relevant than
          the others on the page.
        </p>
      </>
    ),
  },
  {
    title: "How Long Should a Meta Description Be?",
    content: (
      <>
        <p>
          The ideal length is between <strong>150 and 160 characters</strong>, including spaces.
          Anything longer is cut off with an ellipsis (…) on most devices, hiding your call to
          action. Anything shorter usually wastes free CTR real estate.
        </p>
        <p>
          The meta description generator automatically keeps every output inside the safe limit,
          but you should still review the final version on mobile, where Google sometimes truncates
          earlier.
        </p>
      </>
    ),
  },
  {
    title: "Good vs Bad Meta Description Examples",
    content: (
      <>
        <p>
          <strong>Bad:</strong> Best tools AI SEO marketing blog content keywords.
          <br />
          <strong>Better:</strong> Discover the best AI SEO tools to improve keyword research,
          content optimization, rankings, and technical SEO faster.
        </p>
        <p>
          <strong>Bad:</strong> Read our blog post about meta descriptions.
          <br />
          <strong>Better:</strong> Learn how to write meta descriptions that boost CTR. Free
          examples, templates, and a step-by-step formula for SEO.
        </p>
      </>
    ),
  },
  {
    title: "Meta Description Writing Tips",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Include the focus keyword once, naturally.</li>
          <li>Lead with a benefit or specific outcome.</li>
          <li>End with a clear CTA (&quot;Learn how&quot;, &quot;Get started&quot;, &quot;Shop today&quot;).</li>
          <li>Write a unique description for every page on your site.</li>
          <li>Keep it human — read it out loud before saving.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Common Mistakes to Avoid",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Letting WordPress auto-generate a meta description from the first paragraph.</li>
          <li>Stuffing the focus keyword three times.</li>
          <li>Writing &quot;Best [keyword] 2026 [keyword] cheap [keyword]&quot; — Google may rewrite it.</li>
          <li>Copy-pasting the same description across multiple pages.</li>
          <li>Forgetting the call to action.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Related SEO Tools",
    content: (
      <>
        <p>
          Use the meta description generator alongside these other free Realaiva SEO tools:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a> — write the title before the meta.</li>
          <li><a className="underline" href="/keyword-density-checker">Keyword Density Checker</a> — confirm your focus keyword sits near 1%.</li>
          <li><a className="underline" href="/blog-outline-generator">Blog Outline Generator</a> — get the structure right first.</li>
          <li><a className="underline" href="/ai-product-description-generator">AI Product Description Generator</a> — for ecommerce listings.</li>
        </ul>
        <p>
          Full guide:{" "}
          <a className="underline" href="/blog/best-ai-seo-tools-2026">
            Best AI SEO Tools in 2026
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Keyword Density Checker", slug: "keyword-density-checker" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
  { name: "AI Product Description Generator", slug: "ai-product-description-generator" },
];

const externalRefs = [
  {
    label: "Google Search Central: Meta tags Google understands",
    href: "https://developers.google.com/search/docs/crawling-indexing/special-tags",
  },
  {
    label: "Rank Math: General Tab On-Page SEO",
    href: "https://rankmath.com/kb/general-tab/",
  },
];

export default function MetaDescriptionGeneratorPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The free ${FOCUS_KEYWORD} by Realaiva helps writers, marketers, and store owners create SEO-friendly ${OUTPUT_TYPE.toLowerCase()} that boost CTR — in seconds, with no signup.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <MetaDescriptionGeneratorClient />
      </ToolLayout>
    </>
  );
}
