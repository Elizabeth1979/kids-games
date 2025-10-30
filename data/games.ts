import { GameConfig } from '@/types';

export const gamesConfig: GameConfig[] = [
  {
    id: 'hebrew',
    title: 'משחק עברית',
    icon: 'א-ת',
    description: 'למדו את האותיות העבריות בצורה מהנה!',
    subtitle: 'שלושה מצבי משחק שונים',
    category: 'languages',
    active: true
  },
  {
    id: 'english',
    title: 'משחק אנגלית',
    icon: 'ABC',
    description: 'למדו את האותיות האנגליות בצורה מהנה!',
    subtitle: 'שלושה מצבי משחק שונים',
    category: 'languages',
    active: true
  },
  {
    id: 'russian',
    title: 'משחק רוסית',
    icon: 'АБВ',
    description: 'למדו את האותיות הרוסיות בצורה מהנה!',
    subtitle: 'שלושה מצבי משחק שונים',
    category: 'languages',
    active: true
  },
  {
    id: 'arabic',
    title: 'משחק ערבית',
    icon: 'أ-ي',
    description: 'למדו את האותיות הערביות בצורה מהנה!',
    subtitle: 'שלושה מצבי משחק שונים',
    category: 'languages',
    active: true
  },
  {
    id: 'tic-tac-toe',
    title: 'איקס עיגול',
    icon: '⭕❌',
    description: 'שחק נגד המחשב במשחק הקלאסי!',
    subtitle: 'שלוש רמות קושי',
    category: 'board',
    active: true
  },
  {
    id: 'canvas-drawing',
    title: 'ציור חופשי',
    icon: '🎨',
    description: 'צייר ושרבט כל מה שתרצה!',
    subtitle: 'כלי ציור מהנים',
    category: 'board',
    active: true
  },
  // Placeholders for future games
  {
    id: 'addition',
    title: 'חיבור',
    icon: '➕',
    description: 'תרגול חיבור מהנה',
    subtitle: 'בקרוב',
    category: 'math',
    active: false
  },
  {
    id: 'subtraction',
    title: 'חיסור',
    icon: '➖',
    description: 'תרגול חיסור מהנה',
    subtitle: 'בקרוב',
    category: 'math',
    active: false
  },
  {
    id: 'multiplication',
    title: 'לוח כפל',
    icon: '✖️',
    description: 'למד את לוח הכפל',
    subtitle: 'בקרוב',
    category: 'math',
    active: false
  },
  {
    id: 'memory',
    title: 'זיכרון',
    icon: '🃏',
    description: 'משחק זיכרון והתאמות',
    subtitle: 'בקרוב',
    category: 'brain',
    active: false
  }
];
