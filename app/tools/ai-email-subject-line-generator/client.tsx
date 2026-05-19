"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function EmailSubjectGeneratorClient() {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("curiosity");
  const [length, setLength] = useState("medium");
  const [useEmoji, setUseEmoji] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!purpose) {
      setError("Please briefly describe the email's purpose");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Email Marketing Copywriter.
Task: Generate 10 email subject lines for A/B testing.
Email Purpose: ${purpose}
Target Audience: ${audience || "general subscribers"}
Tone: ${tone}
Length Preference: ${length} (short = 3-5 words, medium = 6-8 words, long = 9+ words)
Use Emojis: ${useEmoji ? "Yes, include appropriate emojis" : "No"}

Requirements:
1. Provide 10 distinct subject variations to A/B test.
2. Under each subject line, add a brief "Spam Risk Check" explaining if it might trigger spam filters (flagging words like 'Free', 'Urgent', 'Guarantee', '100%').
3. Suggest the optimal "preview text / preheader" to pair with each subject line.
4. Output cleanly in Markdown formatting.`;

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
          <label htmlFor="purpose" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Email Purpose / Topic *</label>
          <textarea
            id="purpose"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Announcing our new 50% off summer sale on shoes"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Audience</label>
          <input
            id="audience"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. B2B clients, students, newsletter subscribers"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
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
              <option value="curiosity">Curiosity</option>
              <option value="urgent">Urgent</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div>
            <label htmlFor="length" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Length</label>
            <select
              id="length"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="short">Short (3-5 words)</option>
              <option value="medium">Medium (6-8 words)</option>
              <option value="long">Long (9+ words)</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="useEmoji"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={useEmoji}
            onChange={(e) => setUseEmoji(e.target.checked)}
          />
          <label htmlFor="useEmoji" className="ml-2 block text-sm text-gray-700">
            Include Emojis
          </label>
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
             "Generate Subject Lines"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Spam-Checked Subject Lines</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !purpose}
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
               <span className="mb-2 text-4xl">📧</span>
               <p className="text-center">Your high-converting subject lines <br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
