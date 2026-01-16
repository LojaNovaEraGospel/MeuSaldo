
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Category } from "../types";

// Always use named parameters and obtain API key from environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialInsights(transactions: Transaction[]) {
  const transactionSummary = transactions.map(t => `${t.date}: ${t.description} - R$ ${t.amount} (${t.category})`).join('\n');
  
  const prompt = `Analise as seguintes transações financeiras e forneça 3 dicas práticas de economia e um breve resumo do comportamento de gastos. Seja encorajador e profissional.
  
  Transações:
  ${transactionSummary}`;

  try {
    // Directly call generateContent with model and configuration
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Recommended method to define output schema using Type
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Brief summary of the spending behavior."
            },
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "Array of practical saving tips."
            }
          },
          required: ["summary", "tips"]
        }
      }
    });

    // Access text property directly (it is a property, not a method)
    const text = response.text;
    const result = JSON.parse(text || '{"summary": "Não foi possível analisar no momento.", "tips": []}');
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "Erro ao conectar com o analista IA. Tente novamente mais tarde.",
      tips: ["Mantenha seu registro atualizado", "Evite compras por impulso", "Revise suas assinaturas"]
    };
  }
}

export async function getEducationTip(topic: string) {
  const prompt = `Explique de forma simples e didática para um leigo o conceito financeiro de: ${topic}. Máximo 150 palavras. Inclua um exemplo prático.`;
  
  try {
    // Generate content using the recommended pattern
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Extract text from response property directly
    return response.text;
  } catch (error) {
    return "Educação financeira é a base da prosperidade. Pesquise sobre esse tema para melhorar seu futuro!";
  }
}
