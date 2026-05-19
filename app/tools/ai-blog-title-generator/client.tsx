"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function BlogTitleGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("catchy");
  const [titleType, setTitleType] = useState("how-to");
  const [audience, setAudience] = useState("bloggers");
  const [count, setCount] = useState("10");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert SEO copywriter.
Task: Generate ${count} blog titles.
Topic: ${topic}
Target Keyword: ${keyword}
Tone: ${tone}
Title Type: ${titleType}
Target Audience: ${audience}

Requirements:
1. Include the target keyword near the beginning if possible.
2. The titles should be highly clickable and optimized for search intent.
3. First, identify the "Best Pick" title and explain WHY it's the best (focus on SEO score, character count, and clickability).
4. Then, list the remaining titles.
5. Provide the output in clean Markdown format.`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.text || null);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. AI tools for students"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Keyword (Optional)</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. best ai tools"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select
              id="tone"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="catchy">Catchy</option>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="listicle">Listicle</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label htmlFor="titleType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Title Type</label>
            <select
              id="titleType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={titleType}
              onChange={(e) => setTitleType(e.target.value)}
            >
              <option value="how-to">How-to</option>
              <option value="list post">List Post</option>
              <option value="comparison">Comparison</option>
              <option value="review">Review</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Audience</label>
            <select
              id="audience"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="bloggers">Bloggers</option>
              <option value="students">Students</option>
              <option value="marketers">Marketers</option>
              <option value="businesses">Businesses</option>
            </select>
          </div>
          <div>
            <label htmlFor="count" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Number of Titles</label>
            <select
              id="count"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
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
             "Generate Titles"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Generated Results</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !topic}
               className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
               title="Regenerate"
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
             <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
               <span className="mb-2 text-4xl">✨</span>
               <p>Your AI-generated titles will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
