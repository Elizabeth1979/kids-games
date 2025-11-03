'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { MathOperation } from '@/types';
import { Difficulty } from '@/types/difficulty';
import { useMathGame } from '@/hooks/useMathGame';
import DifficultySelector from '@/components/shared/DifficultySelector';
import QuestionDisplay from './QuestionDisplay';
import AnswerInput from './AnswerInput';
import GameStats from './GameStats';
import { getOperationConfig } from '@/data/mathOperations';

type GameState = 'difficulty-select' | 'playing';

interface MathGameProps {
  operation: MathOperation;
}

export default function MathGame({ operation }: MathGameProps) {
  const t = useTranslations('math');
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('difficulty-select');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  const game = useMathGame(operation, selectedDifficulty);
  const config = getOperationConfig(operation);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    game.setDifficulty(difficulty);
    setGameState('playing');
  };

  const handleBackToHome = () => {
    router.back();
  };

  const handleBackToDifficulty = () => {
    setGameState('difficulty-select');
  };

  // Difficulty selection screen
  if (gameState === 'difficulty-select') {
    const metadata = {
      easy: t('difficulty.range', { min: config.numberRange.easy.min, max: config.numberRange.easy.max }),
      medium: t('difficulty.range', { min: config.numberRange.medium.min, max: config.numberRange.medium.max }),
      hard: t('difficulty.range', { min: config.numberRange.hard.min, max: config.numberRange.hard.max }),
    };

    return (
      <DifficultySelector
        title={`${t(`operations.${operation}`)} ${config.emoji}`}
        metadata={metadata}
        onSelectDifficulty={handleDifficultySelect}
        onBack={handleBackToHome}
      />
    );
  }

  // Playing screen
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t(`operations.${operation}`)}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleBackToDifficulty}
              className="px-4 py-2 bg-card rounded-xl shadow-md hover:shadow-lg transition-all text-sm md:text-base font-semibold text-card-foreground hover:text-accent"
            >
              {t('changeDifficulty')}
            </button>
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-card rounded-xl shadow-md hover:shadow-lg transition-all text-sm md:text-base font-semibold text-card-foreground hover:text-accent"
            >
              {t('changeOperation')}
            </button>
          </div>
        </div>

        {/* Game Stats */}
        <GameStats stats={game.gameStats} />

        {/* Question Display */}
        <QuestionDisplay
          question={game.currentQuestion}
          showFeedback={game.showFeedback}
          isCorrect={game.lastAnswerCorrect}
        />

        {/* Answer Input */}
        <AnswerInput
          onSubmit={game.submitAnswer}
          disabled={game.showFeedback}
        />

        {/* Additional Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={game.resetStats}
            className="px-6 py-3 bg-card rounded-xl shadow-md hover:shadow-lg transition-all text-lg font-semibold text-destructive hover:text-destructive/90 border-2 border-destructive/30 hover:border-destructive/50"
          >
            {t('resetStats')}
          </button>
        </div>
      </div>
    </div>
  );
}
