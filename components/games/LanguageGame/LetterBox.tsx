'use client';

import { Letter } from '@/types';
import { useState } from 'react';

interface LetterBoxProps {
  letter: Letter;
  color: string;
  onClick: () => void;
  displayFn?: (letter: Letter) => string;
  showCorrect?: boolean;
  showWrong?: boolean;
}

export default function LetterBox({
  letter,
  color,
  onClick,
  displayFn,
  showCorrect = false,
  showWrong = false
}: LetterBoxProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 300);
  };

  const display = displayFn ? displayFn(letter) : letter.letter;

  return (
    <button
      onClick={handleClick}
      className={`
        aspect-square rounded-2xl flex flex-col items-center justify-center
        font-bold cursor-pointer transition-all duration-300
        shadow-lg hover:shadow-xl border-4
        ${isPressed ? 'scale-110' : 'scale-100'}
        ${showCorrect ? 'border-green-500 bg-green-50 animate-bounce' : ''}
        ${showWrong ? 'border-red-500 animate-shake' : ''}
        ${!showCorrect && !showWrong ? 'border-transparent hover:scale-105' : ''}
      `}
      style={{
        backgroundColor: showCorrect ? '#E8F5E9' : showWrong ? '#FFEBEE' : color
      }}
    >
      <div className="text-4xl md:text-5xl">
        {display}
      </div>
      {letter.phonetic && (
        <div className="text-sm md:text-base text-gray-600 mt-1">
          {letter.phonetic}
        </div>
      )}
    </button>
  );
}
