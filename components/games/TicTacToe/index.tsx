'use client';

import { useTranslations } from 'next-intl';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import DifficultySelector from './DifficultySelector';

export default function TicTacToe() {
  const t = useTranslations('ticTacToe');
  const game = useTicTacToe();

  // Get status message based on game state
  const getStatusMessage = () => {
    if (game.gameStatus === 'playerWon') {
      return t('youWin');
    } else if (game.gameStatus === 'computerWon') {
      return t('computerWins');
    } else if (game.gameStatus === 'tie') {
      return t('tie');
    } else if (game.currentPlayer === 'O') {
      return t('computerTurn');
    } else {
      return t('yourTurn');
    }
  };

  const getStatusClass = () => {
    if (game.gameStatus === 'playerWon') return 'bg-destructive';
    if (game.gameStatus === 'computerWon') return 'bg-primary';
    if (game.gameStatus === 'tie') return 'bg-accent';
    return 'bg-secondary';
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </header>

        {/* Score Board */}
        <ScoreBoard scores={game.scores} />

        {/* Status Message */}
        <div
          className={`text-center text-xl md:text-2xl font-bold py-4 px-6 rounded-2xl
                     text-white mb-8 shadow-lg transition-all ${getStatusClass()}`}
        >
          {getStatusMessage()}
        </div>

        {/* Game Board */}
        <GameBoard
          board={game.board}
          winningCells={game.winningCells}
          onCellClick={game.handleCellClick}
          disabled={game.gameStatus !== 'playing' || game.currentPlayer === 'O'}
        />

        {/* Controls */}
        <Controls
          onNewGame={game.resetGame}
          onResetScore={game.resetScore}
        />

        {/* Difficulty Selector */}
        <DifficultySelector
          difficulty={game.difficulty}
          onDifficultyChange={game.setDifficulty}
        />
      </div>
    </div>
  );
}
