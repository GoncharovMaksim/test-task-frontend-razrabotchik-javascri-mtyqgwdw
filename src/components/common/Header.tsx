import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderProps } from '../../types';

export const Header: React.FC<HeaderProps> = ({
  appName,
  user,
  isAuthenticated,
  onLogout,
}) => {
  const location = useLocation();

  const navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Карточки слов', path: '/cards' },
    { label: 'Профиль', path: '/profile' },
    { label: 'Теория & Ответы', path: '/theory' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2.5 font-bold tracking-tight text-white hover:text-blue-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-sm">
              А
            </div>
            <span className="text-base sm:text-lg">{appName}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-inner'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Profile Fake Widget & Auth Actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/profile"
                className="flex items-center space-x-2.5 px-2.5 py-1 rounded-md hover:bg-zinc-800/80 transition-colors text-left"
                title="Перейти в профиль"
              >
                <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700 flex items-center justify-center text-xs font-semibold text-blue-300 overflow-hidden">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.fullName.charAt(0)
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-medium text-zinc-200 leading-tight">
                    {user.fullName}
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-tight">
                    {user.role}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-colors"
              >
                Выйти
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              Войти (admin)
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
