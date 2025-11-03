'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled: boolean;
}

export default function AnswerInput({ onSubmit, disabled }: AnswerInputProps) {
  const t = useTranslations('math');
  const [inputValue, setInputValue] = useState('');

  // Clear input when disabled changes (new question)
  useEffect(() => {
    if (!disabled) {
      setInputValue('');
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || disabled) return;

    const answer = parseInt(inputValue, 10);
    if (!isNaN(answer)) {
      onSubmit(answer);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow negative numbers and empty string
    if (value === '' || value === '-' || /^-?\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border-4 border-border">
        <label htmlFor="answer" className="block text-2xl font-bold text-card-foreground mb-4 text-center">
          {t('yourAnswer')}
        </label>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <input
            id="answer"
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            autoFocus
            autoComplete="off"
            placeholder="?"
            className="flex-1 min-w-0 text-5xl md:text-6xl font-bold text-center p-4 rounded-2xl border-4 border-input focus:border-ring focus:outline-none disabled:bg-muted disabled:text-muted-foreground font-mono bg-background text-foreground"
          />

          <button
            type="submit"
            disabled={disabled || inputValue.trim() === ''}
            className="md:flex-shrink-0 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
          >
            {t('submit')}
          </button>
        </div>

        <p className="text-center text-muted-foreground mt-4 text-sm">
          {t('pressEnter')}
        </p>
      </div>
    </form>
  );
}
