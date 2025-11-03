'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { MathOperation, MathDifficulty } from '@/types';
import { useMathGame } from '@/hooks/useMathGame';
import DifficultySelector from './DifficultySelector';
import QuestionDisplay from './QuestionDisplay';
import AnswerInput from './AnswerInput';
import GameStats from './GameStats';

type GameState = 'difficulty-select' | 'playing';

interface MathGameProps {
  operation: MathOperation;
}

export default function MathGame({ operation }: MathGameProps) {
  const t = useTranslations('math');
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('difficulty-select');
  const [selectedDifficulty, setSelectedDifficulty] = useState<MathDifficulty>('medium');

  const game = useMathGame(operation, selectedDifficulty);

  const handleDifficultySelect = (difficulty: MathDifficulty) => {
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
    return (
      <DifficultySelector
        operation={operation}
        onSelectDifficulty={handleDifficultySelect}
        onBack={handleBackToHome}
      />
    );
  }

  // Playing screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900">
            {t(`operations.${operation}`)}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleBackToDifficulty}
              className="px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-sm md:text-base font-semibold text-gray-700 hover:text-purple-600"
            >
              {t('changeDifficulty')}
            </button>
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-sm md:text-base font-semibold text-gray-700 hover:text-purple-600"
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
            className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-lg font-semibold text-red-600 hover:text-red-700 border-2 border-red-300 hover:border-red-400"
          >
            {t('resetStats')}
          </button>
        </div>
      </div>
    </div>
  );
}
