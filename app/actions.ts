'use server';

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContent(prompt: string, model: string = "gemini-2.5-flash") {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return { text: response.text, error: null };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { text: null, error: error.message || "Failed to generate content." };
  }
}

export async function fetchUrlText(url: string): Promise<{ text: string | null; error: string | null }> {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { text: null, error: "Only http(s) URLs are supported." };
    }
    const res = await fetch(parsed.toString(), {
      headers: { "User-Agent": "RealaivaTools/1.0 (+https://tools.realaiva.com)" },
      redirect: "follow",
    });
    if (!res.ok) {
      return { text: null, error: `Fetch failed with status ${res.status}` };
    }
    const html = await res.text();
    const stripped = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
    return { text: stripped, error: null };
  } catch (error: any) {
    console.error("fetchUrlText error:", error);
    return { text: null, error: error.message || "Failed to fetch URL." };
  }
}
