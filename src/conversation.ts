import { Conversation, Message } from './types';
import { ChatGPT } from './agents/chatgpt';
import { Grok } from './agents/grok';

export class AIConversation implements Conversation {
    messages: Message[] = [];
    private chatGPT: ChatGPT;
    private grok: Grok;

    constructor() {
        this.chatGPT = new ChatGPT();
        this.grok = new Grok();
    }

    addMessage(message: Message): void {
        this.messages.push(message);
    }

    getLastMessage(): Message | null {
        return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
    }

    getConversationHistory(): Message[] {
        return this.messages;
    }

    async startConversation(initialMessage: string): Promise<void> {
        // Start with ChatGPT
        const chatGPTResponse = await this.chatGPT.respond(initialMessage, []);
        this.addMessage({
            content: chatGPTResponse,
            sender: 'chatgpt',
            timestamp: new Date(),
            role: 'assistant'
        });

        // Let Grok respond
        const grokResponse = await this.grok.respond(chatGPTResponse, this.messages);
        this.addMessage({
            content: grokResponse,
            sender: 'grok',
            timestamp: new Date(),
            role: 'assistant'
        });
    }

    async continueConversation(): Promise<void> {
        const lastMessage = this.getLastMessage();
        if (!lastMessage) return;

        const nextAgent = lastMessage.sender === 'chatgpt' ? this.grok : this.chatGPT;
        const response = await nextAgent.respond(lastMessage.content, this.messages);
        
        this.addMessage({
            content: response,
            sender: nextAgent.name.toLowerCase() as 'chatgpt' | 'grok',
            timestamp: new Date(),
            role: 'assistant'
        });
    }
} 