
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initialize GoogleGenAI with a named parameter as per the latest SDK requirements.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chat(messages: Message[], level: string): Promise<string> {
    // Map the internal message history to the format expected by the Gemini API.
    const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    // Call generateContent with the full conversation history to maintain context.
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are a friendly, encouraging AI tutor for MORAVIA online Education. 
        The current student level is ${level}. 
        Keep explanations simple for Nursery/Grade students and more detailed for Junior Secondary. 
        Encourage critical thinking and offer hints before giving the full answer.`,
        temperature: 0.7,
      }
    });

    // Access the text output via the .text property on the GenerateContentResponse object.
    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  }
}

export const gemini = new GeminiService();
