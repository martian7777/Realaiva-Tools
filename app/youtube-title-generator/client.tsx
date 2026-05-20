"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, Check, AlertTriangle } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface YtTitle {
  title: string;
  thumbnailText: string;
}

interface YtResult {
  titles: YtTitle[];
}

export default function YoutubeTitleGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [videoType, setVideoType] = useState("tutorial");
  const [audience, setAudience] = useState("beginners");
  const [emotion, setEmotion] = useState("curiosity");
  const [clickbait, setClickbait] = useState("balanced");
  const [count, setCount] = useState("10");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<YtResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please briefly describe the video topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert YouTube Strategist.
Generate exactly ${count} YouTube video titles, each paired with bold 2-4 word thumbnail text.

Video Topic: ${topic}
Main SEO Keyword: ${keyword || "(none provided)"}
Video Format: ${videoType}
Target Audience: ${audience}
Emotional Angle: ${emotion}
Clickbait Level: ${clickbait} (safe = factual, balanced = engaging but honest, aggressive = high curiosity within YouTube limits)

Requirements:
- Keep critical text in the first 60 characters of the title.
- Thumbnail text must complement, not repeat, the title.

Respond with valid JSON only:
{
  "titles": [
    { "title": "string", "thumbnailText": "string" }
  ]
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const parsed = tryParseJSON<YtResult>(res.text);
    if (!parsed || !Array.isArray(parsed.titles)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setLoading(false);
  };

  const allText = result?.titles.map((t) => `${t.title} | Thumbnail: ${t.thumbnailText}`).join("\n") || "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Video Topic *</label>
          <input id="topic" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. How to edit videos in Premiere Pro" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Main SEO Keyword</label>
          <input id="keyword" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. premiere pro tutorial" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="videoType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Video Type</label>
            <select id="videoType" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={videoType} onChange={(e) => setVideoType(e.target.value)}>
              <option value="tutorial">Tutorial</option>
              <option value="review">Review</option>
              <option value="comparison">Comparison</option>
              <option value="reaction">Reaction</option>
              <option value="educational">Educational</option>
            </select>
          </div>
          <div>
            <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Audience</label>
            <select id="audience" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={audience} onChange={(e) => setAudience(e.target.value)}>
              <option value="beginners">Beginners</option>
              <option value="students">Students</option>
              <option value="creators">Creators</option>
              <option value="business owners">Business Owners</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="emotion" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Emotion</label>
            <select id="emotion" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
              <option value="curiosity">Curiosity</option>
              <option value="urgency">Urgency</option>
              <option value="benefit">Benefit</option>
              <option value="controversy">Controversy</option>
            </select>
          </div>
          <div>
            <label htmlFor="clickbait" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Clickbait</label>
            <select id="clickbait" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={clickbait} onChange={(e) => setClickbait(e.target.value)}>
              <option value="safe">Safe</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div>
            <label htmlFor="count" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Count</label>
            <select id="count" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={count} onChange={(e) => setCount(e.target.value)}>
              <option value="10">10</option>
              <option value="15">15</option>
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
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Titles...</>
          ) : (
            "Generate YouTube Titles"
          )}
        </button>
      </div>

      <div className="bg-[#F1F0EA] rounded-3xl max-h-[700px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
          <h3 className="font-bold text-[#2C2C24]">Title &amp; Thumbnail Combos</h3>
          <div className="flex gap-2">
            <CopyButton text={allText} />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {!result && (
            <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
              <span className="mb-2 text-4xl">📺</span>
              <p className="text-center">Titles and Thumbnail texts<br />will appear here</p>
            </div>
          )}
          {result?.titles.map((t, idx) => {
            const len = t.title.length;
            const lengthOk = len <= 60;
            return (
              <div key={idx} className="bg-white border border-[#D9D1C7] rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-[#2C2C24]">{t.title}</p>
                  <CopyButton text={t.title} />
                </div>
                <p className="text-xs text-[#7A756C]"><strong>Thumbnail:</strong> {t.thumbnailText}</p>
                <span
                  className={`inline-flex items-center text-xs px-2 py-1 rounded-full border ${
                    lengthOk
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {lengthOk ? <Check className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                  {len} chars {lengthOk ? "(good)" : "(may truncate)"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
