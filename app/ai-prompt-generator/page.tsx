import ToolLayout from "@/components/ToolLayout";
import PromptGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Prompt Generator";
const OUTPUT_TYPE = "expert AI prompts";
const AUDIENCE = "ChatGPT, Claude, and Gemini users";
const SLUG = "ai-prompt-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is an AI Prompt Generator?",
    answer: "An AI Prompt Generator takes a simple, basic idea (like 'write a blog post') and transforms it into an incredibly detailed set of instructions (a prompt) that forces large language models to output significantly higher quality results."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, our Prompt Generator is completely free to use without limits."
  },
  {
    question: "How does this tool work?",
    answer: "You type in what you roughly want to achieve, select the model you are using (like ChatGPT or Midjourney), pick an output format, and choose a role for the AI. We then construct a professional, multi-paragraph prompt incorporating the best prompt-engineering practices."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes! If you select the 'SEO' task type, the tool will generate prompts that specifically command the AI to include keywords naturally, use correct heading structures, and follow Google's content guidelines."
  },
  {
    question: "Does it store my data?",
    answer: "No, your basic tasks and concepts are not stored on our databases."
  },
  {
    question: "Why can't I just type my basic prompt into ChatGPT directly?",
    answer: "You can, but LLMs often produce generic, repetitive, or poorly formatted outputs when given basic generic instructions. Engineering the prompt with specific boundary conditions, persona assignment, and formatting constraints forces the AI to produce unique, expert-level work on the very first try."
  }
];

const contentSections = [
  {
    title: "What is an AI Prompt Generator?",
    content: <p>Think of prompt engineering like communicating with a super-smart intern. If you give a vague instruction, you get a vague, uninspired result. An AI Prompt Generator acts as a translator between your basic idea and the specific structural commands that Language Models need to perform at their absolute highest capacity.</p>
  },
  {
    title: "How to write better AI prompts",
    content: (
      <ul>
        <li><strong>Assign a Role:</strong> Always start by telling the AI who it is. ("Act as a senior DevOps engineer...", "Act as a direct-response copywriter...").</li>
        <li><strong>Provide Context:</strong> Explain *why* you are asking for this. ("I am launching a new SaaS product aimed at lawyers, and I need...")</li>
        <li><strong>Set Constraints:</strong> Specify length limits, what words to avoid, or formats to adhere to.</li>
        <li><strong>Give Examples (Few-Shot Prompting):</strong> Providing the AI with one or two examples of a "good" output drastically improves the results.</li>
      </ul>
    )
  },
  {
    title: "Prompt examples by category",
    content: (
      <ul>
        <li><strong>Content Writing:</strong> Never just say "Write an article." Say: "Act as an expert SEO writer. Write a 1,500-word article on [topic]. Use a conversational tone. Avoid robotic words like 'delve' or 'testament'. Format with H2s and bullet points."</li>
        <li><strong>Coding:</strong> "Act as a Senior React Engineer. Refactor this component to use modern hooks and Tailwind CSS. Provide a brief explanation of the performance improvements."</li>
        <li><strong>Image Generation:</strong> "A photorealistic portrait of a cyberpunk hacker in neon lighting, 85mm lens, f/1.8, cinematic lighting, ultra-detailed --ar 16:9"</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "AI Tool Finder", slug: "ai-tool-finder" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" }
];

export default function PromptGeneratorPage() {
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
        <PromptGeneratorClient />
      </ToolLayout>
    </>
  );
}
