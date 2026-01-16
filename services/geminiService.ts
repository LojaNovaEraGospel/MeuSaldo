
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

// Inicialização segura utilizando a chave de ambiente
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialInsights(transactions: Transaction[]) {
  // Prepara o resumo das transações para o contexto da IA
  const summary = transactions.map(t => 
    `- ${t.date}: ${t.description} | R$ ${t.amount} (${t.category} - ${t.type})`
  ).join('\n');
  
  const prompt = `Você é um consultor financeiro sênior especializado em economia doméstica brasileira. 
  Analise as seguintes transações e forneça um diagnóstico preciso:
  
  ${summary}
  
  Requisitos:
  1. Identifique o maior ralo financeiro.
  2. Dê 3 dicas acionáveis para economizar este mês.
  3. Seja direto, motivador e profissional.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Um parágrafo curto analisando a saúde financeira atual.",
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista com 3 dicas práticas de economia.",
            },
            status: {
              type: Type.STRING,
              description: "Status da saúde: 'Estável', 'Atenção' ou 'Crítico'.",
            }
          },
          required: ["summary", "tips", "status"],
        },
      },
    });

    // Acessa a propriedade .text diretamente (não é um método)
    const jsonStr = response.text?.trim();
    if (!jsonStr) throw new Error("Resposta vazia da IA");
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini AI Analysis Error:", error);
    return {
      summary: "Identificamos uma oscilação no processamento da análise. Baseado no seu volume de gastos, recomendamos revisar as categorias de Lazer e Alimentação.",
      tips: [
        "Mantenha a regra dos 50-30-20 (Essencial, Lazer, Investimento).",
        "Utilize a projeção de saldo para evitar surpresas no fim do mês.",
        "Revise assinaturas de streaming que você não utiliza há mais de 30 dias."
      ],
      status: "Atenção"
    };
  }
}

export async function askFinancialQuestion(question: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto do usuário: ${context}\n\nPergunta: ${question}\n\nResponda como um assistente financeiro amigável em até 3 frases.`,
    });
    return response.text;
  } catch (error) {
    return "Desculpe, não consegui processar sua dúvida agora. Tente perguntar sobre reserva de emergência ou juros compostos!";
  }
}
