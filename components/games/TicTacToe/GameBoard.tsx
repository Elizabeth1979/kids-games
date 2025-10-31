import { Player } from '@/hooks/useTicTacToe';

interface GameBoardProps {
  board: Player[];
  winningCells: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

export default function GameBoard({ board, winningCells, onCellClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 w-fit mx-auto mb-8">
      {board.map((cell, index) => {
        const isWinningCell = winningCells?.includes(index);
        const isTaken = cell !== '';
        const isPlayerX = cell === 'X';

        return (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            disabled={disabled || isTaken}
            className={`
              w-20 h-20 md:w-28 md:h-28
              bg-card border-4 border-border rounded-2xl
              flex items-center justify-center
              text-5xl md:text-7xl font-bold
              transition-all duration-200
              ${!isTaken && !disabled ? 'hover:border-primary hover:bg-accent cursor-pointer' : ''}
              ${isTaken ? 'cursor-not-allowed' : ''}
              ${isWinningCell ? 'bg-accent border-secondary' : ''}
              ${isPlayerX ? 'text-destructive' : 'text-primary'}
            `}
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
}
