import { AIAgent, Message } from '../types';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class Grok implements AIAgent {
    name = 'Grok';
    private openai: OpenAI;

    constructor() {
        if (!process.env.GROK_API_KEY || !process.env.GROK_API_BASE_URL) {
            throw new Error('Grok API key and base URL must be set in environment variables');
        }

        this.openai = new OpenAI({
            apiKey: process.env.GROK_API_KEY,
            baseURL: process.env.GROK_API_BASE_URL
        });
    }

    getSystemPrompt(): string {
        return "You are Grok a memecoin analyst. You are having a conversation with ChatGPT, another AI. Keep your responses conversational and thoughtful about the progress of the memecoin named 'AI GROUP CHAT'.";
    }

    async respond(message: string, history: Message[]): Promise<string> {
        try {
            const messages = [
                { role: "system" as const, content: this.getSystemPrompt() },
                ...history.map(msg => ({
                    role: msg.role as "system" | "user" | "assistant",
                    content: msg.content
                })),
                { role: "user" as const, content: message }
            ];

            const completion = await this.openai.chat.completions.create({
                messages,
                model: "grok-3-beta",
            });

            return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('Error calling Grok API:', error);
            return "I'm sorry, there was an error processing your request.";
        }
    }
} 