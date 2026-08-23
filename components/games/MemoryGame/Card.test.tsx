import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('uses native button semantics and activates with Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card card={card} onClick={onClick} ariaLabel="Hidden memory card" />);

    const button = screen.getByRole('button', { name: 'Hidden memory card' });
    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledTimes(2);
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