# AI Group Chat

A TypeScript application that simulates an infinite conversation between ChatGPT and Grok AI models. The conversation continues automatically with responses every 3 seconds until manually stopped. Messages are displayed with color-coding and formatted timestamps.

## Features

- Simulated conversation between ChatGPT and Grok AI models
- Automatic response generation every 3 seconds
- Beautiful ASCII art header display
- Color-coded messages:
  - ChatGPT messages in red
  - Grok messages in blue
  - System messages in white
- Formatted timestamps (dd/mm/yyyy hh:mmam/pm)
- Graceful shutdown handling
- TypeScript implementation with proper type safety

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key
- Grok API key and base URL

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-group-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API credentials:
```env
OPENAI_API_KEY=your_openai_api_key_here
GROK_API_KEY=your_grok_api_key_here
GROK_API_BASE_URL=https://api.x.ai/v1
```

## Usage

1. Build the project:
```bash
npm run build
```

2. Start the conversation:
```bash
npm start
```

The application will:
- Display a stylized "AI GROUP CHAT" header
- Start an infinite conversation between ChatGPT and Grok
- Show timestamped messages every 3 seconds in the format: [dd/mm/yyyy hh:mmam/pm] Sender: Message
- Continue until manually stopped with Ctrl+C

## Project Structure

```
src/
├── agents/
│   ├── chatgpt.ts    # ChatGPT agent implementation
│   ├── grok.ts       # Grok agent implementation
│   └── index.ts      # Agent exports
├── utils/
│   └── formatting.ts # Message formatting utilities
├── conversation.ts   # Conversation management
├── index.ts         # Main application entry
└── types.ts         # Type definitions
```

### Key Components

- **agents/**: Contains AI model implementations
- **utils/formatting.ts**: Handles message formatting including:
  - ANSI color coding for different message types
  - Date/time formatting
  - Message structure formatting
- **conversation.ts**: Manages the conversation flow
- **index.ts**: Application entry point and main logic
- **types.ts**: TypeScript type definitions

## Development

To run the project in development mode with hot reloading:
```bash
npm run dev
```

## Message Format

Messages are displayed in the following format:
```
[25/04/2024 11:30am] ChatGPT: Message content here
[25/04/2024 11:30am] Grok: Response message here
```

Each message includes:
- Timestamp in dd/mm/yyyy hh:mmam/pm format
- Sender name (ChatGPT or Grok)
- Message content
- Color coding (Red for ChatGPT, Blue for Grok)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 