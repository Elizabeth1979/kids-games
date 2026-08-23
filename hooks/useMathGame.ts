import { useState, useCallback, useEffect, useRef } from 'react';
import type { MathOperation, MathQuestion, MathGameStats } from '@/types';
import { Difficulty } from '@/types/difficulty';
import { operationConfigs } from '@/data/mathOperations';

export interface UseMathGameReturn {
  // Game state
  currentQuestion: MathQuestion | null;
  gameStats: MathGameStats;
  difficulty: Difficulty;
  operation: MathOperation;
  isGameActive: boolean;

  // Game actions
  generateNewQuestion: () => void;
  submitAnswer: (answer: number) => boolean;
  setDifficulty: (difficulty: Difficulty) => void;
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
  initialDifficulty: Difficulty = 'medium'
): UseMathGameReturn {

  const [operation, setOperationState] = useState<MathOperation>(initialOperation);
  const [difficulty, setDifficultyState] = useState<Difficulty>(initialDifficulty);
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(() =>
    operationConfigs[initialOperation].generateQuestion(initialDifficulty)
  );
  const [isGameActive, setIsGameActive] = useState(true);

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
  const nextQuestionTimer = useRef<number | null>(null);

  const cancelPendingQuestion = useCallback(() => {
    if (nextQuestionTimer.current !== null) {
      window.clearTimeout(nextQuestionTimer.current);
      nextQuestionTimer.current = null;
    }
  }, []);

  useEffect(() => cancelPendingQuestion, [cancelPendingQuestion]);

  /**
   * Generate a new question based on current operation and difficulty
   */
  const generateNewQuestion = useCallback(() => {
    cancelPendingQuestion();
    const config = operationConfigs[operation];
    const question = config.generateQuestion(difficulty);
    setCurrentQuestion(question);
    setIsGameActive(true);
    setLastAnswerCorrect(null);
    setShowFeedback(false);
  }, [operation, difficulty, cancelPendingQuestion]);

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
    nextQuestionTimer.current = window.setTimeout(() => {
      nextQuestionTimer.current = null;
      generateNewQuestion();
    }, 1500);

    return isCorrect;
  }, [currentQuestion, operation, generateNewQuestion]);

  /**
   * Change the difficulty level
   */
  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    cancelPendingQuestion();
    setDifficultyState(newDifficulty);
    setCurrentQuestion(operationConfigs[operation].generateQuestion(newDifficulty));
    setIsGameActive(true);
    setLastAnswerCorrect(null);
    setShowFeedback(false);
  }, [operation, cancelPendingQuestion]);

  /**
   * Change the math operation
   */
  const setOperation = useCallback((newOperation: MathOperation) => {
    cancelPendingQuestion();
    setOperationState(newOperation);
    setCurrentQuestion(operationConfigs[newOperation].generateQuestion(difficulty));
    setIsGameActive(true);
    setLastAnswerCorrect(null);
    setShowFeedback(false);
  }, [difficulty, cancelPendingQuestion]);

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
