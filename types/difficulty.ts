/**
 * Shared difficulty types for games
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Configuration for each difficulty level
 */
export interface DifficultyConfig {
  id: Difficulty;
  emoji: string;
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
    emoji: '😊',
    colorClasses:
      'bg-success hover:bg-success/90 border-success text-success-foreground',
  },
  medium: {
    id: 'medium',
    emoji: '🤔',
    colorClasses:
      'bg-warning hover:bg-warning/90 border-warning text-warning-foreground',
  },
  hard: {
    id: 'hard',
    emoji: '🔥',
    colorClasses:
      'bg-destructive hover:bg-destructive/90 border-destructive text-destructive-foreground',
  },
};
