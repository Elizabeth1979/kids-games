import { notFound } from 'next/navigation';
import LanguageGame from '@/components/games/LanguageGame';
import TicTacToe from '@/components/games/TicTacToe';
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
    { gameId: 'tic-tac-toe' }
  ];
}
