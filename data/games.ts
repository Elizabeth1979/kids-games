import { GameConfig } from '@/types';

export const gamesConfig: GameConfig[] = [
  {
    id: 'hebrew',
    title: 'games.titles.hebrew',
    icon: 'אבג',
    category: 'languages',
    active: true
  },
  {
    id: 'english',
    title: 'games.titles.english',
    icon: 'ABC',
    category: 'languages',
    active: true
  },
  {
    id: 'russian',
    title: 'games.titles.russian',
    icon: 'АБВ',
    category: 'languages',
    active: true
  },
  {
    id: 'arabic',
    title: 'games.titles.arabic',
    icon: 'أبت',
    category: 'languages',
    active: true
  },
  {
    id: 'tic-tac-toe',
    title: 'games.titles.tic-tac-toe',
    icon: 'OX',
    category: 'board',
    active: true
  },
  {
    id: 'canvas-drawing',
    title: 'games.titles.canvas-drawing',
    icon: '🎨',
    category: 'board',
    active: true
  },
  {
    id: 'image-puzzle',
    title: 'games.titles.image-puzzle',
    icon: '🧩',
    category: 'brain',
    active: true
  },
  // Placeholders for future games
  {
    id: 'addition',
    title: 'games.titles.addition',
    icon: '➕',
    category: 'math',
    active: false
  },
  {
    id: 'subtraction',
    title: 'games.titles.subtraction',
    icon: '➖',
    category: 'math',
    active: false
  },
  {
    id: 'multiplication',
    title: 'games.titles.multiplication',
    icon: '✖️',
    category: 'math',
    active: false
  },
  {
    id: 'memory-game',
    title: 'games.titles.memory-game',
    icon: '🧠',
    category: 'brain',
    active: true
  }
];
