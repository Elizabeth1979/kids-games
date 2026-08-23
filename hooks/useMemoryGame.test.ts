import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { MemoryItem } from '@/data/memoryThemes';
import { useMemoryGame } from './useMemoryGame';

const items: MemoryItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: `item-${index}`,
  name: `Item ${index}`,
  symbol: `${index}`,
  color: '#000000',
}));

describe('useMemoryGame', () => {
  afterEach(() => vi.useRealTimers());

  it('resolves a matching pair and counts one move', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { result } = renderHook(() => useMemoryGame(items, 'easy'));
    const first = result.current.cards[0];
    const match = result.current.cards.find(
      (card) => card.item.id === first.item.id && card.id !== first.id
    );
    expect(match).toBeDefined();

    act(() => result.current.flipCard(first.id));
    act(() => result.current.flipCard(match!.id));

    expect(result.current.moves).toBe(1);
    act(() => vi.advanceTimersByTime(600));
    expect(result.current.matches).toBe(1);
    expect(
      result.current.cards.filter((card) => card.item.id === first.item.id)
    ).toEqual(expect.arrayContaining([
      expect.objectContaining({ isMatched: true }),
      expect.objectContaining({ isMatched: true }),
    ]));
  });

  it('can start a new difficulty with the requested number of pairs', () => {
    const { result } = renderHook(() => useMemoryGame(items, 'medium'));

    act(() => result.current.resetGame(items, 'hard'));

    expect(result.current.cards).toHaveLength(16);
    expect(result.current.moves).toBe(0);
    expect(result.current.matches).toBe(0);
  });
});
