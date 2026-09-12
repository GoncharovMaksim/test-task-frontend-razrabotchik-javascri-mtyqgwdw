import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/common/Page';
import { Body } from '../components/common/Body';
import { useAppSelector } from '../store';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Page title="Главная | Астрал.Слова">
      <Body
        title="Платформа интерактивного изучения английских слов"
        subtitle="SPA-приложение на React 18, Redux Toolkit и TypeScript с чистой компонентной иерархией"
      >
        <div className="space-y-10">
          {/* Hero Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-[#0c121e] border border-zinc-800 shadow-xl">
            <div className="max-w-3xl">
              <span className="inline-block px-2.5 py-1 rounded bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
                Тестовое задание для ГК Астрал • Frontend Middle
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Эффективные интервальные карточки и адаптивный профиль инженера
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                Приложение разработано строго по требованиям технического задания. Включает 3D-переворачивающиеся карточки слов с рандомными цитатами дня, расширенный профиль из 20 полей с динамическими зависимостями (Поле А ➔ скрытие Поля Б ➔ блокировка и пресет Поля В), а также полную теоретическую базу.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/cards"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                >
                  Перейти к карточкам
                </Link>
                <Link
                  to="/profile"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
                >
                  Открыть профиль (20 полей)
                </Link>
                <Link
                  to="/theory"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-zinc-300 bg-transparent hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
                >
                  Теоретические ответы
                </Link>
              </div>
            </div>
          </div>

          {/* Key Functional Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 font-bold mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Флеш-карточки слов (Cards)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Рендеринг через строгую цепочку <code className="text-zinc-200 font-mono">Page ➔ Body ➔ CardList ➔ Card</code>. 3D CSS flip-анимация, перевод, транскрипция, пример употребления и рандомные мотивирующие цитаты.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <Link to="/cards" className="text-xs text-blue-400 hover:underline">
                  Смотреть карточки &rarr;
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Форма профиля (20 полей)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Иерархия <code className="text-zinc-200 font-mono">EditView ➔ Field</code>. Поддерживает число, строку, текст, дату, селекты, группы чекбоксов и радиокнопок. Реализована связь полей продвинутого уровня.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <Link to="/profile" className="text-xs text-emerald-400 hover:underline">
                  Редактировать профиль &rarr;
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 font-bold mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Теоретическая секция JS/TS
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Исчерпывающие разборы вопросов из ТЗ: строгий режим, var/let/const, тонкости приведения типов при сравнении (null, undefined, NaN), this, таймеры, дженерики, интерфейсы и перегрузки.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <Link to="/theory" className="text-xs text-purple-400 hover:underline">
                  Изучить теорию &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Info Block */}
          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Параметры окружения и учетные данные для проверки
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 mb-1">Логин (admin):</div>
                <div className="text-zinc-200 font-bold">admin</div>
              </div>
              <div className="p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 mb-1">Пароль (admin):</div>
                <div className="text-zinc-200 font-bold">admin</div>
              </div>
              <div className="p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 mb-1">Текущий статус:</div>
                <div className={isAuthenticated ? 'text-emerald-400' : 'text-amber-400'}>
                  {isAuthenticated ? `Авторизован (${user?.fullName})` : 'Гость (не авторизован)'}
                </div>
              </div>
              <div className="p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 mb-1">Уровень реализации:</div>
                <div className="text-blue-400 font-bold">Полный (все разделы)</div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </Page>
  );
};
