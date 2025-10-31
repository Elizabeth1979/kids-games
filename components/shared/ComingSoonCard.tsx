'use client';

import { GameConfig } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface ComingSoonCardProps {
  game: GameConfig;
}

export default function ComingSoonCard({ game }: ComingSoonCardProps) {
  return (
    <Card className="rounded-3xl p-8 shadow-md opacity-75 border-4 border-muted bg-muted">
      <CardContent className="p-0">
        <div className="text-center">
          <div className="text-6xl mb-4 grayscale">
            {game.icon}
          </div>
          <h3 className="text-2xl font-bold text-muted-foreground mb-2">
            {game.title}
          </h3>
          <p className="text-muted-foreground/80">
            {game.description}
          </p>
          <div className="mt-4 inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm">
            {game.subtitle || 'בקרוב'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
