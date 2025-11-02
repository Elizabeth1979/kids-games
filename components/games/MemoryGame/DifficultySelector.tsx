import { useTranslations } from 'next-intl';
import type { Difficulty } from '@/hooks/useMemoryGame';

interface DifficultySelectorProps {
  themeName: string;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficulties: { level: Difficulty; pairs: number; emoji: string }[] = [
  { level: 'easy', pairs: 3, emoji: '😊' },
  { level: 'medium', pairs: 6, emoji: '🤔' },
  { level: 'hard', pairs: 8, emoji: '🔥' },
];

export default function DifficultySelector({
  themeName,
  onSelectDifficulty,
  onBack,
}: DifficultySelectorProps) {
  const t = useTranslations('games.memory');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {themeName}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('selectDifficulty')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficulties.map(({ level, pairs, emoji }) => (
            <button
              key={level}
              onClick={() => onSelectDifficulty(level)}
              className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl">{emoji}</div>
                <h3 className="text-xl font-semibold text-foreground capitalize">
                  {t(`difficulty.${level}`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pairs} {t('pairs')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {pairs * 2} {t('cards')}
                </p>
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {t('backToThemes')}
          </button>
        </div>
      </div>
    </div>
  );
}
