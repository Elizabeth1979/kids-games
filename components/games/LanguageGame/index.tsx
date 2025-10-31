'use client';

import { useState, useEffect, useRef } from 'react';
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
  const isInitialMount = useRef(true);

  // Speak the target letter whenever it changes in Find mode
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (gameState.mode === 'find' && gameState.currentTarget) {
      // Speak the full instruction in the game's language
      const letterName = languageConfig.usePhoneticForSpeech
        ? gameState.currentTarget.phonetic
        : gameState.currentTarget.name;
      const instruction = languageConfig.instructions?.findLetter || t('instructions.findLetter');
      const fullText = `${instruction} ${letterName}`;
      speak(fullText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentTarget, gameState.mode]);

  const handleLetterClick = (letter: Letter) => {
    if (gameState.mode === 'learn') {
      // Learn mode: just speak the letter
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
    // Speech is now handled by useEffect that watches currentTarget
  };

  const handleToggleShuffle = () => {
    gameState.toggleShuffle();
    // Use game language instructions if available, fallback to UI language
    const shuffledText = languageConfig.instructions?.shuffled || t('shuffle.shuffled');
    const unshuffledText = languageConfig.instructions?.unshuffled || t('shuffle.unshuffled');
    speak(gameState.isShuffled ? unshuffledText : shuffledText);
  };

  return (
    <div
      className="min-h-screen bg-background p-4 md:p-8"
      lang={languageConfig.lang}
      dir={languageConfig.dir}
    >
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-block mb-6 text-foreground hover:text-muted-foreground transition-colors text-lg"
        >
          ← {t('instructions.back', { default: 'חזרה' })}
        </Link>

        {/* Title */}
        <h1 className="text-foreground text-4xl md:text-6xl font-bold text-center mb-6 drop-shadow-lg">
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
