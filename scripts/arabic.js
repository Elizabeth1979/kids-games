const letters = [
    {letter: 'ا', name: 'ألف', phonetic: 'Alif'},
    {letter: 'ب', name: 'باء', phonetic: 'Ba'},
    {letter: 'ت', name: 'تاء', phonetic: 'Ta'},
    {letter: 'ث', name: 'ثاء', phonetic: 'Tha'},
    {letter: 'ج', name: 'جيم', phonetic: 'Jeem'},
    {letter: 'ح', name: 'حاء', phonetic: 'Ha'},
    {letter: 'خ', name: 'خاء', phonetic: 'Kha'},
    {letter: 'د', name: 'دال', phonetic: 'Dal'},
    {letter: 'ذ', name: 'ذال', phonetic: 'Thal'},
    {letter: 'ر', name: 'راء', phonetic: 'Ra'},
    {letter: 'ز', name: 'زاي', phonetic: 'Zay'},
    {letter: 'س', name: 'سين', phonetic: 'Seen'},
    {letter: 'ش', name: 'شين', phonetic: 'Sheen'},
    {letter: 'ص', name: 'صاد', phonetic: 'Sad'},
    {letter: 'ض', name: 'ضاد', phonetic: 'Dad'},
    {letter: 'ط', name: 'طاء', phonetic: 'Ta'},
    {letter: 'ظ', name: 'ظاء', phonetic: 'Dha'},
    {letter: 'ع', name: 'عين', phonetic: 'Ayn'},
    {letter: 'غ', name: 'غين', phonetic: 'Ghayn'},
    {letter: 'ف', name: 'فاء', phonetic: 'Fa'},
    {letter: 'ق', name: 'قاف', phonetic: 'Qaf'},
    {letter: 'ك', name: 'كاف', phonetic: 'Kaf'},
    {letter: 'ل', name: 'لام', phonetic: 'Lam'},
    {letter: 'م', name: 'ميم', phonetic: 'Meem'},
    {letter: 'ن', name: 'نون', phonetic: 'Noon'},
    {letter: 'ه', name: 'هاء', phonetic: 'Ha'},
    {letter: 'و', name: 'واو', phonetic: 'Waw'},
    {letter: 'ي', name: 'ياء', phonetic: 'Ya'}
];

const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FFB6C1', '#87CEEB', '#DDA15E', '#B4A7D6', '#F4A261',
    '#E76F51', '#2A9D8F', '#E9C46A', '#F07167', '#00B4D8',
    '#90E0EF', '#CAF0F8', '#FF8FA3', '#C9ADA7', '#A8DADC',
    '#F1FAEE', '#E63946', '#FFD93D'
];

// Initialize the game
const game = new LanguageGame({
    letters: letters,
    colors: colors,
    language: 'ar-SA',
    uiTexts: {
        shuffled: 'האותיות מעורבבות',
        unshuffled: 'חזרה לסדר רגיל',
        findLetter: 'מצא את האות',
        correct: 'כל הכבוד! נכון!',
        wrong: 'נסה שוב'
    },
    gridClass: 'letter-grid',
    letterDisplayFn: (item) => item.letter
});
