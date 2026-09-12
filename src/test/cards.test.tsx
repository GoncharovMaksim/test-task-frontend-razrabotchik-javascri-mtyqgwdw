import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/cards/Card';
import { CardList } from '../components/cards/CardList';
import { INITIAL_FLASHCARDS } from '../api/mockData';
import cardsReducer, { toggleFlipCard, nextRandomQuote } from '../features/cards/cardsSlice';

describe('Cards Module & Card Flip Mechanics', () => {
  const sampleCard = INITIAL_FLASHCARDS[0];

  it('renders Card with motivational quote, word, and example', () => {
    const handleToggleFlip = vi.fn();
    render(
      <Card
        card={sampleCard}
        quoteTitle="Word of the Day"
        isFlipped={false}
        onToggleFlip={handleToggleFlip}
      />
    );

    expect(screen.getByText('Word of the Day')).toBeInTheDocument();
    expect(screen.getAllByText(sampleCard.word).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(`"${sampleCard.exampleSentence}"`)).toBeInTheDocument();
    expect(screen.getByText('LEARN MORE')).toBeInTheDocument();
  });

  it('triggers onToggleFlip callback when LEARN MORE is clicked', () => {
    const handleToggleFlip = vi.fn();
    render(
      <Card
        card={sampleCard}
        quoteTitle="Word of the Day"
        isFlipped={false}
        onToggleFlip={handleToggleFlip}
      />
    );

    const button = screen.getByText('LEARN MORE');
    fireEvent.click(button);
    expect(handleToggleFlip).toHaveBeenCalledTimes(1);
    expect(handleToggleFlip).toHaveBeenCalledWith(sampleCard.id);
  });

  it('renders reverse side translation when isFlipped is true', () => {
    const handleToggleFlip = vi.fn();
    render(
      <Card
        card={sampleCard}
        quoteTitle="Word of the Day"
        isFlipped={true}
        onToggleFlip={handleToggleFlip}
      />
    );

    expect(screen.getByText(sampleCard.translation)).toBeInTheDocument();
    expect(screen.getByText('НАЗАД К СЛОВУ')).toBeInTheDocument();

    const backButton = screen.getByText('НАЗАД К СЛОВУ');
    fireEvent.click(backButton);
    expect(handleToggleFlip).toHaveBeenCalledWith(sampleCard.id);
  });

  it('renders CardList with multiple cards', () => {
    const handleToggleFlip = vi.fn();
    render(
      <CardList
        cards={INITIAL_FLASHCARDS.slice(0, 3)}
        flippedCardIds={{}}
        onToggleFlip={handleToggleFlip}
        randomQuote="Daily Motivation"
      />
    );

    expect(screen.getAllByText('Daily Motivation')).toHaveLength(3);
    expect(screen.getAllByText('LEARN MORE')).toHaveLength(3);
  });

  it('updates cardsSlice state on toggleFlipCard and nextRandomQuote', () => {
    const state0 = {
      items: INITIAL_FLASHCARDS,
      flippedCardIds: {},
      currentQuoteIndex: 0,
      quotes: ['Word of the Day', 'Quote of the Day', 'Daily Motivation'],
      searchQuery: '',
      selectedLevel: 'all',
      isLoading: false,
    };

    const state1 = cardsReducer(state0, toggleFlipCard('card-1'));
    expect(state1.flippedCardIds['card-1']).toBe(true);

    const state2 = cardsReducer(state1, toggleFlipCard('card-1'));
    expect(state2.flippedCardIds['card-1']).toBe(false);

    const state3 = cardsReducer(state2, nextRandomQuote());
    expect(state3.currentQuoteIndex).toBeGreaterThanOrEqual(0);
    expect(state3.currentQuoteIndex).toBeLessThan(state0.quotes.length);
  });
});
