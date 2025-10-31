'use client';

import { useState, useEffect } from 'react';

interface CelebrationProps {
  show: boolean;
}

export default function Celebration({ show }: CelebrationProps) {
  const [text, setText] = useState('!');

  useEffect(() => {
    if (show) {
      const celebrationTexts = ['!', '*', '+', 'V'];
      setText(celebrationTexts[Math.floor(Math.random() * celebrationTexts.length)]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="text-9xl animate-bounce text-accent font-bold">
        {text}
      </div>
    </div>
  );
}
