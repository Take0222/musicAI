
import { GoogleGenAI, Type } from "@google/genai";
import type { Recommendation } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      description: "おすすめの曲5曲のリスト。",
      items: {
        type: Type.OBJECT,
        properties: {
          songTitle: {
            type: Type.STRING,
            description: "おすすめの曲名。",
          },
          artist: {
            type: Type.STRING,
            description: "おすすめの曲のアーティスト名。",
          },
          album: {
            type: Type.STRING,
            description: "その曲が収録されているアルバム名。",
          },
          reason: {
            type: Type.STRING,
            description: "なぜこの曲がユーザーのリクエストに合っているのか、簡潔で説得力のある理由。"
          },
        },
        required: ["songTitle", "artist", "album", "reason"],
      },
    },
  },
  required: ["recommendations"],
};

export const getMusicRecommendations = async (mood: string, weather: string, taste: string): Promise<Recommendation[]> => {
  const prompt = `
    以下の条件に基づいて、5曲おすすめの音楽を提案してください:
    - 現在の気分: ${mood}
    - 現在の天気や場所: ${weather}
    - ユーザーの音楽の好み: "${taste || 'ユーザーは具体的な好みを入力しませんでした。気分と天気を主な判断材料としてください。'}"

    各曲について、曲名、アーティスト、アルバム、そして推薦理由を簡潔に教えてください。
    ユーザーが描写した瞬間にぴったり合う、一貫性のあるプレイリストを作成することに集中してください。
    言語は日本語で回答してください。
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.8,
      },
    });
    
    const jsonString = response.text.trim();
    if (!jsonString) {
      throw new Error("APIから空のレスポンスが返されました。");
    }

    const parsedResponse = JSON.parse(jsonString);
    
    if (parsedResponse && parsedResponse.recommendations) {
        return parsedResponse.recommendations;
    } else {
        throw new Error("APIレスポンスのデータ構造が無効です。");
    }

  } catch (error) {
    console.error("Gemini APIからの推薦情報の取得中にエラー発生:", error);
    throw new Error("音楽のおすすめを取得できませんでした。後ほどもう一度お試しください。");
  }
};
