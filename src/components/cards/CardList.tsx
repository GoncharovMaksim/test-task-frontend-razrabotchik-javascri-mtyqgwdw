import React from 'react';
import { Card } from './Card';
import { CardListProps } from '../../types';

export const CardList: React.FC<CardListProps> = ({
  cards,
  flippedCardIds,
  onToggleFlip,
  randomQuote,
}) => {
  if (cards.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-400 text-sm">Карточки не найдены по заданным критериям.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const isFlipped = !!flippedCardIds[card.id];
        return (
          <Card
            key={card.id}
            card={card}
            quoteTitle={randomQuote}
            isFlipped={isFlipped}
            onToggleFlip={onToggleFlip}
          />
        );
      })}
    </div>
  );
};
