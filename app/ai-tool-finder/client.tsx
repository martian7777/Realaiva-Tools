"use client";

import { useState, useMemo } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, ExternalLink, Star } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface Recommendation {
  name: string;
  bestFor: string;
  pricing: string;
  pros: string[];
  cons: string[];
  rating: number;
  category: string;
  isFree: boolean;
  affiliateUrl?: string;
  reviewUrl?: string;
}

interface FinderResult {
  recommendations: Recommendation[];
  stackSummary?: string;
}

type Mode = "browse" | "quiz";

export default function AIToolFinderClient() {
  const [mode, setMode] = useState<Mode>("browse");

  // Browse mode
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("writing");
  const [budget, setBudget] = useState("freemium");
  const [skill, setSkill] = useState("beginner");
  const [useCase, setUseCase] = useState("marketer");

  // Quiz mode
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FinderResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter / sort
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "category">("rating");

  // Compare
  const [compareSelection, setCompareSelection] = useState<Set<string>>(new Set());

  const callAI = async (prompt: string) => {
    setError(null);
    setLoading(true);
    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const parsed = tryParseJSON<FinderResult>(res.text);
    if (!parsed || !Array.isArray(parsed.recommendations)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setCompareSelection(new Set());
    setLoading(false);
  };

  const handleBrowseGenerate = () => {
    if (!goal) {
      setError("Please describe what you are trying to achieve");
      return;
    }
    callAI(`Act as an expert AI Software Consultant.
Recommend 3 to 5 AI tools matching the user's criteria.

User Goal: ${goal}
Category: ${category}
Budget: ${budget}
Skill Level: ${skill}
Persona: ${useCase}

For each tool include: name, what it is best for, pricing model summary, 3 pros, 2 cons, an honest 1-5 rating, primary category, whether it has a usable free tier (isFree), optional affiliate signup URL and optional Realaiva review URL.

Then provide a one-paragraph "stackSummary" explaining how to combine the tools to reach the goal.

Respond with valid JSON only:
{
  "recommendations": [
    {
      "name": "string",
      "bestFor": "string",
      "pricing": "string",
      "pros": ["string"],
      "cons": ["string"],
      "rating": 4.5,
      "category": "string",
      "isFree": true,
      "affiliateUrl": "https://...",
      "reviewUrl": "https://realaiva.com/..."
    }
  ],
  "stackSummary": "string"
}`);
  };

  const handleQuizSubmit = () => {
    if (!q1 || !q2 || !q3) {
      setError("Please answer all three quiz questions");
      return;
    }
    callAI(`Act as an expert AI Software Consultant running a quiz-driven recommendation flow.
The user answered:
1. Main task they want help with: ${q1}
2. Skill level and budget: ${q2}
3. Their work or creative context: ${q3}

Recommend an "AI stack" of 3-5 tools that work well together for these answers. For each tool include: name, bestFor, pricing, pros[3], cons[2], rating (1-5), category, isFree, optional affiliateUrl and reviewUrl. Provide a stackSummary describing the workflow.

Respond with valid JSON only matching:
{
  "recommendations": [ { "name": "string", "bestFor": "string", "pricing": "string", "pros": ["string"], "cons": ["string"], "rating": 4.5, "category": "string", "isFree": true, "affiliateUrl": "string", "reviewUrl": "string" } ],
  "stackSummary": "string"
}`);
  };

  const filteredSorted = useMemo(() => {
    if (!result) return [];
    let list = [...result.recommendations];
    if (freeOnly) list = list.filter((r) => r.isFree);
    list.sort((a, b) =>
      sortBy === "rating" ? (b.rating || 0) - (a.rating || 0) : a.category.localeCompare(b.category)
    );
    return list;
  }, [result, freeOnly, sortBy]);

  const compared = useMemo(
    () => filteredSorted.filter((r) => compareSelection.has(r.name)),
    [filteredSorted, compareSelection]
  );

  const toggleCompare = (name: string) => {
    setCompareSelection((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const allText = result
    ? [
        result.stackSummary ? `Stack: ${result.stackSummary}` : "",
        ...result.recommendations.map(
          (r) => `${r.name} — ${r.bestFor} — ${r.pricing} — Rating ${r.rating}/5`
        ),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-[#D9D1C7]">
        <button
          onClick={() => setMode("browse")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === "browse" ? "border-[#5A5A40] text-[#2C2C24]" : "border-transparent text-[#8A857C] hover:text-[#5A5A40]"
          }`}
        >
          Browse by Criteria
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === "quiz" ? "border-[#5A5A40] text-[#2C2C24]" : "border-transparent text-[#8A857C] hover:text-[#5A5A40]"
          }`}
        >
          Find My AI Stack Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {mode === "browse" ? (
            <>
              <div>
                <label htmlFor="goal" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">What are you trying to achieve? *</label>
                <textarea id="goal" rows={3} className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. I need to write 10 blog posts a week and optimize them for SEO" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Category</label>
                  <select id="category" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="writing">Writing &amp; Copy</option>
                    <option value="seo">SEO</option>
                    <option value="video">Video &amp; Animation</option>
                    <option value="productivity">Productivity</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Budget</label>
                  <select id="budget" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="free">100% Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="paid">Paid (Best Quality)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="skill" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Skill Level</label>
                  <select id="skill" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={skill} onChange={(e) => setSkill(e.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="useCase" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">I am a...</label>
                  <select id="useCase" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={useCase} onChange={(e) => setUseCase(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="marketer">Marketer</option>
                    <option value="business">Business Owner</option>
                    <option value="creator">Creator/Freelancer</option>
                  </select>
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                onClick={handleBrowseGenerate}
                disabled={loading}
                className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
              >
                {loading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing tools...</>) : "Find Tools"}
              </button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="q1" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">1. What is the single most important task you want AI to help with?</label>
                <input id="q1" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. Writing weekly SEO blog posts" value={q1} onChange={(e) => setQ1(e.target.value)} />
              </div>
              <div>
                <label htmlFor="q2" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">2. Your skill level and budget</label>
                <input id="q2" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. Beginner, free tools preferred" value={q2} onChange={(e) => setQ2(e.target.value)} />
              </div>
              <div>
                <label htmlFor="q3" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">3. What kind of work or audience is this for?</label>
                <input id="q3" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. Affiliate marketing blog for students" value={q3} onChange={(e) => setQ3(e.target.value)} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                onClick={handleQuizSubmit}
                disabled={loading}
                className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
              >
                {loading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Building your stack...</>) : "Get My AI Stack"}
              </button>
            </>
          )}
        </div>

        <div className="bg-[#F1F0EA] rounded-3xl max-h-[800px] overflow-y-auto border border-dashed border-[#D9D1C7]">
          <div className="p-6 border-b border-[#D9D1C7] sticky top-0 bg-[#F1F0EA]/90 backdrop-blur space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#2C2C24]">Your Custom AI Stack</h3>
              <div className="flex gap-2">
                <CopyButton text={allText} />
                <button
                  onClick={mode === "browse" ? handleBrowseGenerate : handleQuizSubmit}
                  disabled={loading || (mode === "browse" ? !goal : !q1)}
                  className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
                </button>
              </div>
            </div>
            {result && (
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
                  Free tier only
                </label>
                <label className="inline-flex items-center gap-1">
                  Sort:
                  <select className="border border-[#D9D1C7] rounded px-1 py-0.5 bg-white" value={sortBy} onChange={(e) => setSortBy(e.target.value as "rating" | "category")}>
                    <option value="rating">Rating</option>
                    <option value="category">Category</option>
                  </select>
                </label>
              </div>
            )}
          </div>
          <div className="p-6 space-y-4">
            {!result && (
              <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
                <span className="mb-2 text-4xl">🤖</span>
                <p className="text-center">Your custom AI tool recommendations<br />will appear here</p>
              </div>
            )}
            {result?.stackSummary && (
              <div className="bg-white border border-[#D9D1C7] rounded-2xl p-4 text-sm text-[#3A3A32]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-2">Recommended Workflow</h4>
                {result.stackSummary}
              </div>
            )}
            {filteredSorted.map((r) => {
              const isSelected = compareSelection.has(r.name);
              return (
                <div key={r.name} className="bg-white border border-[#D9D1C7] rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-[#2C2C24]">{r.name}</h4>
                      <p className="text-xs text-[#7A756C]">{r.category} · {r.pricing}</p>
                    </div>
                    <label className="inline-flex items-center text-xs gap-1 text-[#5A5A40] cursor-pointer">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleCompare(r.name)} />
                      Compare
                    </label>
                  </div>
                  <p className="text-sm text-[#3A3A32]"><strong>Best for:</strong> {r.bestFor}</p>
                  <div className="inline-flex items-center text-amber-600 text-xs">
                    <Star className="w-3 h-3 mr-1 fill-current" /> {r.rating?.toFixed(1) ?? "—"} / 5
                  </div>
                  {r.pros?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-green-700">Pros</p>
                      <ul className="text-xs text-[#3A3A32] list-disc pl-5">
                        {r.pros.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                  {r.cons?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-700">Cons</p>
                      <ul className="text-xs text-[#3A3A32] list-disc pl-5">
                        {r.cons.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {r.affiliateUrl && (
                      <a href={r.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[#5A5A40] text-white hover:bg-[#4A4A34]">
                        Visit tool <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                    {r.reviewUrl && (
                      <a href={r.reviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-white border border-[#D9D1C7] text-[#5A5A40] hover:bg-[#F1F0EA]">
                        Read Realaiva review <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {compared.length >= 2 && (
              <div className="bg-white border border-[#5A5A40] rounded-2xl p-4">
                <h4 className="font-bold text-[#2C2C24] mb-3">Side-by-side Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="text-left text-[#8A857C]">
                        <th className="pr-3 pb-2">Tool</th>
                        <th className="pr-3 pb-2">Best for</th>
                        <th className="pr-3 pb-2">Pricing</th>
                        <th className="pr-3 pb-2">Rating</th>
                        <th className="pb-2">Free?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compared.map((r) => (
                        <tr key={r.name} className="border-t border-[#D9D1C7]">
                          <td className="py-2 pr-3 font-semibold">{r.name}</td>
                          <td className="py-2 pr-3">{r.bestFor}</td>
                          <td className="py-2 pr-3">{r.pricing}</td>
                          <td className="py-2 pr-3">{r.rating?.toFixed(1) ?? "—"}</td>
                          <td className="py-2">{r.isFree ? "Yes" : "No"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
