'use client';

import { GameConfig } from '@/types';
import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';

interface GameCardProps {
  game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group block">
      <Card className="rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300
                       hover:scale-105 hover:-translate-y-2 cursor-pointer
                       border-4 border-transparent hover:border-accent
                       bg-card hover:bg-accent/10">
        <CardContent className="p-0">
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              {game.icon}
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-2">
              {game.title}
            </h3>
            <p className="text-muted-foreground">
              {game.description}
            </p>
            {game.subtitle && (
              <div className="mt-3 text-sm text-accent font-semibold">
                {game.subtitle}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
