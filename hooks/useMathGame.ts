import { useState, useCallback, useEffect } from 'react';
import type { MathOperation, MathDifficulty, MathQuestion, MathGameStats } from '@/types';
import { operationConfigs } from '@/data/mathOperations';

export interface UseMathGameReturn {
  // Game state
  currentQuestion: MathQuestion | null;
  gameStats: MathGameStats;
  difficulty: MathDifficulty;
  operation: MathOperation;
  isGameActive: boolean;

  // Game actions
  generateNewQuestion: () => void;
  submitAnswer: (answer: number) => boolean;
  setDifficulty: (difficulty: MathDifficulty) => void;
  setOperation: (operation: MathOperation) => void;
  resetGame: () => void;
  resetStats: () => void;

  // Feedback
  lastAnswerCorrect: boolean | null;
  showFeedback: boolean;
}

/**
 * Custom hook for managing math game logic
 * Handles question generation, answer validation, and statistics tracking
 */
export function useMathGame(
  initialOperation: MathOperation = 'addition',
  initialDifficulty: MathDifficulty = 'medium'
): UseMathGameReturn {

  const [operation, setOperationState] = useState<MathOperation>(initialOperation);
  const [difficulty, setDifficultyState] = useState<MathDifficulty>(initialDifficulty);
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);

  const [gameStats, setGameStats] = useState<MathGameStats>({
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 0,
    accuracy: 0
  });

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  /**
   * Generate a new question based on current operation and difficulty
   */
  const generateNewQuestion = useCallback(() => {
    const config = operationConfigs[operation];
    const question = config.generateQuestion(difficulty);
    setCurrentQuestion(question);
    setIsGameActive(true);
    setLastAnswerCorrect(null);
    setShowFeedback(false);
  }, [operation, difficulty]);

  /**
   * Submit an answer and check if it's correct
   * Updates game statistics and provides feedback
   */
  const submitAnswer = useCallback((answer: number): boolean => {
    if (!currentQuestion) return false;

    const config = operationConfigs[operation];
    const isCorrect = config.validate(currentQuestion, answer);

    // Update stats
    setGameStats(prev => {
      const newCorrect = prev.correct + (isCorrect ? 1 : 0);
      const newWrong = prev.wrong + (isCorrect ? 0 : 1);
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newTotal = prev.totalQuestions + 1;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const newAccuracy = newTotal > 0 ? (newCorrect / newTotal) * 100 : 0;

      return {
        correct: newCorrect,
        wrong: newWrong,
        streak: newStreak,
        bestStreak: newBestStreak,
        totalQuestions: newTotal,
        accuracy: Math.round(newAccuracy)
      };
    });

    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    // Auto-generate next question after a short delay
    setTimeout(() => {
      generateNewQuestion();
    }, 1500);

    return isCorrect;
  }, [currentQuestion, operation, generateNewQuestion]);

  /**
   * Change the difficulty level
   */
  const setDifficulty = useCallback((newDifficulty: MathDifficulty) => {
    setDifficultyState(newDifficulty);
  }, []);

  /**
   * Change the math operation
   */
  const setOperation = useCallback((newOperation: MathOperation) => {
    setOperationState(newOperation);
  }, []);

  /**
   * Reset the game (generate a new question)
   */
  const resetGame = useCallback(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  /**
   * Reset all game statistics
   */
  const resetStats = useCallback(() => {
    setGameStats({
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0,
      totalQuestions: 0,
      accuracy: 0
    });
  }, []);

  // Generate first question when operation or difficulty changes
  useEffect(() => {
    generateNewQuestion();
  }, [operation, difficulty, generateNewQuestion]);

  return {
    currentQuestion,
    gameStats,
    difficulty,
    operation,
    isGameActive,
    generateNewQuestion,
    submitAnswer,
    setDifficulty,
    setOperation,
    resetGame,
    resetStats,
    lastAnswerCorrect,
    showFeedback
  };
}
