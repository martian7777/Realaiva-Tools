"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function YoutubeTitleGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [videoType, setVideoType] = useState("tutorial");
  const [audience, setAudience] = useState("beginners");
  const [emotion, setEmotion] = useState("curiosity");
  const [clickbait, setClickbait] = useState("balanced");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please briefly describe the video topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert YouTube Strategist.
Task: Generate 10 YouTube video title variations and pair each with bold Thumbnail Text.
Video Topic: ${topic}
Main SEO Keyword: ${keyword || "None"}
Video Format/Type: ${videoType}
Target Audience: ${audience}
Emotional Angle: ${emotion}
Clickbait Level: ${clickbait} (Safe = very factual; Balanced = engaging but honest; Aggressive = extreme curiosity and hype, within YouTube limits)

Requirements:
1. Ensure the titles are incredibly clickable and optimize for YouTube's search algorithm (keep below 60 chars where the important stuff is).
2. For each title, suggest punchy, 2-to-4 word "Thumbnail Text" that complements the title without just repeating it.
3. Check the title length and add the character count.
4. Output strictly using Markdown in a numbered list format. For example:
   1. **Title:** [The Title Here] (50 chars)
      **Thumbnail Text:** [Short Text]`;

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
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Video Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. How to edit videos in Premiere Pro"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Main SEO Keyword</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. premiere pro tutorial"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="videoType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Video Type</label>
            <select
              id="videoType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
            >
              <option value="tutorial">Tutorial</option>
              <option value="review">Review</option>
              <option value="comparison">Comparison (+)</option>
              <option value="reaction">Reaction</option>
              <option value="educational">Educational</option>
            </select>
          </div>
          <div>
            <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Audience</label>
            <select
              id="audience"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="beginners">Beginners</option>
              <option value="students">Students</option>
              <option value="creators">Creators</option>
              <option value="business owners">Business Owners</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="emotion" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Emotion Angle</label>
            <select
              id="emotion"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            >
              <option value="curiosity">Curiosity</option>
              <option value="urgency">Urgency</option>
              <option value="benefit">Benefit / Help</option>
              <option value="controversy">Controversy</option>
            </select>
          </div>
          <div>
            <label htmlFor="clickbait" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Clickbait Level</label>
            <select
              id="clickbait"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={clickbait}
              onChange={(e) => setClickbait(e.target.value)}
            >
              <option value="safe">Safe (Factual)</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
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
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Titles...</>
          ) : (
             "Generate YouTube Titles"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Title & Thumbnail Combos</h3>
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
               <span className="mb-2 text-4xl">📺</span>
               <p className="text-center">Titles and Thumbnail texts<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
