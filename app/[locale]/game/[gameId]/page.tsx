import { notFound } from 'next/navigation';
import LanguageGame from '@/components/games/LanguageGame';
import TicTacToe from '@/components/games/TicTacToe';
import CanvasDrawing from '@/components/games/CanvasDrawing';
import ImagePuzzle from '@/components/games/ImagePuzzle';
import MemoryGame from '@/components/games/MemoryGame';
import Navigation from '@/components/shared/Navigation';
import { getLanguageById } from '@/data/languages';

interface GamePageProps {
  params: Promise<{
    locale: string;
    gameId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  // Handle tic-tac-toe game
  if (gameId === 'tic-tac-toe') {
    return (
      <>
        <Navigation />
        <div className="pt-20">
          <TicTacToe />
        </div>
      </>
    );
  }

  // Handle canvas drawing game
  if (gameId === 'canvas-drawing') {
    return (
      <>
        <Navigation />
        <div className="pt-20">
          <CanvasDrawing />
        </div>
      </>
    );
  }

  // Handle image puzzle game
  if (gameId === 'image-puzzle') {
    return (
      <>
        <Navigation />
        <div className="pt-20">
          <ImagePuzzle />
        </div>
      </>
    );
  }

  // Handle memory game
  if (gameId === 'memory-game') {
    return (
      <>
        <Navigation />
        <div className="pt-20">
          <MemoryGame />
        </div>
      </>
    );
  }

  // Get language configuration
  const languageConfig = getLanguageById(gameId);

  if (!languageConfig) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <div className="pt-20">
        <LanguageGame languageConfig={languageConfig} />
      </div>
    </>
  );
}

// Generate static params for all active games
export async function generateStaticParams() {
  return [
    { gameId: 'hebrew' },
    { gameId: 'english' },
    { gameId: 'russian' },
    { gameId: 'arabic' },
    { gameId: 'tic-tac-toe' },
    { gameId: 'canvas-drawing' },
    { gameId: 'image-puzzle' },
    { gameId: 'memory-game' }
  ];
}
