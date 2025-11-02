'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useMemoryGame, type Difficulty } from '@/hooks/useMemoryGame';
import { getThemeById } from '@/data/memoryThemes';
import ThemeSelector from './ThemeSelector';
import DifficultySelector from './DifficultySelector';
import Card from './Card';
import GameStats from './GameStats';

type GameState = 'theme-select' | 'difficulty-select' | 'playing';

export default function MemoryGame() {
  const t = useTranslations('games.memory');
  const [gameState, setGameState] = useState<GameState>('theme-select');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>('medium');
  const [showCelebration, setShowCelebration] = useState(false);

  const theme = selectedThemeId ? getThemeById(selectedThemeId) : null;
  const gameLogic = useMemoryGame(
    theme?.items || [],
    selectedDifficulty
  );

  const { cards, moves, matches, isGameComplete, flipCard, resetGame } =
    gameLogic;

  const totalPairs =
    selectedDifficulty === 'easy' ? 3 : selectedDifficulty === 'medium' ? 6 : 8;

  const gridCols =
    selectedDifficulty === 'easy'
      ? 'grid-cols-3'
      : selectedDifficulty === 'medium'
      ? 'grid-cols-4'
      : 'grid-cols-4';

  useEffect(() => {
    if (isGameComplete) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [isGameComplete]);

  // Reset game when difficulty changes
  useEffect(() => {
    if (gameState === 'playing' && theme) {
      resetGame();
    }
  }, [selectedDifficulty, gameState]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedThemeId(themeId);
    setGameState('difficulty-select');
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameState('playing');
  };

  const handleBackToThemes = () => {
    setGameState('theme-select');
    setSelectedThemeId(null);
  };

  const handleBackToDifficulty = () => {
    setGameState('difficulty-select');
    resetGame();
  };

  const handlePlayAgain = () => {
    resetGame();
    setShowCelebration(false);
  };

  if (gameState === 'theme-select') {
    return <ThemeSelector onSelectTheme={handleThemeSelect} />;
  }

  if (gameState === 'difficulty-select' && theme) {
    return (
      <DifficultySelector
        themeName={t(`themes.${theme.id}`)}
        onSelectDifficulty={handleDifficultySelect}
        onBack={handleBackToThemes}
      />
    );
  }

  if (!theme) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t(`themes.${theme.id}`)}
          </h1>
          <p className="text-muted-foreground capitalize">
            {t(`difficulty.${selectedDifficulty}`)}
          </p>
        </div>

        {/* Stats */}
        <GameStats moves={moves} matches={matches} totalPairs={totalPairs} />

        {/* Game Grid */}
        <div
          className={`grid ${gridCols} gap-3 md:gap-4 max-w-3xl mx-auto mb-6`}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => flipCard(card.id)} />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handlePlayAgain}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
          >
            {t('playAgain')}
          </button>
          <button
            onClick={handleBackToDifficulty}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {t('changeDifficulty')}
          </button>
          <button
            onClick={handleBackToThemes}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {t('changeTheme')}
          </button>
        </div>

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border-2 border-border rounded-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t('congratulations')}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t('completedIn', { moves })}
              </p>
              <button
                onClick={handlePlayAgain}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
              >
                {t('playAgain')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
