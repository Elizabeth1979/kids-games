import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { MemoryCard } from '@/hooks/useMemoryGame';
import Card from './Card';

const card: MemoryCard = {
  id: 'cat-1',
  item: { id: 'cat', name: 'Cat', symbol: 'C', color: '#000000' },
  isFlipped: false,
  isMatched: false,
};

describe('MemoryGame Card', () => {
  it('uses native button semantics and is keyboard operable', () => {
    const onClick = vi.fn();
    render(<Card card={card} onClick={onClick} ariaLabel="Hidden memory card" />);

    const button = screen.getByRole('button', { name: 'Hidden memory card' });
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.click(button);

    expect(button).toHaveFocus();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes revealed card content and disables completed cards', () => {
    render(
      <Card
        card={{ ...card, isFlipped: true, isMatched: true }}
        onClick={vi.fn()}
        ariaLabel="Matched card: Cat"
      />
    );

    expect(screen.getByRole('button', { name: 'Matched card: Cat' })).toBeDisabled();
  });
});