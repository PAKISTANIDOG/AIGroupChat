// ANSI color codes
export const colors = {
    reset: '\x1b[0m',
    white: '\x1b[37m',
    red: '\x1b[31m',
    blue: '\x1b[34m'
};

export function getMessageColor(sender: string): string {
    switch (sender) {
        case 'chatgpt':
            return colors.red;
        case 'grok':
            return colors.blue;
        default:
            return colors.white;
    }
}

export function formatDate(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}${ampm}`;
}

export function formatMessage(sender: string, content: string, timestamp: Date): string {
    const color = getMessageColor(sender);
    const formattedDate = formatDate(timestamp);
    const senderName = sender.charAt(0).toUpperCase() + sender.slice(1);
    return color + `[${formattedDate}] ${senderName}: ${content}\n` + colors.reset;
} 