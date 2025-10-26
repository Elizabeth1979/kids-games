/**
 * Shared Language Learning Game Module
 * Handles common functionality for all alphabet learning games
 */

class LanguageGame {
    constructor(config) {
        this.letters = config.letters;
        this.colors = config.colors;
        this.language = config.language; // Language code for speech (e.g., 'ar-SA', 'en-US', 'he-IL', 'ru-RU')
        this.uiTexts = config.uiTexts; // UI text translations
        this.gridClass = config.gridClass || 'letter-grid'; // CSS class for grid
        this.letterDisplayFn = config.letterDisplayFn || this.defaultLetterDisplay.bind(this);

        this.currentMode = 'learn';
        this.currentTarget = null;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.currentLetters = [...this.letters];
        this.isShuffled = false;

        // Speech synthesis variables
        this.voices = [];
        this.selectedVoice = null;
        this.speechInitialized = false;
        this.voicesLoaded = false;

        // Canvas variables
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.init();
    }

    init() {
        // Get DOM elements
        this.grid = document.getElementById('grid');
        this.instruction = document.getElementById('instruction');
        this.scoreBox = document.getElementById('scoreBox');
        this.celebration = document.getElementById('celebration');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.colorPicker = document.getElementById('colorPicker');
        this.brushSize = document.getElementById('brushSize');
        this.sizeDisplay = document.getElementById('sizeDisplay');

        // Initialize speech
        this.loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
        setTimeout(() => this.loadVoices(), 100);
        setTimeout(() => this.loadVoices(), 500);
        setTimeout(() => this.loadVoices(), 1000);

        // Setup canvas
        this.setupCanvas();

        // Create initial grid
        this.createGrid();
    }

    loadVoices() {
        this.voices = speechSynthesis.getVoices();

        if (this.voices.length > 0) {
            this.voicesLoaded = true;

            // Extract base language code (e.g., 'ar' from 'ar-SA')
            const baseLang = this.language.split('-')[0];

            // Try to find a voice for this language
            this.selectedVoice = this.voices.find(voice =>
                voice.lang.startsWith(baseLang) ||
                voice.name.toLowerCase().includes(baseLang)
            );

            // Fallback to Google voices
            if (!this.selectedVoice) {
                this.selectedVoice = this.voices.find(voice =>
                    voice.name.toLowerCase().includes('google')
                );
            }

            // Final fallback to default voice
            if (!this.selectedVoice) {
                this.selectedVoice = this.voices.find(voice => voice.default) || this.voices[0];
            }
        }

        return this.voicesLoaded;
    }

    initializeSpeech() {
        if (!this.speechInitialized) {
            this.loadVoices();
            this.speechInitialized = true;
        }
    }

    speak(text) {
        this.initializeSpeech();

        if (!window.speechSynthesis) return;

        if (this.voices.length === 0) {
            this.loadVoices();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.language;
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        try {
            speechSynthesis.speak(utterance);
        } catch (error) {
            // Silently fail
        }
    }

    setupCanvas() {
        const resizeCanvas = () => {
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => this.startDrawing(e));
        this.canvas.addEventListener('touchmove', (e) => this.draw(e));
        this.canvas.addEventListener('touchend', () => this.stopDrawing());

        // Brush size display
        this.brushSize.addEventListener('input', (e) => {
            this.sizeDisplay.textContent = e.target.value;
        });
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        this.lastX = x * (this.canvas.width / rect.width);
        this.lastY = y * (this.canvas.height / rect.height);
    }

    draw(e) {
        if (!this.isDrawing) return;
        e.preventDefault();

        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        const canvasX = x * (this.canvas.width / rect.width);
        const canvasY = y * (this.canvas.height / rect.height);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.strokeStyle = this.colorPicker.value;
        this.ctx.lineWidth = this.brushSize.value;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();

        this.lastX = canvasX;
        this.lastY = canvasY;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    downloadDrawing() {
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;

        if (this.isShuffled) {
            this.currentLetters = this.shuffleArray(this.letters);
            this.shuffleBtn.style.background = '#FF9800';
            this.shuffleBtn.style.color = 'white';
            this.speak(this.uiTexts.shuffled);
        } else {
            this.currentLetters = [...this.letters];
            this.shuffleBtn.style.background = '';
            this.shuffleBtn.style.color = '';
            this.speak(this.uiTexts.unshuffled);
        }

        this.createGrid();
    }

    defaultLetterDisplay(item) {
        return item.letter;
    }

    createGrid() {
        this.grid.innerHTML = '';
        this.grid.className = this.gridClass;

        this.currentLetters.forEach((item) => {
            const box = document.createElement('div');
            box.className = 'letter-box';

            const letterSpan = document.createElement('div');
            letterSpan.className = 'letter';
            letterSpan.innerHTML = this.letterDisplayFn(item);

            const phoneticSpan = document.createElement('div');
            phoneticSpan.className = 'phonetic';
            phoneticSpan.textContent = item.phonetic;

            box.appendChild(letterSpan);
            box.appendChild(phoneticSpan);

            box.style.backgroundColor = this.colors[this.letters.indexOf(item)];
            box.onclick = (e) => this.handleLetterClick(item, e);
            this.grid.appendChild(box);
        });
    }

    setMode(mode, e) {
        this.currentMode = mode;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.updateScore();

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
            this.instruction.style.display = 'none';
            this.scoreBox.classList.remove('show');
        } else if (mode === 'find') {
            this.instruction.style.display = 'flex';
            this.scoreBox.classList.add('show');
            this.nextFindChallenge();
        }
    }

    nextFindChallenge() {
        this.currentTarget = this.letters[Math.floor(Math.random() * this.letters.length)];
        this.instruction.innerHTML = `${this.uiTexts.findLetter} <span style="color: #FFD93D; font-size: 1.3em; margin-right: 10px;">${this.currentTarget.letter}</span>`;
        this.speak(this.uiTexts.findLetter + ' ' + this.currentTarget.name);
    }

    handleLetterClick(item, e) {
        if (this.currentMode === 'learn') {
            this.speak(item.name);
            const box = e.currentTarget;
            box.style.transform = 'scale(1.2)';
            setTimeout(() => {
                box.style.transform = '';
            }, 300);
        } else if (this.currentMode === 'find') {
            if (item.letter === this.currentTarget.letter) {
                this.handleCorrect(e);
            } else {
                this.handleWrong(e);
            }
        }
    }

    handleCorrect(e) {
        this.correctCount++;
        this.updateScore();
        this.speak(this.uiTexts.correct);

        const box = e.currentTarget;
        box.classList.add('correct');

        this.celebration.textContent = ['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)];
        this.celebration.style.display = 'block';

        setTimeout(() => {
            this.celebration.style.display = 'none';
            box.classList.remove('correct');
            this.nextFindChallenge();
        }, 1500);
    }

    handleWrong(e) {
        this.wrongCount++;
        this.updateScore();
        this.speak(this.uiTexts.wrong);

        const box = e.currentTarget;
        box.classList.add('wrong');

        setTimeout(() => {
            box.classList.remove('wrong');
        }, 600);
    }

    updateScore() {
        document.getElementById('correct').textContent = this.correctCount;
        document.getElementById('wrong').textContent = this.wrongCount;
    }
}

// Export for use in individual game files
window.LanguageGame = LanguageGame;
