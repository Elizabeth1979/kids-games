'use client';

import { useTranslations } from 'next-intl';
import { Difficulty, DIFFICULTY_CONFIGS } from '@/types/difficulty';
import { cn } from '@/lib/utils';

interface DifficultyButtonsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  className?: string;
}

/**
 * Inline difficulty selector buttons (compact version)
 * Used for games where difficulty selection is part of the game UI
 */
export default function DifficultyButtons({
  difficulty,
  onDifficultyChange,
  className,
}: DifficultyButtonsProps) {
  const t = useTranslations('games.memory.difficulty');

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-3',
        className
      )}
    >
      {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((level) => {
        const config = DIFFICULTY_CONFIGS[level];
        const isSelected = difficulty === level;

        return (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            className={cn(
              'px-6 py-3 rounded-xl font-semibold transition-all duration-200',
              'text-sm sm:text-base',
              'border-2',
              isSelected
                ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-card border-border hover:border-primary hover:shadow-md'
            )}
            aria-label={t(level)}
          >
            <span className="flex items-center gap-2">
              <span>{config.emoji}</span>
              <span>{t(level)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
