'use client';

import { useTranslations } from 'next-intl';
import type { MathOperation, MathDifficulty } from '@/types';
import { getOperationConfig } from '@/data/mathOperations';

interface DifficultySelectorProps {
  operation: MathOperation;
  onSelectDifficulty: (difficulty: MathDifficulty) => void;
  onBack: () => void;
}

export default function DifficultySelector({
  operation,
  onSelectDifficulty,
  onBack
}: DifficultySelectorProps) {
  const t = useTranslations('math');
  const config = getOperationConfig(operation);

  const difficulties: Array<{
    level: MathDifficulty;
    emoji: string;
    color: string;
  }> = [
    { level: 'easy', emoji: '😊', color: 'bg-success hover:bg-success/90 border-success text-success-foreground' },
    { level: 'medium', emoji: '🤔', color: 'bg-warning hover:bg-warning/90 border-warning text-warning-foreground' },
    { level: 'hard', emoji: '🔥', color: 'bg-destructive hover:bg-destructive/90 border-destructive text-destructive-foreground' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-3 bg-card rounded-xl shadow-md hover:shadow-lg transition-all text-lg font-semibold text-card-foreground hover:text-accent"
        >
          ← {t('back')}
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {t(`operations.${operation}`)} {config.emoji}
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-muted-foreground">
          {t('selectDifficulty')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficulties.map(({ level, emoji, color }) => {
            const range = config.numberRange[level];
            return (
              <button
                key={level}
                onClick={() => onSelectDifficulty(level)}
                className={`${color} rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4`}
              >
                <div className="text-8xl mb-4">{emoji}</div>
                <div className="text-3xl font-bold mb-4">
                  {t(`difficulty.${level}`)}
                </div>
                <div className="text-lg opacity-90">
                  {t('difficulty.range', { min: range.min, max: range.max })}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
