import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMathGame } from './useMathGame';

describe('useMathGame', () => {
  it('starts with a question for the requested operation and difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const { result } = renderHook(() => useMathGame('multiplication', 'easy'));

    expect(result.current.currentQuestion).toMatchObject({
      operation: 'multiplication',
      operand1: 1,
      operand2: 1,
      correctAnswer: 1,
    });
    expect(result.current.isGameActive).toBe(true);
  });

  it('generates a question for a newly selected difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const { result } = renderHook(() => useMathGame('addition', 'easy'));

    act(() => result.current.setDifficulty('hard'));

    expect(result.current.difficulty).toBe('hard');
    expect(result.current.currentQuestion).toMatchObject({
      operation: 'addition',
      operand1: 100,
      operand2: 100,
      correctAnswer: 200,
    });
  });
});
