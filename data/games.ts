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
    icon: 'ART',
    category: 'board',
    active: true
  },
  {
    id: 'image-puzzle',
    title: 'games.titles.image-puzzle',
    icon: 'PUZ',
    category: 'brain',
    active: true
  },
  // Math games
  {
    id: 'addition',
    title: 'games.titles.addition',
    icon: '+',
    category: 'math',
    active: true,
    path: '/games/math/addition'
  },
  {
    id: 'subtraction',
    title: 'games.titles.subtraction',
    icon: '-',
    category: 'math',
    active: true,
    path: '/games/math/subtraction'
  },
  {
    id: 'multiplication',
    title: 'games.titles.multiplication',
    icon: '×',
    category: 'math',
    active: true,
    path: '/games/math/multiplication'
  },
  {
    id: 'division',
    title: 'games.titles.division',
    icon: '÷',
    category: 'math',
    active: true,
    path: '/games/math/division'
  },
  {
    id: 'memory-game',
    title: 'games.titles.memory-game',
    icon: 'MEM',
    category: 'brain',
    active: true
  }
];
