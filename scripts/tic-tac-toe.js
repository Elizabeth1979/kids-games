// Tic-Tac-Toe Game - Kid vs Computer
// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X is player, O is computer
let gameActive = true;
let scores = {
    player: 0,
    computer: 0,
    tie: 0
};
let difficulty = 'medium'; // easy, medium, hard

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const tieScoreEl = document.getElementById('tieScore');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// Initialize game
function init() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScore);

    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.level;
            resetGame();
        });
    });

    updateScoreDisplay();
}

// Handle cell click
function handleCellClick(index) {
    if (!gameActive || board[index] !== '' || currentPlayer !== 'X') {
        return;
    }

    makeMove(index, 'X');

    if (gameActive) {
        // Computer's turn after a short delay
        setTimeout(() => {
            if (gameActive) {
                computerMove();
            }
        }, 500);
    }
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player === 'X' ? 'X' : 'O';
    cell.classList.add('taken', player === 'X' ? 'player' : 'computer');

    checkResult();
}

// Check game result
function checkResult() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        const winner = board[winningCombo[0]];
        gameActive = false;

        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });

        if (winner === 'X') {
            scores.player++;
            statusMessage.textContent = '🎉 כל הכבוד! ניצחת! 🎉';
            statusMessage.className = 'status-message win';
        } else {
            scores.computer++;
            statusMessage.textContent = '😔 המחשב ניצח. נסה שוב!';
            statusMessage.className = 'status-message lose';
        }

        updateScoreDisplay();
        return;
    }

    // Check for tie
    if (!board.includes('')) {
        gameActive = false;
        scores.tie++;
        statusMessage.textContent = '🤝 תיקו! משחק טוב!';
        statusMessage.className = 'status-message tie';
        updateScoreDisplay();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') {
        statusMessage.textContent = '🤖 תור המחשב...';
    } else {
        statusMessage.textContent = 'התור שלך! בחר משבצת';
    }
}

// Computer move logic
function computerMove() {
    let move;

    switch (difficulty) {
        case 'easy':
            move = getRandomMove();
            break;
        case 'medium':
            move = getMediumMove();
            break;
        case 'hard':
            move = getBestMove();
            break;
        default:
            move = getMediumMove();
    }

    if (move !== null) {
        makeMove(move, 'O');
    }
}

// Easy AI - Random move
function getRandomMove() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    if (availableMoves.length === 0) return null;
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Medium AI - Mix of strategy and random
function getMediumMove() {
    // 50% chance to play strategically, 50% random
    if (Math.random() < 0.5) {
        return getBestMove();
    }
    return getRandomMove();
}

// Hard AI - Minimax algorithm
function getBestMove() {
    // First, try to win
    const winMove = findWinningMove('O');
    if (winMove !== null) return winMove;

    // Second, block player from winning
    const blockMove = findWinningMove('X');
    if (blockMove !== null) return blockMove;

    // Third, take center if available
    if (board[4] === '') return 4;

    // Fourth, take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => board[index] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Finally, take any available spot
    return getRandomMove();
}

// Find winning move for a player
function findWinningMove(player) {
    for (let combo of winningConditions) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];

        if (values.filter(v => v === player).length === 2 && values.includes('')) {
            if (board[a] === '') return a;
            if (board[b] === '') return b;
            if (board[c] === '') return c;
        }
    }
    return null;
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });

    statusMessage.textContent = 'התור שלך! בחר משבצת';
    statusMessage.className = 'status-message';
}

// Reset score
function resetScore() {
    scores = {
        player: 0,
        computer: 0,
        tie: 0
    };
    updateScoreDisplay();
    resetGame();
}

// Update score display
function updateScoreDisplay() {
    playerScoreEl.textContent = scores.player;
    computerScoreEl.textContent = scores.computer;
    tieScoreEl.textContent = scores.tie;
}

// Initialize the game when page loads
init();
