import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMathGame } from './useMathGame';

describe('useMathGame', () => {
  afterEach(() => vi.useRealTimers());

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

  it('cancels the pending next question when difficulty changes', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.99)
      .mockReturnValueOnce(0.99)
      .mockReturnValue(0);
    const { result } = renderHook(() => useMathGame('addition', 'easy'));

    act(() => result.current.submitAnswer(2));
    act(() => result.current.setDifficulty('hard'));
    const hardQuestion = result.current.currentQuestion;
    act(() => vi.advanceTimersByTime(1500));

    expect(result.current.difficulty).toBe('hard');
    expect(result.current.currentQuestion).toEqual(hardQuestion);
    expect(result.current.currentQuestion).toMatchObject({
      operand1: 100,
      operand2: 100,
      correctAnswer: 200,
    });
  });
});
