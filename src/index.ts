import { AIConversation } from './conversation';
import figlet from 'figlet';
import { colors, formatMessage } from './utils/formatting';

function displayHeader() {
    const header = figlet.textSync('AI GROUP CHAT', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    });
    
    console.log('\n');
    console.log(colors.white + header + colors.reset);
    console.log('\n');
    console.log(colors.white + 'Starting infinite conversation between ChatGPT and Grok...\n' + colors.reset);
    console.log(colors.white + 'Initial message: What do you think about the future of AI in the metaverse?\n' + colors.reset);
}

async function main() {
    const conversation = new AIConversation();
    let isChatGPTTurn = true;
    
    displayHeader();
    
    // Start the conversation
    await conversation.startConversation('What do you think about the future of AI in the metaverse?');
    
    // Display the initial exchange
    conversation.messages.forEach(msg => {
        console.log(formatMessage(msg.sender, msg.content, msg.timestamp));
    });

    // Set up the infinite conversation loop
    const interval = setInterval(async () => {
        try {
            await conversation.continueConversation();
            const lastMessage = conversation.getLastMessage();
            if (lastMessage) {
                console.log(formatMessage(lastMessage.sender, lastMessage.content, lastMessage.timestamp));
            }
        } catch (error) {
            console.error('Error in conversation:', error);
            clearInterval(interval);
        }
    }, 3000); // 3 seconds interval

    // Handle process termination
    process.on('SIGINT', () => {
        console.log(colors.white + '\nEnding conversation...' + colors.reset);
        clearInterval(interval);
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log(colors.white + '\nEnding conversation...' + colors.reset);
        clearInterval(interval);
        process.exit(0);
    });
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 