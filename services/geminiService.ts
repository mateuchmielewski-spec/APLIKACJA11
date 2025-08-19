import { GoogleGenAI, Type } from "@google/genai";
import type { PlantData } from '../types';

// Poprawiony sposób pobierania klucza API dla Vite
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set or invalid.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const plantSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "Polska nazwa zidentyfikowanej rośliny.",
    },
    edibleProperties: {
      type: Type.STRING,
      description: "Opis właściwości jadalnych rośliny. Jeśli niejadalna, napisz 'Roślina niejadalna' lub podaj powody.",
    },
    medicinalProperties: {
      type: Type.STRING,
      description: "Opis właściwości leczniczych rośliny. Jeśli brak, napisz 'Brak znanych właściwości leczniczych'.",
    },
    morphologicalDescription: {
      type: Type.STRING,
      description: "Szczegółowy opis cech morfologicznych rośliny (liście, łodyga, kwiaty, owoce).",
    },
  },
  required: ["name", "edibleProperties", "medicinalProperties", "morphologicalDescription"],
};

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const identifyPlant = async (base64Image: string, mimeType: string): Promise<PlantData> => {
  try {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const textPart = {
      text: `Jesteś ekspertem botanikiem. Zidentyfikuj roślinę na tym zdjęciu. Zwróć odpowiedź wyłącznie w formacie JSON, zgodnym z podanym schematem. Odpowiedz w języku polskim.`,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: plantSchema,
        }
    });

    const jsonString = response.text;
    
    // The user's error is "JSON.parse: unexpected end of data", which means jsonString is empty.
    // This can happen if the model's response is blocked or it fails to generate content.
    // We add a check to provide a more user-friendly error message.
    if (!jsonString || jsonString.trim() === '') {
      throw new Error("Model AI nie zwrócił odpowiedzi. Może to być spowodowane filtrowaniem treści lub problemem z rozpoznaniem obrazu. Spróbuj użyć wyraźniejszego zdjęcia.");
    }

    const plantData: PlantData = JSON.parse(jsonString);
    return plantData;

  } catch (error) {
    console.error("Error identifying plant:", error);
    if (error instanceof Error) {
        // Let's not wrap our custom, user-friendly error message in another generic message.
        if (error.message.includes("Model AI nie zwrócił odpowiedzi")) {
            throw error;
        }
        // Also catch malformed JSON errors and provide a cleaner message.
        if (error instanceof SyntaxError) {
            throw new Error("Otrzymano odpowiedź od AI w nieprawidłowym formacie.");
        }
        throw new Error(`Nie udało się zidentyfikować rośliny. Błąd API: ${error.message}`);
    }
    throw new Error("Wystąpił nieznany błąd podczas identyfikacji rośliny.");
  }
};