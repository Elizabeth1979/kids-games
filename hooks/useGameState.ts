'use client';

import { useState, useCallback } from 'react';
import { GameMode, Letter, GameStateHook } from '@/types';
import { shuffleArray, randomElement } from '@/lib/utils';

export function useGameState(initialLetters: Letter[]): GameStateHook {
  const [mode, setMode] = useState<GameMode>('learn');
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<Letter | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [currentLetters, setCurrentLetters] = useState<Letter[]>(initialLetters);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => {
      const newShuffled = !prev;
      setCurrentLetters(newShuffled ? shuffleArray(initialLetters) : initialLetters);
      return newShuffled;
    });
  }, [initialLetters]);

  const changeMode = useCallback((newMode: GameMode) => {
    setMode(newMode);
    setCorrectCount(0);
    setWrongCount(0);

    if (newMode === 'find') {
      setCurrentTarget(randomElement(initialLetters));
    } else {
      setCurrentTarget(null);
    }
  }, [initialLetters]);

  const nextChallenge = useCallback(() => {
    setCurrentTarget(randomElement(initialLetters));
  }, [initialLetters]);

  const handleCorrect = useCallback(() => {
    setCorrectCount(prev => prev + 1);
  }, []);

  const handleWrong = useCallback(() => {
    setWrongCount(prev => prev + 1);
  }, []);

  return {
    mode,
    isShuffled,
    currentTarget,
    correctCount,
    wrongCount,
    currentLetters,
    changeMode,
    toggleShuffle,
    nextChallenge,
    handleCorrect,
    handleWrong
  };
}
