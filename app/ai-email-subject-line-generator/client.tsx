"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, Star, AlertTriangle } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface Subject {
  subject: string;
  preheader?: string;
  spamRisk: "low" | "medium" | "high";
  spamFlags?: string[];
  openRateTip?: string;
}

interface EmailResult {
  subjects: Subject[];
}

export default function EmailSubjectGeneratorClient() {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("curiosity");
  const [length, setLength] = useState("medium");
  const [useEmoji, setUseEmoji] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    if (!purpose) {
      setError("Please briefly describe the email's purpose");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Email Marketing Copywriter.
Generate 10 distinct email subject lines for A/B testing.

Email Purpose: ${purpose}
Target Audience: ${audience || "general subscribers"}
Tone: ${tone}
Length Preference: ${length} (short = 3-5 words, medium = 6-8 words, long = 9+ words)
Use Emojis: ${useEmoji ? "Yes, include appropriate emojis" : "No emojis"}

For each subject:
- Provide an optimal preheader / preview text to pair.
- Rate spam risk as "low", "medium" or "high" based on words like Free, Urgent, Guarantee, 100%, !!!.
- List the specific spam-flag words found (or empty array).
- Add a one-sentence "open-rate tip" explaining why this subject is likely to perform well.

Respond with valid JSON only (no markdown, no commentary):
{
  "subjects": [
    {
      "subject": "string",
      "preheader": "string",
      "spamRisk": "low|medium|high",
      "spamFlags": ["string"],
      "openRateTip": "string"
    }
  ]
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const parsed = tryParseJSON<EmailResult>(res.text);
    if (!parsed || !Array.isArray(parsed.subjects)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setLoading(false);
  };

  const toggleFavorite = (subject: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  };

  const favoritesText = Array.from(favorites).join("\n");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <select id="tone" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="curiosity">Curiosity</option>
              <option value="urgent">Urgent</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div>
            <label htmlFor="length" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Length</label>
            <select id="length" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={length} onChange={(e) => setLength(e.target.value)}>
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

        {favorites.size > 0 && (
          <div className="bg-white border border-[#D9D1C7] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-sm text-[#2C2C24] inline-flex items-center">
                <Star className="w-4 h-4 mr-1 text-amber-500" /> Favorites ({favorites.size})
              </h4>
              <CopyButton text={favoritesText} />
            </div>
            <ul className="text-sm text-[#3A3A32] space-y-1 list-disc pl-5">
              {Array.from(favorites).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-[#F1F0EA] rounded-3xl max-h-[700px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
          <h3 className="font-bold text-[#2C2C24]">Spam-Checked Subject Lines</h3>
          <div className="flex gap-2">
            <CopyButton text={result?.subjects.map((s) => s.subject).join("\n") || ""} />
            <button
              onClick={handleGenerate}
              disabled={loading || !purpose}
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
              <span className="mb-2 text-4xl">📧</span>
              <p className="text-center">Your high-converting subject lines<br />will appear here</p>
            </div>
          )}
          {result?.subjects.map((s, idx) => {
            const isFav = favorites.has(s.subject);
            const riskTone =
              s.spamRisk === "high"
                ? "bg-red-100 text-red-700 border-red-200"
                : s.spamRisk === "medium"
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-green-100 text-green-700 border-green-200";
            return (
              <div key={idx} className="bg-white border border-[#D9D1C7] rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-[#2C2C24]">{s.subject}</p>
                  <button
                    onClick={() => toggleFavorite(s.subject)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isFav ? "bg-amber-50 border-amber-200 text-amber-600" : "border-[#D9D1C7] text-[#8A857C] hover:bg-[#F1F0EA]"
                    }`}
                    title={isFav ? "Remove from favorites" : "Save to favorites"}
                  >
                    <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>
                {s.preheader && (
                  <p className="text-xs text-[#7A756C]">
                    <strong>Preheader:</strong> {s.preheader}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full border inline-flex items-center ${riskTone}`}>
                    {s.spamRisk !== "low" && <AlertTriangle className="w-3 h-3 mr-1" />}
                    Spam risk: {s.spamRisk}
                  </span>
                  {s.spamFlags && s.spamFlags.length > 0 && (
                    <span className="px-2 py-1 rounded-full border border-red-200 bg-red-50 text-red-700">
                      Flags: {s.spamFlags.join(", ")}
                    </span>
                  )}
                </div>
                {s.openRateTip && (
                  <p className="text-xs text-[#5A5A40] bg-[#F1F0EA] rounded-lg p-2">
                    💡 {s.openRateTip}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
