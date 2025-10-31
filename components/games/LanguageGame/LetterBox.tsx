'use client';

import { Letter } from '@/types';
import { useState } from 'react';

interface LetterBoxProps {
  letter: Letter;
  color: string;
  onClick: () => void;
  showBothCases?: boolean;
  showCorrect?: boolean;
  showWrong?: boolean;
}

export default function LetterBox({
  letter,
  color,
  onClick,
  showBothCases = false,
  showCorrect = false,
  showWrong = false
}: LetterBoxProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 300);
  };

  const display = showBothCases && letter.lowercase
    ? `${letter.letter}${letter.lowercase}`
    : letter.letter;

  return (
    <button
      onClick={handleClick}
      className={`
        aspect-square rounded-2xl flex flex-col items-center justify-center
        font-bold cursor-pointer transition-all duration-300
        shadow-lg hover:shadow-xl border-4
        ${isPressed ? 'scale-110' : 'scale-100'}
        ${showCorrect ? 'border-primary bg-accent animate-bounce' : ''}
        ${showWrong ? 'border-destructive bg-destructive/10 animate-shake' : ''}
        ${!showCorrect && !showWrong ? 'border-transparent hover:scale-105' : ''}
      `}
      style={{
        backgroundColor: !showCorrect && !showWrong ? color : undefined
      }}
    >
      <div className="text-4xl md:text-5xl">
        {display}
      </div>
      {letter.phonetic && (
        <div className="text-sm md:text-base text-muted-foreground mt-1">
          {letter.phonetic}
        </div>
      )}
    </button>
  );
}
