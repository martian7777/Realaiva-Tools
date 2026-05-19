"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function AIToolFinderClient() {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("writing");
  const [budget, setBudget] = useState("freemium");
  const [skill, setSkill] = useState("beginner");
  const [useCase, setUseCase] = useState("marketer");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!goal) {
      setError("Please describe what you are trying to achieve");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert AI Software Consultant.
Task: Recommend the best "AI Stack" based on the user's specific goal, category, and constraints.
User's Goal: ${goal}
Category: ${category}
Budget: ${budget}
Skill Level: ${skill}
Persona / Use Case: ${useCase}

Requirements:
1. Provide a tailored list of 3-5 specific AI tools that perfectly match these criteria.
2. Structure your output clearly using Markdown.
3. For each tool provide:
   - **Tool Name**
   - **Best For** (use case)
   - **Pricing Model**
   - **Pros & Cons**
4. At the end, provide a "My Recommendation AI Stack" summary explaining how to use these tools together to achieve the stated goal.
5. Do not include formatting that breaks markdown parsers (e.g., complex HTML). Use tables or bullet points.`;

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
          <label htmlFor="goal" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">What are you trying to achieve? *</label>
          <textarea
            id="goal"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. I need to write 10 blog posts a week and optimize them for SEO"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tool Category</label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="writing">Writing & Copy</option>
              <option value="seo">SEO</option>
              <option value="video">Video & Animation</option>
              <option value="productivity">Productivity</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Budget</label>
            <select
              id="budget"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="free">100% Free</option>
              <option value="freemium">Freemium</option>
              <option value="paid">Paid (Best Quality)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="skill" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Skill Level</label>
            <select
              id="skill"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label htmlFor="useCase" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">I am a...</label>
            <select
              id="useCase"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="marketer">Marketer</option>
              <option value="business">Business Owner</option>
              <option value="creator">Creator/Freelancer</option>
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
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing tools...</>
          ) : (
             "Find My AI Stack"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Your Custom AI Stack</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !goal}
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
               <span className="mb-2 text-4xl">🤖</span>
               <p className="text-center">Your custom AI tool recommendations<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
