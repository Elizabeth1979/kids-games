/**
 * Shared difficulty types for games
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Configuration for each difficulty level
 */
export interface DifficultyConfig {
  id: Difficulty;
  symbol: string;
  colorClasses: string;
  description?: string;
}

/**
 * Default difficulty configurations with semantic colors
 * Following THEME_GUIDE.md standards
 */
export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    symbol: '1',
    colorClasses:
      'bg-success hover:bg-success/90 border-success text-success-foreground',
  },
  medium: {
    id: 'medium',
    symbol: '2',
    colorClasses:
      'bg-warning hover:bg-warning/90 border-warning text-warning-foreground',
  },
  hard: {
    id: 'hard',
    symbol: '3',
    colorClasses:
      'bg-info hover:bg-info/90 border-info text-info-foreground',
  },
};
