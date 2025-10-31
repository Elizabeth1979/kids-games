'use client';

import { GameConfig } from '@/types';
import { useTranslations } from 'next-intl';
import BaseGameCard from './BaseGameCard';

interface ComingSoonCardProps {
  game: GameConfig;
}

export default function ComingSoonCard({ game }: ComingSoonCardProps) {
  const t = useTranslations();

  return (
    <BaseGameCard variant="coming-soon">
      <div className="text-6xl mb-4 grayscale">
        {game.icon}
      </div>
      <h3 className="text-2xl font-bold text-muted-foreground">
        {t(game.title)}
      </h3>
    </BaseGameCard>
  );
}
