import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Page } from '../components/common/Page';
import { Body } from '../components/common/Body';
import { useAppDispatch, useAppSelector } from '../store';
import { clearAuthError, loginUser } from '../features/auth/authSlice';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/cards';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());

    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/cards';
      navigate(from, { replace: true });
    }
  };

  return (
    <Page title="Вход в систему">
      <Body className="flex items-center justify-center py-12 sm:py-20 min-h-[calc(100vh-16rem)]">
        <div className="w-full max-w-md mx-auto">
          {/* Centered Login Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600 mx-auto flex items-center justify-center text-white font-black text-xl mb-3 shadow-md">
                А
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Авторизация в системе
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Используйте учетные данные из ТЗ: <strong className="text-zinc-200">admin / admin</strong>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-medium"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-username"
                  className="block text-xs font-semibold text-zinc-200 mb-1"
                >
                  Логин
                </label>
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) dispatch(clearAuthError());
                  }}
                  placeholder="Введите логин"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-zinc-200 mb-1"
                >
                  Пароль
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) dispatch(clearAuthError());
                  }}
                  placeholder="Введите пароль"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg text-xs font-semibold text-white transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Проверка данных...</span>
                    </>
                  ) : (
                    <span>Войти</span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
              ГК Калуга Астрал • Платформа корпоративного обучения
            </div>
          </div>
        </div>
      </Body>
    </Page>
  );
};
