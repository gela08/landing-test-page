
import { GoogleGenAI, Type } from "@google/genai";
import { LandingPageContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLandingPageContent(prompt: string): Promise<LandingPageContent> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate high-converting landing page content for a product/service described as: "${prompt}". 
    The tone should be professional yet engaging. 
    Choose a modern accent color (Tailwind color name like 'indigo-500' or 'emerald-400').
    For icons, only use: Zap, Shield, BarChart, Cpu, Globe, Users.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          ctaText: { type: Type.STRING },
          accentColor: { type: Type.STRING },
          features: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                iconName: { type: Type.STRING }
              },
              required: ["title", "description", "iconName"]
            }
          },
          testimonial: {
            type: Type.OBJECT,
            properties: {
              quote: { type: Type.STRING },
              author: { type: Type.STRING },
              role: { type: Type.STRING }
            },
            required: ["quote", "author", "role"]
          }
        },
        required: ["headline", "subheadline", "ctaText", "accentColor", "features", "testimonial"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text.trim());
}

export async function generateHeroImage(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `A professional, clean, high-resolution 3D render or high-quality stock photo hero image for a modern website. 
          The image represents: ${prompt}. 
          Minimalist, high-end design, aesthetically pleasing composition, soft lighting. No text in the image.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image");
}
