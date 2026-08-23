export interface MemoryItem {
  id: string;
  name: string;
  symbol: string;
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
        symbol: 'ST',
        color: '#7F7F7F',
        textColor: '#FFFFFF',
      },
      {
        id: 'deepslate',
        name: 'Deepslate',
        symbol: 'DS',
        color: '#4A4A4A',
        textColor: '#FFFFFF',
      },
      {
        id: 'granite',
        name: 'Granite',
        symbol: 'GR',
        color: '#9B5D4E',
        textColor: '#FFFFFF',
      },
      {
        id: 'diorite',
        name: 'Diorite',
        symbol: 'DI',
        color: '#C5C5C5',
        textColor: '#000000',
      },
      {
        id: 'andesite',
        name: 'Andesite',
        symbol: 'AN',
        color: '#8B8680',
        textColor: '#FFFFFF',
      },
      {
        id: 'netherrack',
        name: 'Netherrack',
        symbol: 'NE',
        color: '#8C4A3F',
        textColor: '#FFFFFF',
      },
      {
        id: 'endstone',
        name: 'End Stone',
        symbol: 'ES',
        color: '#E0E8A7',
        textColor: '#000000',
      },
      {
        id: 'obsidian',
        name: 'Obsidian',
        symbol: 'OB',
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
        symbol: 'TT',
        color: '#0EA5E9',
        textColor: '#FFFFFF',
      },
      {
        id: 'bombardiro',
        name: 'Bombardiro Crocodilo',
        symbol: 'BC',
        color: '#16A34A',
        textColor: '#FFFFFF',
      },
      {
        id: 'tungtung',
        name: 'Tung Tung Sahur',
        symbol: 'TS',
        color: '#92400E',
        textColor: '#FFFFFF',
      },
      {
        id: 'lirili',
        name: 'Lirilì Larilà',
        symbol: 'LL',
        color: '#9333EA',
        textColor: '#FFFFFF',
      },
      {
        id: 'brrbrr',
        name: 'Brr Brr Patapim',
        symbol: 'BP',
        color: '#D97706',
        textColor: '#FFFFFF',
      },
      {
        id: 'slim',
        name: 'Slim',
        symbol: 'SL',
        color: '#22C55E',
        textColor: '#FFFFFF',
      },
      {
        id: 'fusion1',
        name: 'Fusion Alpha',
        symbol: 'FA',
        color: '#EC4899',
        textColor: '#FFFFFF',
      },
      {
        id: 'fusion2',
        name: 'Fusion Beta',
        symbol: 'FB',
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
        symbol: 'NO',
        color: '#FFD700',
        textColor: '#000000',
      },
      {
        id: 'bacon',
        name: 'Bacon Hair',
        symbol: 'BH',
        color: '#8B4513',
        textColor: '#FFFFFF',
      },
      {
        id: 'guest',
        name: 'Guest',
        symbol: 'GU',
        color: '#808080',
        textColor: '#FFFFFF',
      },
      {
        id: 'slender',
        name: 'Slender',
        symbol: 'SL',
        color: '#1A1A1A',
        textColor: '#FFFFFF',
      },
      {
        id: 'cnp',
        name: 'CNP',
        symbol: 'CN',
        color: '#FF69B4',
        textColor: '#FFFFFF',
      },
      {
        id: 'korblox',
        name: 'Korblox',
        symbol: 'KO',
        color: '#4B0082',
        textColor: '#FFFFFF',
      },
      {
        id: 'headless',
        name: 'Headless',
        symbol: 'HE',
        color: '#6D28D9',
        textColor: '#FFFFFF',
      },
      {
        id: 'builderman',
        name: 'Builderman',
        symbol: 'BU',
        color: '#0066CC',
        textColor: '#FFFFFF',
      },
    ],
  },
];

export function getThemeById(id: string): MemoryTheme | undefined {
  return memoryThemes.find((theme) => theme.id === id);
}
