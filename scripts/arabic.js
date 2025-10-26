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

let currentMode = 'learn';
let currentTarget = null;
let correctCount = 0;
let wrongCount = 0;
let currentLetters = [...letters];
let isShuffled = false;

const grid = document.getElementById('grid');
const instruction = document.getElementById('instruction');
const scoreBox = document.getElementById('scoreBox');
const celebration = document.getElementById('celebration');
const shuffleBtn = document.getElementById('shuffleBtn');

// Speech synthesis variables for mobile compatibility
let voices = [];
let arabicVoice = null;
let speechInitialized = false;
let voicesLoaded = false;

// Load voices for mobile compatibility
function loadVoices() {
    voices = speechSynthesis.getVoices();

    if (voices.length > 0) {
        voicesLoaded = true;

        // Try to find an Arabic voice (ar, ar-SA, ar-EG, etc.)
        arabicVoice = voices.find(voice =>
            voice.lang.startsWith('ar') ||
            voice.name.toLowerCase().includes('arabic')
        );

        // If no Arabic voice, try to find any voice that works with Arabic text
        // Google voices and default voices usually support multiple languages
        if (!arabicVoice) {
            // Look for Google voices (they support many languages)
            arabicVoice = voices.find(voice =>
                voice.name.toLowerCase().includes('google')
            );
        }

        // If still nothing, use the default voice (first in the list or marked as default)
        if (!arabicVoice) {
            arabicVoice = voices.find(voice => voice.default) || voices[0];
        }
    }

    return voicesLoaded;
}

// Load voices immediately and also on voiceschanged event (for mobile)
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Android specific: Try loading voices multiple times with increasing delays
setTimeout(loadVoices, 100);
setTimeout(loadVoices, 500);
setTimeout(loadVoices, 1000);

// Initialize speech synthesis on first user interaction (required for mobile)
function initializeSpeech() {
    if (!speechInitialized) {
        // Android fix: Force reload voices
        loadVoices();
        speechInitialized = true;
    }
}

// Canvas setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const sizeDisplay = document.getElementById('sizeDisplay');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set canvas size
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    lastX = x * (canvas.width / rect.width);
    lastY = y * (canvas.height / rect.height);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    const canvasX = x * (canvas.width / rect.width);
    const canvasY = y * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(canvasX, canvasY);
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastX = canvasX;
    lastY = canvasY;
}

function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

brushSize.addEventListener('input', (e) => {
    sizeDisplay.textContent = e.target.value;
});

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadDrawing() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function toggleShuffle() {
    isShuffled = !isShuffled;

    if (isShuffled) {
        currentLetters = shuffleArray(letters);
        shuffleBtn.style.background = '#FF9800';
        shuffleBtn.style.color = 'white';
        speak('האותיות מעורבבות');
    } else {
        currentLetters = [...letters];
        shuffleBtn.style.background = '';
        shuffleBtn.style.color = '';
        speak('חזרה לסדר רגיל');
    }

    createGrid();
}

function createGrid() {
    grid.innerHTML = '';
    currentLetters.forEach((item) => {
        const box = document.createElement('div');
        box.className = 'letter-box';

        const letterSpan = document.createElement('div');
        letterSpan.className = 'arabic-letter';
        letterSpan.textContent = item.letter;

        const phoneticSpan = document.createElement('div');
        phoneticSpan.className = 'phonetic';
        phoneticSpan.textContent = item.phonetic;

        box.appendChild(letterSpan);
        box.appendChild(phoneticSpan);

        box.style.backgroundColor = colors[letters.indexOf(item)];
        box.onclick = (e) => handleLetterClick(item, e);
        grid.appendChild(box);
    });
}

function speak(text) {
    // Initialize speech on first call (important for mobile)
    initializeSpeech();

    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
        return;
    }

    // Reload voices if empty (Android sometimes clears them)
    if (voices.length === 0) {
        loadVoices();
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Use selected voice if available
    if (arabicVoice) {
        utterance.voice = arabicVoice;
    }

    // Speak
    try {
        speechSynthesis.speak(utterance);
    } catch (error) {
        // Silently fail
    }
}

function setMode(mode, e) {
    currentMode = mode;
    correctCount = 0;
    wrongCount = 0;
    updateScore();

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (e && e.target) {
        e.target.classList.add('active');
    }

    document.querySelectorAll('.letter-box').forEach(box => {
        box.classList.remove('correct', 'wrong', 'highlight');
    });

    if (mode === 'learn') {
        instruction.style.display = 'none';
        scoreBox.classList.remove('show');
    } else if (mode === 'find') {
        instruction.style.display = 'flex';
        scoreBox.classList.add('show');
        nextFindChallenge();
    }
}

function nextFindChallenge() {
    currentTarget = letters[Math.floor(Math.random() * letters.length)];
    instruction.innerHTML = `מצא את האות <span style="color: #FFD93D; font-size: 1.3em; margin-right: 10px;">${currentTarget.letter}</span>`;
    speak('מצא את האות ' + currentTarget.name);
}

function handleLetterClick(item, e) {
    if (currentMode === 'learn') {
        speak(item.name);
        const box = e.currentTarget;
        box.style.transform = 'scale(1.2)';
        setTimeout(() => {
            box.style.transform = '';
        }, 300);
    } else if (currentMode === 'find') {
        if (item.letter === currentTarget.letter) {
            handleCorrect(e);
        } else {
            handleWrong(e);
        }
    }
}

function handleCorrect(e) {
    correctCount++;
    updateScore();
    speak('כל הכבוד! נכון!');

    const box = e.currentTarget;
    box.classList.add('correct');

    celebration.textContent = ['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)];
    celebration.style.display = 'block';

    setTimeout(() => {
        celebration.style.display = 'none';
        box.classList.remove('correct');
        nextFindChallenge();
    }, 1500);
}

function handleWrong(e) {
    wrongCount++;
    updateScore();
    speak('נסה שוב');

    const box = e.currentTarget;
    box.classList.add('wrong');

    setTimeout(() => {
        box.classList.remove('wrong');
    }, 600);
}

function updateScore() {
    document.getElementById('correct').textContent = correctCount;
    document.getElementById('wrong').textContent = wrongCount;
}

createGrid();
