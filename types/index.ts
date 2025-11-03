/**
 * Core TypeScript types for Kids Games application
 */

export interface Letter {
  letter: string;           // The letter character
  name: string;             // Full name in native language
  phonetic: string;         // Phonetic/transliteration
  lowercase?: string;       // Lowercase variant (if applicable)
}

export interface LanguageConfig {
  id: string;               // 'hebrew', 'english', 'russian', 'arabic'
  name: string;             // 'Hebrew', 'English', 'Russian', 'Arabic'
  nativeName: string;       // 'עברית', 'English', 'Русский', 'العربية'
  letters: Letter[];        // All letters for this language
  colors: string[];         // Color for each letter
  lang: string;             // ISO 639-1 two-letter code ('he', 'en', 'ru', 'ar')
  dir: 'rtl' | 'ltr';       // Text direction
  voicePreferences?: string[]; // Preferred voice languages for speech synthesis
  fallbackLanguage?: string;   // Fallback language if no voice available
  usePhoneticForSpeech?: boolean; // Use phonetic instead of name for speech
  speechRate?: number;      // Speech speed (0.1-2.0, default 0.8)
  showBothCases?: boolean;  // Show both uppercase and lowercase (for English)
  instructions?: {          // Game instructions in the game's language
    findLetter: string;     // "Find the letter" / "מצא את האות"
    shuffled: string;       // "Letters shuffled" / "האותיות מעורבבות"
    unshuffled: string;     // "Back to normal order" / "חזרה לסדר רגיל"
  };
}

export type GameMode = 'learn' | 'find';

export interface GameState {
  mode: GameMode;
  isShuffled: boolean;
  currentTarget: Letter | null;
  correctCount: number;
  wrongCount: number;
  currentLetters: Letter[];
}

export interface GameConfig {
  id: string;               // 'hebrew', 'english', 'tic-tac-toe', etc.
  title: string;            // Translation key for title (e.g., 'games.titles.hebrew')
  icon: string;             // Emoji or text icon
  category: string;         // 'languages', 'board', 'math', 'brain'
  active: boolean;          // Is game playable?
  path?: string;            // Optional custom path
}

export interface CategoryConfig {
  id: string;               // 'languages', 'board', 'math', 'brain'
  title: string;            // Translation key for title (e.g., 'categories.languages.title')
  icon: string;             // Emoji icon
}

export type UILocale = 'he' | 'en' | 'ru' | 'ar';

export interface SpeechSynthesisHook {
  speak: (text: string, localeOverride?: string) => void;
  isReady: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
}

export interface GameStateHook {
  mode: GameMode;
  isShuffled: boolean;
  currentTarget: Letter | null;
  correctCount: number;
  wrongCount: number;
  currentLetters: Letter[];
  changeMode: (mode: GameMode) => void;
  toggleShuffle: () => void;
  nextChallenge: () => void;
  handleCorrect: () => void;
  handleWrong: () => void;
}

export interface DrawingCanvasHook {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  startDrawing: (e: React.MouseEvent | React.TouchEvent) => void;
  draw: (e: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
  clearCanvas: () => void;
  downloadDrawing: () => void;
}

// Math game types
export type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type MathDifficulty = 'easy' | 'medium' | 'hard';
export type MathGameMode = 'practice' | 'timed' | 'challenge';

export interface MathQuestion {
  operand1: number;
  operand2: number;
  operation: MathOperation;
  correctAnswer: number;
  displayText: string;
}

export interface MathGameStats {
  correct: number;
  wrong: number;
  streak: number;
  bestStreak: number;
  totalQuestions: number;
  accuracy: number;
}

export interface NumberRange {
  min: number;
  max: number;
}

export interface OperationConfig {
  id: MathOperation;
  symbol: string;
  emoji: string;
  generateQuestion: (difficulty: MathDifficulty) => MathQuestion;
  validate: (question: MathQuestion, answer: number) => boolean;
  numberRange: {
    easy: NumberRange;
    medium: NumberRange;
    hard: NumberRange;
  };
}
