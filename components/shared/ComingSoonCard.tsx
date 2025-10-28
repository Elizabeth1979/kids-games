'use client';

import { GameConfig } from '@/types';

interface ComingSoonCardProps {
  game: GameConfig;
}

export default function ComingSoonCard({ game }: ComingSoonCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8
                    shadow-md opacity-75 border-4 border-gray-300">
      <div className="text-center">
        <div className="text-6xl mb-4 grayscale">
          {game.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">
          {game.title}
        </h3>
        <p className="text-gray-500">
          {game.description}
        </p>
        <div className="mt-4 inline-block bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-bold text-sm">
          {game.subtitle || 'בקרוב'}
        </div>
      </div>
    </div>
  );
}
