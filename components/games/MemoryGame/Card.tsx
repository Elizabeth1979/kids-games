import type { MemoryCard } from '@/hooks/useMemoryGame';

interface CardProps {
  card: MemoryCard;
  onClick: () => void;
}

export default function Card({ card, onClick }: CardProps) {
  const { item, isFlipped, isMatched } = card;

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative aspect-square cursor-pointer transition-transform duration-200 hover:scale-105 ${
        isMatched ? 'cursor-default' : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-4xl shadow-lg border-2 border-primary/20"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-primary-foreground text-5xl">?</span>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg border-2 ${
            isMatched
              ? 'bg-success/20 border-success'
              : 'border-border'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: isMatched
              ? undefined
              : `${item.color}${isMatched ? '' : 'CC'}`,
          }}
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold" aria-hidden="true">
            {item.symbol}
          </div>
          <div
            className={`text-xs sm:text-sm md:text-base font-semibold text-center px-2 ${
              isMatched ? 'text-success' : ''
            }`}
            style={{
              color: isMatched ? undefined : item.textColor,
            }}
          >
            {item.name}
          </div>
        </div>
      </div>
    </div>
  );
}
