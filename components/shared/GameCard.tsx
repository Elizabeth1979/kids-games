'use client';

import { GameConfig } from '@/types';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import BaseGameCard from './BaseGameCard';

interface GameCardProps {
  game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
  const t = useTranslations();

  // Check if icon contains only letters/text (no emojis)
  const isLetterIcon = /^[A-Za-zא-תА-Яа-яأ-ي]+$/.test(game.icon);

  // Define solid colors for each game
  const gameColors: Record<string, string> = {
    'hebrew': 'text-blue-500',
    'english': 'text-red-500',
    'russian': 'text-green-500',
    'arabic': 'text-purple-500',
    'tic-tac-toe': 'text-orange-500',
    'default': 'text-pink-500'
  };

  const letterColor = gameColors[game.id] || gameColors['default'];

  return (
    <Link href={`/game/${game.id}`} className="group block">
      <BaseGameCard variant="default">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
          {isLetterIcon ? (
            <span className={`font-bold ${letterColor}`}>
              {game.icon}
            </span>
          ) : (
            game.icon
          )}
        </div>
        <h3 className="text-2xl font-bold text-card-foreground mb-2">
          {t(game.title)}
        </h3>
      </BaseGameCard>
    </Link>
  );
}
