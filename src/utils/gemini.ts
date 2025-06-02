import { GoogleGenAI } from "@google/genai";

export async function generateResponse(
  messages: { role: string; content: string }[],
  geminiApiKey: string,
  contextDocs: string = ""
): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // Tambahkan context ke awacl percakapan
    const fullMessages = contextDocs
      ? [
          {
            role: "user",
            content: `Berikut adalah informasi produk yang relevan:\n${contextDocs}`,
          },
          ...messages,
        ]
      : messages;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        maxOutputTokens: 8192,
        temperature: 0.2,
        systemInstruction: `Kamu adalah assisten kampus Universitas Nahdlatul Ulama Jepara(Unisnu). tugas kamu adalah menjawab semua pertanyaan terkait unisnu`,
      },

      contents: fullMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Mohon maaf kak. boleh kirim ulang pesannya?";
  }
}
