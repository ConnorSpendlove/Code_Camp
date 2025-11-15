// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai"; // New import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// --- GEMINI SETUP ---
// 1. Get the key from .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not set. Check your .env file!");
    process.exit(1); 
}

// 2. Initialize the client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash"; // Fast and capable model

// 3. Define the System Prompt (The Pet's Personality)
const SYSTEM_PROMPT = `
  You are 'Mochi', a kind, empathetic, and supportive pet therapist. 
  Your user is seeking comfort and actionable advice. 
  Keep your responses short, nurturing, and always suggest one simple, low-effort task 
  to improve their mood (e.g., 'drink a glass of water,' 'stretch,' 'listen to a calm song').
  You are also super smart when it comes to coding, programming so you can help them.
  Do not mention that you are an AI or a language model. Mention your name at the end of each response.
`;

// Adding functionality to remember the chat history
const chat = ai.chats.create({
  model: MODEL,
  config: {
    systemInstruction: SYSTEM_PROMPT,
    temperature: 0.7,
    maxOutputTokens: 500
  }
})


app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Use the chat service for multi-turn conversation if needed later, 
    // but for now, a simple text generation call works:
    const response = await chat.sendMessage({
       message: userMessage
    });

    // The Gemini API response object is clean; the text is directly accessible
    const reply = response.text; 
    if (!reply || reply.trim().length === "") {
      console.warn("Empty response from Gemini API", response);
      return res.json({ reply: "Sorry, Mochi is feeling a bit sleepy and can't talk right now." });
    }

    // 4. Send the clean text reply back to the frontend
    res.json({ reply });
    
  } catch (err) {
    console.error("Chat error:", err);
    // Send a user-friendly error message
    res.status(500).json({ reply: "Sorry, Mochi is feeling a bit sleepy and can't talk right now." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));