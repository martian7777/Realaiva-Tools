"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function PinterestGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [niche, setNiche] = useState("blogging");
  const [tone, setTone] = useState("catchy");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please input a topic for your Pin");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Pinterest Marketing Strategist.
Task: Generate a complete Pinterest Pin package (5 variations).
Topic: ${topic}
Main Keyword: ${keyword || "N/A"}
Niche: ${niche}
Tone: ${tone}

Requirements:
For each of the 5 variations, provide:
1. **Pin Title:** Highly clickable, optimized for Pinterest search (keep under 100 chars, but first 40 are most important).
2. **Pin Description:** Write a 2-3 sentence description incorporating keywords naturally, ending with a strong Call to Action (e.g., "Click here to read more").
3. **Canva Overlay Text:** Short, punchy text (2-5 words) to place directly ON the image.
4. **Hashtags:** Provide 3-5 hyper-relevant hashtags.

Format the output cleanly using Markdown.`;

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
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Blog/Product Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. 10 Ways to save money in college"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Main Keyword</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. college money saving tips"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="niche" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Niche/Category</label>
            <select
              id="niche"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            >
              <option value="blogging">Blogging / Online Biz</option>
              <option value="finance">Finance / Money</option>
              <option value="education">Education / AI</option>
              <option value="etsy">Etsy / Printables</option>
              <option value="lifestyle">Lifestyle / Home</option>
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
              <option value="catchy">Catchy / Viral</option>
              <option value="elegant">Elegant / Aesthetic</option>
              <option value="professional">Professional</option>
              <option value="informative">Informative</option>
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
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Pins...</>
          ) : (
             "Generate Pinterest Package"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Pinterest Title & Description Ideas</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !topic}
               className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
             >
               <RefreshCw className="w-4 h-4 mr-2" />
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
               <span className="mb-2 text-4xl">📌</span>
               <p className="text-center">Your complete Pinterest packages<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
