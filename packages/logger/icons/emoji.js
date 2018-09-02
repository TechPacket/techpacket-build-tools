const supportsEmoji = process.platform !== 'win32' || process.env.TERM === 'xterm-256color';
const isMacTerm = process.env.TERM_PROGRAM === 'Apple_Terminal';
const extracSpace = emoji => emoji + (isMacTerm ? '' : ' ');

// Fallback symbols for Windows from https://en.wikipedia.org/wiki/Code_page_437
module.exports = {
    progress: supportsEmoji ? extracSpace('⏳') : '∞',
    success: supportsEmoji ? extracSpace(' ') : '√',
    error: supportsEmoji ? extracSpace(' ') : '×',
    // Always add space
    warning: supportsEmoji ? `⚠️ ` : '‼',
};
