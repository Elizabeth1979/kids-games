import { notFound } from 'next/navigation';
import LanguageGame from '@/components/games/LanguageGame';
import { getLanguageById } from '@/data/languages';

interface GamePageProps {
  params: Promise<{
    locale: string;
    gameId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  // Get language configuration
  const languageConfig = getLanguageById(gameId);

  if (!languageConfig) {
    notFound();
  }

  return <LanguageGame languageConfig={languageConfig} />;
}

// Generate static params for all language games
export async function generateStaticParams() {
  return [
    { gameId: 'hebrew' },
    { gameId: 'english' },
    { gameId: 'russian' },
    { gameId: 'arabic' }
  ];
}
