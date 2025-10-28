'use client';

import { GameConfig } from '@/types';
import { Link } from '@/i18n/routing';

interface GameCardProps {
  game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group block bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8
                 shadow-lg hover:shadow-2xl transition-all duration-300
                 hover:scale-105 hover:-translate-y-2 cursor-pointer
                 border-4 border-transparent hover:border-purple-300"
    >
      <div className="text-center">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
          {game.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {game.title}
        </h3>
        <p className="text-gray-600">
          {game.description}
        </p>
        {game.subtitle && (
          <div className="mt-3 text-sm text-purple-600 font-semibold">
            {game.subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
