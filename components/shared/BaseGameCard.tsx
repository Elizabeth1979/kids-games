import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface BaseGameCardProps {
  children: ReactNode;
  variant?: 'default' | 'coming-soon';
  className?: string;
}

export default function BaseGameCard({
  children,
  variant = 'default',
  className = ''
}: BaseGameCardProps) {
  const variantStyles = {
    default: 'shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer border-4 border-transparent hover:border-accent bg-card hover:bg-accent/10',
    'coming-soon': 'shadow-md opacity-60 border-4 border-muted/50 bg-muted cursor-not-allowed'
  };

  return (
    <Card className={`rounded-3xl p-8 min-h-[280px] flex flex-col ${variantStyles[variant]} ${className}`}>
      <CardContent className="p-0 flex-1 flex items-center justify-center">
        <div className="text-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
