'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageConfig, Letter, UILocale } from '@/types';
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
  const uiLocale = useLocale() as UILocale;
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
      // Use UI locale for instruction, then game language for letter name
      const instruction = t('instructions.findLetter');
      speak(instruction, uiLocale);

      // Capture current target to avoid null reference in timeout
      const currentTarget = gameState.currentTarget;
      // Speak the letter name in the game's language after a brief pause
      setTimeout(() => {
        if (currentTarget) {
          const letterName = languageConfig.usePhoneticForSpeech
            ? currentTarget.phonetic
            : currentTarget.name;
          speak(letterName);
        }
      }, 1000);
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
        // Use UI locale for feedback, not game language
        speak(t('feedback.correct'), uiLocale);

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
        // Use UI locale for feedback, not game language
        speak(t('feedback.wrong'), uiLocale);

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
    // Use UI locale for shuffle notifications
    const shuffledText = t('shuffle.shuffled');
    const unshuffledText = t('shuffle.unshuffled');
    // Speak the NEW state after toggling
    speak(gameState.isShuffled ? unshuffledText : shuffledText, uiLocale);
  };

  // Determine if UI is RTL
  const isRTL = ['he', 'ar'].includes(uiLocale);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-foreground hover:text-muted-foreground transition-colors text-lg"
        >
          <span>{isRTL ? '→' : '←'}</span>
          <span>{t('instructions.back', { default: 'חזרה' })}</span>
        </Link>

        {/* Title */}
        <h1 className="text-foreground text-4xl md:text-6xl font-bold text-center mb-6 drop-shadow-lg">
          {t(`titles.${languageConfig.id}`)}
        </h1>

        {/* Mode Selector */}
        <ModeSelector
          currentMode={gameState.mode}
          onModeChange={handleModeChange}
          isShuffled={gameState.isShuffled}
          onToggleShuffle={handleToggleShuffle}
        />

        {/* Permanent Instruction */}
        <div className="bg-card rounded-2xl p-4 text-center text-lg font-bold text-foreground mb-4 shadow-md border-2">
          {t('instructions.permanent')}
        </div>

        {/* Find Mode Instruction */}
        {gameState.mode === 'find' && gameState.currentTarget && (
          <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-5 text-center text-2xl font-bold shadow-lg border-2">
            <span className="inline-block">{t('instructions.findLetter')}</span>{' '}
            <span className="text-accent text-3xl inline-block mx-2" lang={languageConfig.lang} dir={languageConfig.dir}>{gameState.currentTarget.letter}</span>
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
