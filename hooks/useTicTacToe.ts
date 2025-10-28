import { useState, useCallback, useEffect } from 'react';

export type Player = 'X' | 'O' | '';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'playerWon' | 'computerWon' | 'tie';

interface Scores {
  player: number;
  computer: number;
  tie: number;
}

interface TicTacToeHook {
  board: Player[];
  currentPlayer: Player;
  gameStatus: GameStatus;
  scores: Scores;
  difficulty: Difficulty;
  winningCells: number[] | null;
  handleCellClick: (index: number) => void;
  resetGame: () => void;
  resetScore: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

const WINNING_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function useTicTacToe(): TicTacToeHook {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [scores, setScores] = useState<Scores>({ player: 0, computer: 0, tie: 0 });
  const [difficulty, setDifficultyState] = useState<Difficulty>('medium');
  const [winningCells, setWinningCells] = useState<number[] | null>(null);
  const [computerThinking, setComputerThinking] = useState(false);

  // Check for winner or tie
  const checkGameResult = useCallback((currentBoard: Player[]): { status: GameStatus; winningCombo: number[] | null } => {
    // Check for winner
    for (const combo of WINNING_CONDITIONS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        const winner = currentBoard[a];
        return {
          status: winner === 'X' ? 'playerWon' : 'computerWon',
          winningCombo: combo
        };
      }
    }

    // Check for tie
    if (!currentBoard.includes('')) {
      return { status: 'tie', winningCombo: null };
    }

    return { status: 'playing', winningCombo: null };
  }, []);

  // Find winning move for a player
  const findWinningMove = useCallback((currentBoard: Player[], player: Player): number | null => {
    for (const combo of WINNING_CONDITIONS) {
      const [a, b, c] = combo;
      const values = [currentBoard[a], currentBoard[b], currentBoard[c]];

      if (values.filter(v => v === player).length === 2 && values.includes('')) {
        if (currentBoard[a] === '') return a;
        if (currentBoard[b] === '') return b;
        if (currentBoard[c] === '') return c;
      }
    }
    return null;
  }, []);

  // Get random available move
  const getRandomMove = useCallback((currentBoard: Player[]): number | null => {
    const availableMoves = currentBoard
      .map((cell, index) => cell === '' ? index : null)
      .filter((val): val is number => val !== null);

    if (availableMoves.length === 0) return null;
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }, []);

  // Get best move (hard AI)
  const getBestMove = useCallback((currentBoard: Player[]): number | null => {
    // Try to win
    const winMove = findWinningMove(currentBoard, 'O');
    if (winMove !== null) return winMove;

    // Block player from winning
    const blockMove = findWinningMove(currentBoard, 'X');
    if (blockMove !== null) return blockMove;

    // Take center if available
    if (currentBoard[4] === '') return 4;

    // Take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => currentBoard[index] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available spot
    return getRandomMove(currentBoard);
  }, [findWinningMove, getRandomMove]);

  // Get medium move (50% strategic, 50% random)
  const getMediumMove = useCallback((currentBoard: Player[]): number | null => {
    if (Math.random() < 0.5) {
      return getBestMove(currentBoard);
    }
    return getRandomMove(currentBoard);
  }, [getBestMove, getRandomMove]);

  // Computer move
  const computerMove = useCallback((currentBoard: Player[]) => {
    let move: number | null = null;

    switch (difficulty) {
      case 'easy':
        move = getRandomMove(currentBoard);
        break;
      case 'medium':
        move = getMediumMove(currentBoard);
        break;
      case 'hard':
        move = getBestMove(currentBoard);
        break;
    }

    if (move !== null) {
      const newBoard = [...currentBoard];
      newBoard[move] = 'O';
      setBoard(newBoard);
      setCurrentPlayer('X');

      // Check result after computer move
      const result = checkGameResult(newBoard);
      if (result.status !== 'playing') {
        setGameStatus(result.status);
        setWinningCells(result.winningCombo);

        // Update scores
        if (result.status === 'computerWon') {
          setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
        } else if (result.status === 'tie') {
          setScores(prev => ({ ...prev, tie: prev.tie + 1 }));
        }
      }
    }
    setComputerThinking(false);
  }, [difficulty, getRandomMove, getMediumMove, getBestMove, checkGameResult]);

  // Handle cell click
  const handleCellClick = useCallback((index: number) => {
    if (board[index] !== '' || gameStatus !== 'playing' || currentPlayer !== 'X' || computerThinking) {
      return;
    }

    // Player move
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setCurrentPlayer('O');

    // Check result after player move
    const result = checkGameResult(newBoard);
    if (result.status !== 'playing') {
      setGameStatus(result.status);
      setWinningCells(result.winningCombo);

      // Update scores
      if (result.status === 'playerWon') {
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (result.status === 'tie') {
        setScores(prev => ({ ...prev, tie: prev.tie + 1 }));
      }
    } else {
      // Computer's turn
      setComputerThinking(true);
      setTimeout(() => {
        computerMove(newBoard);
      }, 500);
    }
  }, [board, gameStatus, currentPlayer, computerThinking, checkGameResult, computerMove]);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinningCells(null);
    setComputerThinking(false);
  }, []);

  // Reset score
  const resetScore = useCallback(() => {
    setScores({ player: 0, computer: 0, tie: 0 });
    resetGame();
  }, [resetGame]);

  // Set difficulty and reset game
  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficultyState(newDifficulty);
    resetGame();
  }, [resetGame]);

  return {
    board,
    currentPlayer,
    gameStatus,
    scores,
    difficulty,
    winningCells,
    handleCellClick,
    resetGame,
    resetScore,
    setDifficulty
  };
}
