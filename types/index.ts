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
  title: string;            // Display title (in Hebrew for now)
  icon: string;             // Emoji or text icon
  description: string;      // Short description
  subtitle?: string;        // Additional info ('Coming Soon', etc.)
  category: string;         // 'languages', 'board', 'math', 'brain'
  active: boolean;          // Is game playable?
  path?: string;            // Optional custom path
}

export interface CategoryConfig {
  id: string;               // 'languages', 'board', 'math', 'brain'
  title: string;            // Display title
  icon: string;             // Emoji icon
  description: string;      // Short description
}

export type UILocale = 'he' | 'en' | 'ru' | 'ar';

export interface SpeechSynthesisHook {
  speak: (text: string) => void;
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
