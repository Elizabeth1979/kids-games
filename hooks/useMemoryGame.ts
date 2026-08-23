import { useCallback, useState } from 'react';
import type { MemoryItem } from '@/data/memoryThemes';
import { Difficulty } from '@/types/difficulty';

export interface MemoryCard {
  id: string;
  item: MemoryItem;
  isFlipped: boolean;
  isMatched: boolean;
}

interface UseMemoryGameReturn {
  cards: MemoryCard[];
  flippedCards: MemoryCard[];
  moves: number;
  matches: number;
  isGameComplete: boolean;
  flipCard: (cardId: string) => void;
  resetGame: (itemsOverride?: MemoryItem[], difficultyOverride?: Difficulty) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getPairCount(difficulty: Difficulty): number {
  return difficulty === 'easy' ? 3 : difficulty === 'medium' ? 6 : 8;
}

function createCardPairs(items: MemoryItem[], count: number): MemoryCard[] {
  const selectedItems = items.slice(0, count);
  const pairs: MemoryCard[] = [];

  selectedItems.forEach((item, index) => {
    pairs.push({
      id: `${item.id}-1-${index}`,
      item,
      isFlipped: false,
      isMatched: false,
    });
    pairs.push({
      id: `${item.id}-2-${index}`,
      item,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleArray(pairs);
}

export function useMemoryGame(
  items: MemoryItem[],
  difficulty: Difficulty
): UseMemoryGameReturn {
  const pairCount = getPairCount(difficulty);
  const [cards, setCards] = useState<MemoryCard[]>(() =>
    createCardPairs(items, pairCount)
  );
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const isGameComplete = matches === pairCount;

  const resetGame = useCallback((
    itemsOverride = items,
    difficultyOverride = difficulty
  ) => {
    setCards(createCardPairs(itemsOverride, getPairCount(difficultyOverride)));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsProcessing(false);
  }, [items, difficulty]);

  const flipCard = useCallback((cardId: string) => {
    if (isProcessing) return;

    const selectedCard = cards.find((card) => card.id === cardId);
    if (!selectedCard || selectedCard.isMatched || selectedCard.isFlipped) return;

    const flippedCard = { ...selectedCard, isFlipped: true };
    const nextFlippedCards = [...flippedCards, flippedCard];
    setCards((currentCards) =>
      currentCards.map((card) => card.id === cardId ? flippedCard : card)
    );
    setFlippedCards(nextFlippedCards);

    if (nextFlippedCards.length !== 2) return;

    setIsProcessing(true);
    setMoves((previousMoves) => previousMoves + 1);
    const [card1, card2] = nextFlippedCards;

    if (card1.item.id === card2.item.id) {
      window.setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches((previousMatches) => previousMatches + 1);
        setFlippedCards([]);
        setIsProcessing(false);
      }, 600);
    } else {
      window.setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  }, [cards, flippedCards, isProcessing]);

  return {
    cards,
    flippedCards,
    moves,
    matches,
    isGameComplete,
    flipCard,
    resetGame,
  };
}
