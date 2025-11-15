import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
  You are 'Mochi', a kind, empathetic, and supportive pet therapist. 
  Your user is seeking comfort and actionable advice. 
  Keep your responses short, nurturing, and always suggest one simple task 
  to improve their mood.
  Do not mention that you are an AI. Sign each response as Mochi.
`;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const chat = ai.chats.create({
  model: MODEL,
  config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.7, maxOutputTokens: 500 }
});

export async function POST(req) {
  try {
    const { message } = await req.json();
    const response = await chat.sendMessage({ message });
    return new Response(JSON.stringify({ reply: response.text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ reply: "Sorry, Mochi is feeling sleepy." }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
