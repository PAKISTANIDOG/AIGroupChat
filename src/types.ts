export interface Message {
    content: string;
    sender: 'chatgpt' | 'grok';
    timestamp: Date;
    role: 'system' | 'user' | 'assistant';
}

export interface AIAgent {
    name: string;
    respond(message: string, history: Message[]): Promise<string>;
    getSystemPrompt(): string;
}

export interface Conversation {
    messages: Message[];
    addMessage(message: Message): void;
    getLastMessage(): Message | null;
    getConversationHistory(): Message[];
} 