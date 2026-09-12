import React, { useEffect, useMemo } from 'react';
import { Page } from '../components/common/Page';
import { Body } from '../components/common/Body';
import { CardList } from '../components/cards/CardList';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchCards,
  nextRandomQuote,
  resetFlippedCards,
  setSearchQuery,
  setSelectedLevel,
  toggleFlipCard,
} from '../features/cards/cardsSlice';

export const CardsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    flippedCardIds,
    currentQuoteIndex,
    quotes,
    searchQuery,
    selectedLevel,
    isLoading,
  } = useAppSelector((state) => state.cards);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCards());
    }
  }, [dispatch, items.length]);

  const activeQuote = quotes[currentQuoteIndex] || 'Word of the Day';

  const handleToggleFlip = (cardId: string) => {
    dispatch(toggleFlipCard(cardId));
  };

  const handleNextQuote = () => {
    dispatch(nextRandomQuote());
  };

  const handleResetCards = () => {
    dispatch(resetFlippedCards());
  };

  const filteredCards = useMemo(() => {
    return items.filter((card) => {
      const matchesSearch =
        card.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        selectedLevel === 'all' || card.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesLevel;
    });
  }, [items, searchQuery, selectedLevel]);

  const flippedCount = Object.values(flippedCardIds).filter(Boolean).length;

  return (
    <Page title="Карточки изучения иностранных слов">
      <Body
        title="Карточки английских слов"
        subtitle="Интерактивный набор флеш-карточек с 3D-переворотом и мотивирующими заголовками"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextQuote}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              Сменить цитату дня
            </button>
            <button
              type="button"
              onClick={handleResetCards}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Сбросить перевороты
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Controls bar */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Поиск по слову или переводу..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-zinc-400 mr-1 whitespace-nowrap">Уровень:</span>
              {['all', 'B1', 'B2', 'C1'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => dispatch(setSelectedLevel(lvl))}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {lvl === 'all' ? 'Все уровни' : lvl}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-zinc-400 whitespace-nowrap">
              Изучено переводов: <span className="text-emerald-400 font-bold">{flippedCount}</span> / {items.length}
            </div>
          </div>

          {/* Current quote banner */}
          <div className="px-4 py-2.5 rounded-lg bg-blue-950/30 border border-blue-900/50 flex items-center justify-between">
            <div className="text-xs text-blue-300">
              Текущий заголовок карточек: <strong className="text-white font-semibold">«{activeQuote}»</strong>
            </div>
            <span className="text-[11px] text-zinc-500">
              (выбирается рандомно из предустановленного списка)
            </span>
          </div>

          {isLoading ? (
            <div className="p-16 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <CardList
              cards={filteredCards}
              flippedCardIds={flippedCardIds}
              onToggleFlip={handleToggleFlip}
              randomQuote={activeQuote}
            />
          )}
        </div>
      </Body>
    </Page>
  );
};
