export interface MemoryItem {
  id: string;
  name: string;
  emoji?: string;
  color: string;
  textColor?: string;
}

export interface MemoryTheme {
  id: string;
  name: string;
  items: MemoryItem[];
}

export const memoryThemes: MemoryTheme[] = [
  {
    id: 'minecraft',
    name: 'Minecraft Rocks',
    items: [
      {
        id: 'stone',
        name: 'Stone',
        emoji: '🪨',
        color: '#7F7F7F',
        textColor: '#FFFFFF',
      },
      {
        id: 'deepslate',
        name: 'Deepslate',
        emoji: '⬛',
        color: '#4A4A4A',
        textColor: '#FFFFFF',
      },
      {
        id: 'granite',
        name: 'Granite',
        emoji: '🟥',
        color: '#9B5D4E',
        textColor: '#FFFFFF',
      },
      {
        id: 'diorite',
        name: 'Diorite',
        emoji: '⬜',
        color: '#C5C5C5',
        textColor: '#000000',
      },
      {
        id: 'andesite',
        name: 'Andesite',
        emoji: '🟫',
        color: '#8B8680',
        textColor: '#FFFFFF',
      },
      {
        id: 'netherrack',
        name: 'Netherrack',
        emoji: '🔴',
        color: '#BB4946',
        textColor: '#FFFFFF',
      },
      {
        id: 'endstone',
        name: 'End Stone',
        emoji: '🟡',
        color: '#E0E8A7',
        textColor: '#000000',
      },
      {
        id: 'obsidian',
        name: 'Obsidian',
        emoji: '🟣',
        color: '#1B1533',
        textColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'brainrot',
    name: 'Brainrot',
    items: [
      {
        id: 'tralalero',
        name: 'Tralalero Tralala',
        emoji: '🦈',
        color: '#0EA5E9',
        textColor: '#FFFFFF',
      },
      {
        id: 'bombardiro',
        name: 'Bombardiro Crocodilo',
        emoji: '🐊',
        color: '#16A34A',
        textColor: '#FFFFFF',
      },
      {
        id: 'tungtung',
        name: 'Tung Tung Sahur',
        emoji: '🪵',
        color: '#92400E',
        textColor: '#FFFFFF',
      },
      {
        id: 'lirili',
        name: 'Lirilì Larilà',
        emoji: '🐘',
        color: '#9333EA',
        textColor: '#FFFFFF',
      },
      {
        id: 'brrbrr',
        name: 'Brr Brr Patapim',
        emoji: '🐵',
        color: '#D97706',
        textColor: '#FFFFFF',
      },
      {
        id: 'slim',
        name: 'Slim',
        emoji: '🐸',
        color: '#22C55E',
        textColor: '#FFFFFF',
      },
      {
        id: 'fusion1',
        name: 'Fusion Alpha',
        emoji: '🌀',
        color: '#EC4899',
        textColor: '#FFFFFF',
      },
      {
        id: 'fusion2',
        name: 'Fusion Beta',
        emoji: '⚡',
        color: '#8B5CF6',
        textColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'roblox',
    name: 'Roblox',
    items: [
      {
        id: 'noob',
        name: 'Noob',
        emoji: '👤',
        color: '#FFD700',
        textColor: '#000000',
      },
      {
        id: 'bacon',
        name: 'Bacon Hair',
        emoji: '🥓',
        color: '#8B4513',
        textColor: '#FFFFFF',
      },
      {
        id: 'guest',
        name: 'Guest',
        emoji: '👻',
        color: '#808080',
        textColor: '#FFFFFF',
      },
      {
        id: 'slender',
        name: 'Slender',
        emoji: '🖤',
        color: '#1A1A1A',
        textColor: '#FFFFFF',
      },
      {
        id: 'cnp',
        name: 'CNP',
        emoji: '💅',
        color: '#FF69B4',
        textColor: '#FFFFFF',
      },
      {
        id: 'korblox',
        name: 'Korblox',
        emoji: '💀',
        color: '#4B0082',
        textColor: '#FFFFFF',
      },
      {
        id: 'headless',
        name: 'Headless',
        emoji: '🚫',
        color: '#DC143C',
        textColor: '#FFFFFF',
      },
      {
        id: 'builderman',
        name: 'Builderman',
        emoji: '🔧',
        color: '#0066CC',
        textColor: '#FFFFFF',
      },
    ],
  },
];

export function getThemeById(id: string): MemoryTheme | undefined {
  return memoryThemes.find((theme) => theme.id === id);
}
