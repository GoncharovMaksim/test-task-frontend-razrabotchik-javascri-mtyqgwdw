import React from 'react';
import { FooterProps } from '../../types';

export const Footer: React.FC<FooterProps> = ({
  companyName,
  email,
  phone,
  address,
  copyright,
  links,
}) => {
  return (
    <footer className="w-full border-t border-zinc-800 bg-[#070a12] text-zinc-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs font-black">
                А
              </div>
              <span>{companyName}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Тестовое задание на позицию Frontend разработчик (JavaScript/TypeScript + React) Middle.
              SPA реализовано в строгом соответствии с архитектурными требованиями ТЗ.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Контакты компании
            </div>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <span className="text-zinc-500">Адрес: </span>
                <span className="text-zinc-300">{address}</span>
              </li>
              <li>
                <span className="text-zinc-500">Телефон: </span>
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-blue-400 hover:underline">
                  {phone}
                </a>
              </li>
              <li>
                <span className="text-zinc-500">Email: </span>
                <a href={`mailto:${email}`} className="text-blue-400 hover:underline">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Навигация и ресурсы
            </div>
            <ul className="space-y-2 text-xs">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400">
          <div>{copyright}</div>
          <div className="mt-2 sm:mt-0 text-zinc-400">
            Стек: React 18 + Redux Toolkit + TypeScript Strict + Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
