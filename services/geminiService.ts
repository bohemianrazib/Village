import { GoogleGenAI } from "@google/genai";
import { SloganTone, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSlogan = async (
  productName: string, 
  tone: SloganTone, 
  language: Language, 
  customTopic?: string
): Promise<string[]> => {
  try {
    const langName = language === 'bn' ? 'Bengali' : 'English';
    const prompt = `
      You are a creative copywriter for a village souvenir shop named "Khalishakundi". 
      Generate 3 distinct, short, and catchy slogans (maximum 6-8 words) in ${langName} for a ${productName}.
      
      Tone: ${tone}
      ${customTopic ? `Specific Topic/Theme: ${customTopic}` : ''}
      
      Output Format: Return only the 3 slogans separated by a pipe character (|). Do not add numbering or extra text.
      Example Output: Village love|Roots calling|Green peace
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    const text = response.text || "";
    return text.split('|').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    console.error("Error generating slogan:", error);
    if (language === 'bn') {
      return ["আমার গ্রাম, আমার অহংকার", "মাটির টানে ফিরি বারে বার", "সবুজ শ্যামল খলিসাকুন্ডি"];
    } else {
      return ["My Village, My Pride", "Return to Roots", "Green Khalishakundi"];
    }
  }
};