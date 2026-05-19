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
