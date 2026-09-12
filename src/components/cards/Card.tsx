import React from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  card,
  quoteTitle,
  isFlipped,
  onToggleFlip,
}) => {
  return (
    <div className="group w-full h-80 [perspective:1000px]">
      <div
        className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between shadow-lg [backface-visibility:hidden]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                {quoteTitle}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 uppercase">
                {card.level} • {card.partOfSpeech}
              </span>
            </div>

            <div className="mt-2">
              <h3 className="text-2xl font-bold tracking-tight text-white capitalize">
                {card.word}
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {card.transcription}
              </p>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-medium">
                Пример использования:
              </span>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "{card.exampleSentence}"
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Тема: {card.topic}
            </span>
            <button
              type="button"
              onClick={() => onToggleFlip(card.id)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* BACK FACE (REVERSE SIDE) */}
        <div className="absolute inset-0 w-full h-full bg-zinc-900/95 border border-blue-900/40 rounded-xl p-6 flex flex-col justify-between shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Перевод и значение
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {card.word}
              </span>
            </div>

            <div className="mt-2">
              <h3 className="text-xl font-bold tracking-tight text-emerald-400">
                {card.translation}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Часть речи: <span className="text-zinc-200">{card.partOfSpeech}</span>
              </p>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-medium">
                Перевод примера:
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "{card.exampleTranslation}"
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Нажмите, чтобы скрыть перевод
            </span>
            <button
              type="button"
              onClick={() => onToggleFlip(card.id)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
              НАЗАД К СЛОВУ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
