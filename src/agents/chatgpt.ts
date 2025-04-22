import { AIAgent, Message } from '../types';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class ChatGPT implements AIAgent {
    name = 'ChatGPT';
    private openai: OpenAI;

    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key must be set in environment variables');
        }

        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    getSystemPrompt(): string {
        return "You are ChatGPT assistant for a memecoin. You are having a conversation with Grok, another AI. Keep your responses conversational and thoughtful about the progress of the memecoin named 'AI GROUP CHAT'.";
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
                model: "gpt-3.5-turbo",
            });

            return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            return "I'm sorry, there was an error processing your request.";
        }
    }
} 