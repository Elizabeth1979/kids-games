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

  return (
    <Link href={`/game/${game.id}`} className="group block">
      <BaseGameCard variant="default">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
          {game.icon}
        </div>
        <h3 className="text-2xl font-bold text-card-foreground mb-2">
          {t(game.title)}
        </h3>
      </BaseGameCard>
    </Link>
  );
}
