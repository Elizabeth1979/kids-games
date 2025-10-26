const letters = [
    {letter: 'А', lowercase: 'а', name: 'А', phonetic: 'ah'},
    {letter: 'Б', lowercase: 'б', name: 'Бэ', phonetic: 'beh'},
    {letter: 'В', lowercase: 'в', name: 'Вэ', phonetic: 'veh'},
    {letter: 'Г', lowercase: 'г', name: 'Гэ', phonetic: 'geh'},
    {letter: 'Д', lowercase: 'д', name: 'Дэ', phonetic: 'deh'},
    {letter: 'Е', lowercase: 'е', name: 'Е', phonetic: 'yeh'},
    {letter: 'Ё', lowercase: 'ё', name: 'Ё', phonetic: 'yo'},
    {letter: 'Ж', lowercase: 'ж', name: 'Жэ', phonetic: 'zheh'},
    {letter: 'З', lowercase: 'з', name: 'Зэ', phonetic: 'zeh'},
    {letter: 'И', lowercase: 'и', name: 'И', phonetic: 'ee'},
    {letter: 'Й', lowercase: 'й', name: 'И краткое', phonetic: 'ee kratkoye'},
    {letter: 'К', lowercase: 'к', name: 'Ка', phonetic: 'kah'},
    {letter: 'Л', lowercase: 'л', name: 'Эл', phonetic: 'el'},
    {letter: 'М', lowercase: 'м', name: 'Эм', phonetic: 'em'},
    {letter: 'Н', lowercase: 'н', name: 'Эн', phonetic: 'en'},
    {letter: 'О', lowercase: 'о', name: 'О', phonetic: 'oh'},
    {letter: 'П', lowercase: 'п', name: 'Пэ', phonetic: 'peh'},
    {letter: 'Р', lowercase: 'р', name: 'Эр', phonetic: 'er'},
    {letter: 'С', lowercase: 'с', name: 'Эс', phonetic: 'es'},
    {letter: 'Т', lowercase: 'т', name: 'Тэ', phonetic: 'teh'},
    {letter: 'У', lowercase: 'у', name: 'У', phonetic: 'oo'},
    {letter: 'Ф', lowercase: 'ф', name: 'Эф', phonetic: 'ef'},
    {letter: 'Х', lowercase: 'х', name: 'Ха', phonetic: 'kha'},
    {letter: 'Ц', lowercase: 'ц', name: 'Цэ', phonetic: 'tseh'},
    {letter: 'Ч', lowercase: 'ч', name: 'Че', phonetic: 'cheh'},
    {letter: 'Ш', lowercase: 'ш', name: 'Ша', phonetic: 'shah'},
    {letter: 'Щ', lowercase: 'щ', name: 'Ща', phonetic: 'shcha'},
    {letter: 'Ъ', lowercase: 'ъ', name: 'Твёрдый знак', phonetic: 'tvyordiy znak'},
    {letter: 'Ы', lowercase: 'ы', name: 'Ы', phonetic: 'ih'},
    {letter: 'Ь', lowercase: 'ь', name: 'Мягкий знак', phonetic: 'myagkiy znak'},
    {letter: 'Э', lowercase: 'э', name: 'Э', phonetic: 'eh'},
    {letter: 'Ю', lowercase: 'ю', name: 'Ю', phonetic: 'yoo'},
    {letter: 'Я', lowercase: 'я', name: 'Я', phonetic: 'yah'}
];

const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FFB6C1', '#87CEEB', '#DDA15E', '#B4A7D6', '#F4A261',
    '#E76F51', '#2A9D8F', '#E9C46A', '#F07167', '#00B4D8',
    '#90E0EF', '#CAF0F8', '#FF8FA3', '#C9ADA7', '#A8DADC',
    '#F1FAEE', '#E63946', '#FFD93D', '#6BCF7F', '#A78BFA',
    '#FB923C', '#F472B6', '#FBBF24'
];

// Initialize the game
const game = new LanguageGame({
    letters: letters,
    colors: colors,
    language: 'ru-RU',
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
