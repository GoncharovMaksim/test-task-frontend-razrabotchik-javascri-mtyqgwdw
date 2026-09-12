# Лог проектирования и этапы реализации решения

**Проект:** Astral Words SPA — Тестовое задание Frontend Middle (React + Redux + TypeScript)  
**Компания:** ГК Калуга Астрал  
**Кандидат:** Максим Гончаров  
**Дата:** 2026-09-12  

---

## 1. Анализ требований и декомпозиция задачи

### 1.1 Входные данные:
1. Письмо от HR Натальи (ГК Калуга Астрал) с 7 вопросами о кандидате.
2. Прикрепленный файл ТЗ: `FrontEntryMiddle - Тестовое.pdf`.
3. Содержимое ТЗ:
   - **Теоретический блок:** 14 глубоких вопросов по JavaScript и TypeScript (строгий режим, `var/let/const`, тонкости операторов сравнения, `this`, планирование `setTimeout/setInterval`, базовые типы TS, Generics, `type` vs `interface`, `Partial`, `Omit`, перегрузка функций).
   - **Практический блок SPA:**
     - Стек: React + Redux Toolkit + TypeScript
     - Маршруты: `/` (Главная), `/login` (Логин), `/cards` (Карточки слов), `/profile` (Профиль)
     - Строгая иерархия компонентов: `Page ➔ Header ➔ Footer ➔ Body ➔ CardList ➔ Card`, `EditView ➔ Field`
     - Форма авторизации: центрирована, поля логин и пароль, ошибка при неверных данных, валидная пара `admin/admin`
     - Карточки слов: рандомные мотивирующие цитаты (например Word of the Day), слово, транскрипция, пример, кнопка "LEARN MORE", 3D переворот карточки с показом перевода, повторный клик переворачивает обратно
     - Профиль: ровно 20 полей (число, строка, текст, дата, выпадающий список, группа checkbox-ов, группа radiogroup)
     - Продвинутый уровень связывания полей: при выборе значения в поле «а» ➔ поле «б» скрывается, поле «в» блокируется (disabled) и в него подставляется предустановленное значение
     - Мокирование данных: REST API мок
     - Уровень выполнения: **Полный**

### 1.2 Архитектурные решения:
- **Сборщик:** Vite 5 + React 18 + TypeScript (strict mode enabled).
- **Стейт-менеджер:** Redux Toolkit (`authSlice`, `cardsSlice`, `profileSlice`) с типизированными хуками `useAppDispatch` и `useAppSelector`.
- **Маршрутизация:** `react-router-dom` v6 с реализацией `ProtectedRoute` для защиты разделов `/cards` и `/profile`.
- **Стилизация:** Tailwind CSS с нейтральным минималистичным дизайном (стиль Linear / GitHub Dark, палитра slate/zinc, чистые акценты без кислотных градиентов).
- **Тестирование:** Vitest + React Testing Library + @testing-library/jest-dom (20 тестов, 4 сьюта).
- **Контейнеризация:** Multi-stage Dockerfile (Node 20 Alpine сборка + Nginx Alpine раздача) и docker-compose.yml.
- **Хостинг:** Production деплой на Vercel.

---

## 2. Этапы выполнения

### Этап 1: Инициализация и конфигурация
- Создание `package.json` с зависимостями React 18, Redux Toolkit, React Router, Vitest, Testing Library.
- Настройка `tsconfig.json` в строгом режиме (`"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`).
- Настройка `vite.config.ts`, `vitest.config.ts`, `tailwind.config.js`, `postcss.config.js`.

### Этап 2: Проектирование типов данных и мок-сервиса
- `src/types/index.ts`: строгие типы для `FlashCard`, `ProfileFieldDefinition`, `ProfileFormData`, `AuthState`, `PageProps`, `HeaderProps`, `FooterProps`, `BodyProps`, `CardProps`, `CardListProps`, `FieldProps`, `EditViewProps`.
- `src/api/mockData.ts`: массив карточек английских слов с транскрипциями и примерами; список мотивирующих высказываний; 20 полей профиля; фейковый профиль и контакты.
- `src/api/mockApi.ts`: асинхронный сервис с имитацией задержки сети, проверкой `admin/admin` и `localStorage` персистентностью.

### Этап 3: Реализация Redux Toolkit хранилища
- `authSlice.ts`: асинхронные thunk-экшены авторизации, выхода и восстановления сессии.
- `cardsSlice.ts`: управление списком карточек, 3D-переворотом, сменой цитат и фильтрацией.
- `profileSlice.ts`: управление 20 полями и алгоритм связывания полей (Field A: `employmentType === 'intern'` ➔ скрыть Field B `officeCity` ➔ заблокировать Field C `mentorshipRequired` и выставить `'mandatory'`).

### Этап 4: Компонентная иерархия
- Реализация строго по ТЗ:
  - `Page`: корневой контейнер с пробросом данных в Header и Footer
  - `Header`: навигация и фейковый профиль пользователя
  - `Footer`: контакты компании и правовая информация
  - `Body`: контейнер полезной нагрузки
  - `CardList`: список карточек
  - `Card`: 3D карточка с flip-эффектом
  - `EditView`: контейнер формы профиля
  - `Field`: универсальный рендер полей всех типов
  - `ProtectedRoute`: роутинг-гард

### Этап 5: Страницы
- `/`: информация о проекте и стеке
- `/login`: центрированная форма авторизации `admin/admin`
- `/cards`: карточки с интерактивным переворотом и фильтрами
- `/profile`: 20 полей с валидацией и связями
- `/theory`: интерактивная теория с живыми тестами

### Этап 6: Тестирование и верификация
- 20 unit и интеграционных тестов в Vitest.
- Проверка `npm run build` и `npm test` — 100% успешное прохождение.
- Сборка Docker и Nginx конфигурации.
