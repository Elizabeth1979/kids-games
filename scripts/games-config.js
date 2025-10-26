// Centralized game configuration
// This file contains all game metadata to avoid repetition across files

// Game categories configuration
const categoriesConfig = [
    {
        id: 'languages',
        title: 'שפות',
        icon: '🗣️',
        description: 'למדו אותיות ושפות שונות'
    },
    {
        id: 'board',
        title: 'משחקי לוח',
        icon: '🎲',
        description: 'משחקים קלאסיים ואסטרטגיה'
    },
    {
        id: 'nature',
        title: 'טבע וסביבה',
        icon: '🌿',
        description: 'חיות, צבעים וטבע'
    }
];

const gamesConfig = [
    {
        id: 'alef-bet',
        title: 'משחק אלף-בית',
        icon: '🎨',
        description: 'למדו את האותיות העבריות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/alef-bet.html',
        category: 'languages',
        active: true
    },
    {
        id: 'abc',
        title: 'משחק ABC',
        icon: '🎨',
        description: 'למדו את האותיות האנגליות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/abc.html',
        category: 'languages',
        active: true
    },
    {
        id: 'arabic',
        title: 'משחק ערבית',
        icon: '📖',
        description: 'למדו את האותיות הערביות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/arabic.html',
        category: 'languages',
        active: true
    },
    {
        id: 'russian',
        title: 'משחק רוסית',
        icon: '🇷🇺',
        description: 'למדו את האותיות הרוסיות בצורה מהנה!',
        subtitle: 'שלושה מצבי משחק שונים',
        url: 'games/russian.html',
        category: 'languages',
        active: true
    },
    {
        id: 'tic-tac-toe',
        title: 'איקס עיגול',
        icon: '⭕❌',
        description: 'שחק נגד המחשב במשחק הקלאסי!',
        subtitle: 'שלוש רמות קושי',
        url: 'games/tic-tac-toe.html',
        category: 'board',
        active: true
    },
    {
        id: 'colors',
        title: 'משחק צבעים',
        icon: '🌈',
        description: 'למדו את שמות הצבעים בעברית',
        subtitle: 'בקרוב',
        url: null,
        category: 'nature',
        active: false
    },
    {
        id: 'animals',
        title: 'משחק חיות',
        icon: '🐶',
        description: 'הכירו חיות ואת הקולות שלהם',
        subtitle: 'בקרוב',
        url: null,
        category: 'nature',
        active: false
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gamesConfig;
}
