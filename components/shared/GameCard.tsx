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

  // Check if icon contains only letters/text
  const isLetterIcon = /^[A-Za-zא-תА-Яа-яأ-ي]+$/.test(game.icon);

  // Theme-aware colors keep labels legible in light and dark modes.
  const gameColors: Record<string, string> = {
    'hebrew': 'text-primary',
    'english': 'text-accent-foreground',
    'russian': 'text-success',
    'arabic': 'text-info',
    'tic-tac-toe': 'text-warning',
    'default': 'text-foreground'
  };

  const letterColor = gameColors[game.id] || gameColors['default'];

  return (
    <Link href={`/game/${game.id}`} className="group block">
      <BaseGameCard variant="default">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
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
