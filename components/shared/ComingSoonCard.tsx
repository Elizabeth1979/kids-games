'use client';

import { GameConfig } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface ComingSoonCardProps {
  game: GameConfig;
}

export default function ComingSoonCard({ game }: ComingSoonCardProps) {
  const t = useTranslations();

  return (
    <Card className="rounded-3xl p-8 shadow-md opacity-75 border-4 border-muted bg-muted">
      <CardContent className="p-0">
        <div className="text-center">
          <div className="text-6xl mb-4 grayscale">
            {game.icon}
          </div>
          <h3 className="text-2xl font-bold text-muted-foreground">
            {t(game.title)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
