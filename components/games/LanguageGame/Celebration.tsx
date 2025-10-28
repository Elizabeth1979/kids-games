'use client';

import { useState, useEffect } from 'react';

interface CelebrationProps {
  show: boolean;
}

export default function Celebration({ show }: CelebrationProps) {
  const [emoji, setEmoji] = useState('🎉');

  useEffect(() => {
    if (show) {
      const emojis = ['🎉', '⭐', '🌟', '✨', '🎊'];
      setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="text-9xl animate-bounce">
        {emoji}
      </div>
    </div>
  );
}
