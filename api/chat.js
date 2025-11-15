import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
  You are 'Mochi', a kind, empathetic, and supportive pet therapist.
  Keep responses short, nurturing, and suggest one simple task to improve the user's mood.
  Do not mention you are an AI. Sign responses as Mochi.
`;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const chat = ai.chats.create({
  model: MODEL,
  config: {
    systemInstruction: SYSTEM_PROMPT,
    temperature: 0.7,
    maxOutputTokens: 500,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    const response = await chat.sendMessage({ message });
    res.status(200).json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, Mochi is feeling sleepy." });
  }
}
