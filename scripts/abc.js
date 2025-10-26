const letters = [
    {letter: 'A', lowercase: 'a', name: 'A', phonetic: 'ay'},
    {letter: 'B', lowercase: 'b', name: 'B', phonetic: 'bee'},
    {letter: 'C', lowercase: 'c', name: 'C', phonetic: 'see'},
    {letter: 'D', lowercase: 'd', name: 'D', phonetic: 'dee'},
    {letter: 'E', lowercase: 'e', name: 'E', phonetic: 'ee'},
    {letter: 'F', lowercase: 'f', name: 'F', phonetic: 'ef'},
    {letter: 'G', lowercase: 'g', name: 'G', phonetic: 'jee'},
    {letter: 'H', lowercase: 'h', name: 'H', phonetic: 'aitch'},
    {letter: 'I', lowercase: 'i', name: 'I', phonetic: 'eye'},
    {letter: 'J', lowercase: 'j', name: 'J', phonetic: 'jay'},
    {letter: 'K', lowercase: 'k', name: 'K', phonetic: 'kay'},
    {letter: 'L', lowercase: 'l', name: 'L', phonetic: 'el'},
    {letter: 'M', lowercase: 'm', name: 'M', phonetic: 'em'},
    {letter: 'N', lowercase: 'n', name: 'N', phonetic: 'en'},
    {letter: 'O', lowercase: 'o', name: 'O', phonetic: 'oh'},
    {letter: 'P', lowercase: 'p', name: 'P', phonetic: 'pee'},
    {letter: 'Q', lowercase: 'q', name: 'Q', phonetic: 'cue'},
    {letter: 'R', lowercase: 'r', name: 'R', phonetic: 'are'},
    {letter: 'S', lowercase: 's', name: 'S', phonetic: 'ess'},
    {letter: 'T', lowercase: 't', name: 'T', phonetic: 'tee'},
    {letter: 'U', lowercase: 'u', name: 'U', phonetic: 'you'},
    {letter: 'V', lowercase: 'v', name: 'V', phonetic: 'vee'},
    {letter: 'W', lowercase: 'w', name: 'W', phonetic: 'double-you'},
    {letter: 'X', lowercase: 'x', name: 'X', phonetic: 'ex'},
    {letter: 'Y', lowercase: 'y', name: 'Y', phonetic: 'why'},
    {letter: 'Z', lowercase: 'z', name: 'Z', phonetic: 'zee'}
];

const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FFB6C1', '#87CEEB', '#DDA15E', '#B4A7D6', '#F4A261',
    '#E76F51', '#2A9D8F', '#E9C46A', '#F07167', '#00B4D8',
    '#90E0EF', '#CAF0F8', '#FF8FA3', '#C9ADA7', '#A8DADC',
    '#F1FAEE'
];

// Initialize the game
const game = new LanguageGame({
    letters: letters,
    colors: colors,
    language: 'en-US',
    uiTexts: {
        shuffled: 'האותיות מעורבבות',
        unshuffled: 'חזרה לסדר רגיל',
        findLetter: 'מצא את האות',
        correct: 'כל הכבוד! נכון!',
        wrong: 'נסה שוב'
    },
    gridClass: 'letter-grid',
    letterDisplayFn: (item) => `${item.letter} ${item.lowercase}`
});
