'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageConfig, Letter } from '@/types';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useGameState } from '@/hooks/useGameState';
import ModeSelector from './ModeSelector';
import LetterGrid from './LetterGrid';
import ScoreBox from './ScoreBox';
import DrawingCanvas from './DrawingCanvas';
import Celebration from './Celebration';
import { Link } from '@/i18n/routing';

interface LanguageGameProps {
  languageConfig: LanguageConfig;
}

export default function LanguageGame({ languageConfig }: LanguageGameProps) {
  const t = useTranslations('games');
  const { speak } = useSpeechSynthesis(languageConfig);
  const gameState = useGameState(languageConfig.letters);

  const [showCelebration, setShowCelebration] = useState(false);
  const [correctLetter, setCorrectLetter] = useState<Letter | null>(null);
  const [wrongLetter, setWrongLetter] = useState<Letter | null>(null);

  const handleLetterClick = (letter: Letter) => {
    if (gameState.mode === 'learn') {
      // Learn mode: just speak the letter
      const baseLang = languageConfig.lang.split('-')[0];
      const textToSpeak = languageConfig.usePhoneticForSpeech
        ? letter.phonetic
        : letter.name;
      speak(textToSpeak);
    } else if (gameState.mode === 'find') {
      // Find mode: check if correct
      if (letter.letter === gameState.currentTarget?.letter) {
        // Correct answer!
        gameState.handleCorrect();
        speak(t('feedback.correct'));

        setCorrectLetter(letter);
        setShowCelebration(true);

        setTimeout(() => {
          setCorrectLetter(null);
          setShowCelebration(false);
          gameState.nextChallenge();
        }, 1500);
      } else {
        // Wrong answer
        gameState.handleWrong();
        speak(t('feedback.wrong'));

        setWrongLetter(letter);
        setTimeout(() => {
          setWrongLetter(null);
        }, 600);
      }
    }
  };

  const handleModeChange = (mode: 'learn' | 'find') => {
    gameState.changeMode(mode);
    if (mode === 'find' && gameState.currentTarget) {
      // Speak the letter name/phonetic based on language config
      const textToSpeak = languageConfig.usePhoneticForSpeech
        ? gameState.currentTarget.phonetic
        : gameState.currentTarget.name;
      speak(textToSpeak);
    }
  };

  const handleToggleShuffle = () => {
    gameState.toggleShuffle();
    speak(gameState.isShuffled ? t('shuffle.unshuffled') : t('shuffle.shuffled'));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 p-4 md:p-8"
      lang={languageConfig.lang}
      dir={languageConfig.dir}
    >
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-block mb-6 text-white hover:text-white/80 transition-colors text-lg"
        >
          ← {t('instructions.back', { default: 'חזרה' })}
        </Link>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-6 drop-shadow-lg">
          🎨 {languageConfig.nativeName} 🎨
        </h1>

        {/* Mode Selector */}
        <ModeSelector
          currentMode={gameState.mode}
          onModeChange={handleModeChange}
          isShuffled={gameState.isShuffled}
          onToggleShuffle={handleToggleShuffle}
        />

        {/* Permanent Instruction */}
        <div className="bg-white/90 rounded-2xl p-4 text-center text-lg font-bold text-purple-600 mb-4 shadow-md border-2 border-purple-600">
          {t('instructions.permanent')}
        </div>

        {/* Find Mode Instruction */}
        {gameState.mode === 'find' && gameState.currentTarget && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl p-5 mb-5 text-center text-2xl font-bold shadow-lg border-3 border-white/30">
            {t('instructions.findLetter')} <span className="text-yellow-300 text-3xl mx-2">{gameState.currentTarget.letter}</span>
          </div>
        )}

        {/* Score Box */}
        <ScoreBox
          show={gameState.mode === 'find'}
          correct={gameState.correctCount}
          wrong={gameState.wrongCount}
        />

        {/* Letter Grid */}
        <LetterGrid
          letters={gameState.currentLetters}
          languageConfig={languageConfig}
          onLetterClick={handleLetterClick}
          correctLetter={correctLetter}
          wrongLetter={wrongLetter}
        />

        {/* Drawing Canvas */}
        <DrawingCanvas />

        {/* Celebration */}
        <Celebration show={showCelebration} />
      </div>
    </div>
  );
}
