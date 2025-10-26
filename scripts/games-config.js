// Centralized game configuration
// This file contains all game metadata to avoid repetition across files

const gamesConfig = [
    {
        id: 'alef-bet',
        title: 'משחק אלף-בית',
        icon: '🎨',
        description: 'למדו את האותיות העבריות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/alef-bet.html',
        active: true
    },
    {
        id: 'tic-tac-toe',
        title: 'איקס עיגול',
        icon: '⭕❌',
        description: 'שחק נגד המחשב במשחק הקלאסי!',
        subtitle: 'שלוש רמות קושי',
        url: 'games/tic-tac-toe.html',
        active: true
    },
    {
        id: 'abc',
        title: 'משחק ABC',
        icon: '🎨',
        description: 'למדו את האותיות האנגליות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/abc.html',
        active: true
    },
    {
        id: 'colors',
        title: 'משחק צבעים',
        icon: '🌈',
        description: 'למדו את שמות הצבעים בעברית',
        subtitle: 'בקרוב',
        url: null,
        active: false
    },
    {
        id: 'animals',
        title: 'משחק חיות',
        icon: '🐶',
        description: 'הכירו חיות ואת הקולות שלהם',
        subtitle: 'בקרוב',
        url: null,
        active: false
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gamesConfig;
}
