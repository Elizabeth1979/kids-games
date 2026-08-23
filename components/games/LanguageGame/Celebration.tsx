'use client';


interface CelebrationProps {
  show: boolean;
}

export default function Celebration({ show }: CelebrationProps) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="text-9xl animate-bounce text-accent font-bold">
        !
      </div>
    </div>
  );
}
