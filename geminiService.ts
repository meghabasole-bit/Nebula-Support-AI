import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { BotConfig } from "../types";

// Singleton instance management for the chat session
let chatSession: Chat | null = null;
let currentConfig: BotConfig | null = null;

export const initializeChat = async (config: BotConfig): Promise<void> => {
  currentConfig = config;
  
  // If we are in "Backend Mode" (production), we don't initialize a local Gemini instance.
  // We will just make HTTP requests to our server in sendMessageToGemini.
  if (process.env.NODE_ENV === 'production' && !process.env.API_KEY) {
      // Assume we are using backend proxy
      return;
  }

  // LOCAL DEMO MODE:
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a helpful customer service AI agent for a company called "${config.companyName}". 
      Your name is ${config.name}.
      
      Here are your specific instructions from the business owner:
      ${config.systemInstruction}
      
      Tone: Professional, empathetic, and concise.
      Formatting: Use markdown for lists or emphasis where appropriate.
      `,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (
  message: string
): Promise<string> => {
  
  // 1. PRODUCTION MODE: Send to Backend API
  // In a real app, this calls your Node.js/Python backend which holds the real API Key
  // and enforces CORS/Domain restrictions.
  if (process.env.NODE_ENV === 'production' && !process.env.API_KEY) {
      try {
          const response = await fetch('https://api.nebulasupport.ai/v1/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  botId: currentConfig?.id,
                  message: message,
                  // In a real app, you'd pass session ID or history here
              })
          });
          const data = await response.json();
          return data.text;
      } catch (e) {
          console.error("Backend API Error", e);
          throw new Error("Failed to reach support server.");
      }
  }

  // 2. DEMO/DASHBOARD MODE: Direct Client-Side Call
  // This is only safe because it runs in your secure dashboard, not on client sites.
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });
    
    return response.text || "I'm sorry, I didn't catch that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from AI agent.");
  }
};

export const resetSession = () => {
    chatSession = null;
};