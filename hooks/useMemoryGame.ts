import { useState, useCallback, useEffect } from 'react';
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
  resetGame: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCardPairs(items: MemoryItem[], count: number): MemoryCard[] {
  // Select the required number of items based on difficulty
  const selectedItems = items.slice(0, count);

  // Create pairs
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
  const pairCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 6 : 8;

  const [cards, setCards] = useState<MemoryCard[]>(() =>
    createCardPairs(items, pairCount)
  );
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const isGameComplete = matches === pairCount;

  const resetGame = useCallback(() => {
    setCards(createCardPairs(items, pairCount));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsProcessing(false);
  }, [items, pairCount]);

  const flipCard = useCallback(
    (cardId: string) => {
      if (isProcessing) return;

      setCards((prevCards) => {
        const updatedCards = prevCards.map((card) => {
          if (card.id === cardId && !card.isMatched && !card.isFlipped) {
            return { ...card, isFlipped: true };
          }
          return card;
        });

        const currentFlipped = updatedCards.filter(
          (card) => card.isFlipped && !card.isMatched
        );

        setFlippedCards(currentFlipped);

        return updatedCards;
      });
    },
    [isProcessing]
  );

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      const [card1, card2] = flippedCards;

      if (card1.item.id === card2.item.id) {
        // Match found!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.id === card1.id || card.id === card2.id) {
                return { ...card, isMatched: true };
              }
              return card;
            })
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.id === card1.id || card.id === card2.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [flippedCards]);

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
