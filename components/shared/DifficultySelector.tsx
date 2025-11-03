'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Difficulty, DIFFICULTY_CONFIGS } from '@/types/difficulty';
import { cn } from '@/lib/utils';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
  title?: string;
  metadata?: {
    [key in Difficulty]?: string;
  };
}

/**
 * Full-screen difficulty selector (setup screen version)
 * Used for games where difficulty selection is a separate screen
 */
export default function DifficultySelector({
  onSelectDifficulty,
  onBack,
  title,
  metadata,
}: DifficultySelectorProps) {
  const t = useTranslations('games.memory');
  const tDiff = useTranslations('games.memory.difficulty');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-card border-2 border-border hover:border-primary transition-all duration-200 hover:shadow-lg"
          aria-label={t('backToThemes')}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">{t('backToThemes')}</span>
        </button>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title || t('selectDifficulty')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('selectDifficulty')}
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((level) => {
            const config = DIFFICULTY_CONFIGS[level];

            return (
              <button
                key={level}
                onClick={() => onSelectDifficulty(level)}
                className={cn(
                  'group relative p-8 rounded-3xl border-4 transition-all duration-300',
                  'hover:scale-105 hover:shadow-xl',
                  'focus:outline-none focus:ring-4 focus:ring-primary/50',
                  config.colorClasses
                )}
                aria-label={tDiff(level)}
              >
                <div className="flex flex-col items-center gap-4">
                  {/* Emoji */}
                  <div className="text-8xl">{config.emoji}</div>

                  {/* Label */}
                  <h2 className="text-2xl md:text-3xl font-bold capitalize">
                    {tDiff(level)}
                  </h2>

                  {/* Metadata (optional) */}
                  {metadata?.[level] && (
                    <p className="text-sm md:text-base opacity-90">
                      {metadata[level]}
                    </p>
                  )}
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
