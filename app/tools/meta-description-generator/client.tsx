"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function MetaDescriptionGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageType, setPageType] = useState("blog");
  const [tone, setTone] = useState("persuasive");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [previewTitle, setPreviewTitle] = useState("Your SEO Title Goes Here - BrandName");
  const [previewSnippet, setPreviewSnippet] = useState("This is where your generated meta description will appear in the SERP preview. It provides a brief summary of a web page.");

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a page topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Technical SEO Specialist.
Task: Generate exactly 3 meta description variations.
Topic: ${topic}
Target Keyword: ${keyword}
Page Type: ${pageType}
Tone: ${tone}

Requirements:
1. Include the target keyword naturally.
2. The length MUST be strictly between 150 and 160 characters.
3. Include a clear call-to-action (CTA).
4. Output them in a clean numbered list format. Include the exact character count next to each variation (e.g., [155 chars]).
5. Finally, provide a "Suggested SEO Title" to pair with these snippets.

Format the output strictly using Markdown.`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.text || null);
      // Attempt to extract the first meta description for the preview
      const match = res.text?.match(/1\.\s(.*?)\s\[/);
      if (match && match[1]) {
        setPreviewSnippet(match[1]);
      }
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Page/Article Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Best AI tools for students"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Focus Keyword</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. ai tools for students"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pageType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Page Type</label>
            <select
              id="pageType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
            >
              <option value="blog">Blog</option>
              <option value="product">Product</option>
              <option value="tool">Tool</option>
              <option value="service">Service</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select
              id="tone"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="persuasive">Persuasive</option>
              <option value="professional">Professional</option>
              <option value="informational">Informational</option>
            </select>
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
          <strong>Note:</strong> Google may rewrite meta descriptions depending on the user's search query. A good meta description increases CTR but is not guaranteed to be displayed.
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
        >
          {loading ? (
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
          ) : (
             "Generate Descriptions"
          )}
        </button>
      </div>

      {/* Results & SERP Preview */}
      <div className="flex flex-col gap-6">
        {/* SERP PREVIEW */}
        <div className="border border-[#D9D1C7] rounded-3xl bg-white p-6 shadow-sm">
           <h3 className="text-sm font-bold text-[#2C2C24] mb-4 tracking-wide uppercase">Live SERP Preview</h3>
           <div className="font-sans max-w-[600px]">
             {/* SERP URL */}
             <div className="flex space-x-2 items-center mb-1 text-sm text-[#4d5156]">
               <span className="bg-gray-200 w-6 h-6 rounded-full inline-block"></span>
               <span>realaiva.com › {pageType}s › {topic.toLowerCase().replace(/\\s+/g, '-')}</span>
             </div>
             {/* SERP TITLE */}
             <div className="text-[20px] text-[#1a0dab] mb-1 leading-tight hover:underline cursor-pointer">
               {previewTitle}
             </div>
             {/* SERP SNIPPET */}
             <div className="text-[14px] text-[#4d5156] leading-snug">
               {previewSnippet}
             </div>
           </div>
        </div>

        {/* Generated Content */}
        <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7] flex-grow">
          <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
             <h3 className="font-bold text-[#2C2C24]">Generated Variations</h3>
             <div className="flex gap-2">
               <CopyButton text={result || ""} />
               <button
                 onClick={handleGenerate}
                 disabled={loading || !topic}
                 className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
               >
                 <RefreshCw className="w-4 h-4 mr-2" />
                 Regenerate
               </button>
             </div>
          </div>
          <div className="p-6">
            {result ? (
               <div className="prose prose-sm prose-blue max-w-none">
                 <Markdown>{result}</Markdown>
               </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-10">
                 <span className="mb-2 text-3xl">🗂️</span>
                 <p className="text-center">Descriptions will appear here</p>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
