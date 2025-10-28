import { LanguageConfig } from '@/types';

export const englishLanguage: LanguageConfig = {
  id: 'english',
  name: 'English',
  nativeName: 'English',
  lang: 'en-US',
  dir: 'ltr',
  instructions: {
    findLetter: 'Find the letter',
    shuffled: 'Letters shuffled',
    unshuffled: 'Back to normal order'
  },
  letters: [
    { letter: 'A', lowercase: 'a', name: 'a', phonetic: 'a' },
    { letter: 'B', lowercase: 'b', name: 'b', phonetic: 'b' },
    { letter: 'C', lowercase: 'c', name: 'c', phonetic: 'c' },
    { letter: 'D', lowercase: 'd', name: 'd', phonetic: 'd' },
    { letter: 'E', lowercase: 'e', name: 'e', phonetic: 'e' },
    { letter: 'F', lowercase: 'f', name: 'f', phonetic: 'f' },
    { letter: 'G', lowercase: 'g', name: 'g', phonetic: 'g' },
    { letter: 'H', lowercase: 'h', name: 'h', phonetic: 'h' },
    { letter: 'I', lowercase: 'i', name: 'i', phonetic: 'i' },
    { letter: 'J', lowercase: 'j', name: 'j', phonetic: 'j' },
    { letter: 'K', lowercase: 'k', name: 'k', phonetic: 'k' },
    { letter: 'L', lowercase: 'l', name: 'l', phonetic: 'l' },
    { letter: 'M', lowercase: 'm', name: 'm', phonetic: 'm' },
    { letter: 'N', lowercase: 'n', name: 'n', phonetic: 'n' },
    { letter: 'O', lowercase: 'o', name: 'o', phonetic: 'o' },
    { letter: 'P', lowercase: 'p', name: 'p', phonetic: 'p' },
    { letter: 'Q', lowercase: 'q', name: 'q', phonetic: 'q' },
    { letter: 'R', lowercase: 'r', name: 'r', phonetic: 'r' },
    { letter: 'S', lowercase: 's', name: 's', phonetic: 's' },
    { letter: 'T', lowercase: 't', name: 't', phonetic: 't' },
    { letter: 'U', lowercase: 'u', name: 'u', phonetic: 'u' },
    { letter: 'V', lowercase: 'v', name: 'v', phonetic: 'v' },
    { letter: 'W', lowercase: 'w', name: 'w', phonetic: 'w' },
    { letter: 'X', lowercase: 'x', name: 'x', phonetic: 'x' },
    { letter: 'Y', lowercase: 'y', name: 'y', phonetic: 'y' },
    { letter: 'Z', lowercase: 'z', name: 'z', phonetic: 'z' }
  ],
  colors: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FFB6C1', '#87CEEB', '#DDA15E', '#B4A7D6', '#F4A261',
    '#E76F51', '#2A9D8F', '#E9C46A', '#F07167', '#00B4D8',
    '#90E0EF', '#CAF0F8', '#FF8FA3', '#C9ADA7', '#A8DADC',
    '#F1FAEE'
  ],
  showBothCases: true
};
