import React, { useState } from 'react';
import { Page } from '../components/common/Page';
import { Body } from '../components/common/Body';

export const TheoryPage: React.FC = () => {
  const [promptResult, setPromptResult] = useState<string | null>(null);

  // Implementation of callback function from the PDF:
  // "Напишите функцию, которая реализует подтверждение определенного действия в качестве параметров
  // функция должна принимать: вопрос; функцию-колбэк, вызываемую если пользователь подтвердит действие;
  // функцию-колбэк, вызываемую, если пользователь отклонит действие. Для подтверждения пользователем – используйте стандартную функцию prompt."
  const confirmActionWithPrompt = (
    question: string,
    onConfirm: (response: string) => void,
    onCancel: (response: string | null) => void
  ) => {
    const input = window.prompt(`${question} (введите 'да' или 'yes' для подтверждения)`);
    if (input !== null && (input.trim().toLowerCase() === 'да' || input.trim().toLowerCase() === 'yes')) {
      onConfirm(input);
    } else {
      onCancel(input);
    }
  };

  const handleRunPrompt = () => {
    confirmActionWithPrompt(
      'Вы точно хотите удалить выбранный элемент?',
      (res) => setPromptResult(`Действие подтверждено пользователем! Введено: "${res}"`),
      (res) => setPromptResult(`Действие отклонено пользователем. Введено: "${res ?? 'отмена'}"`)
    );
  };

  return (
    <Page title="Теория JS & TypeScript | ГК Астрал">
      <Body
        title="Теоретическая часть — Базовые знания JS / TypeScript"
        subtitle="Развернутые ответы на вопросы технического задания с практическими примерами и интерактивной песочницей"
      >
        <div className="space-y-8">
          {/* Quick Nav */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs flex flex-wrap gap-2">
            <span className="text-zinc-500 py-1">Быстрый переход:</span>
            <a href="#strict-mode" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">Строгий режим</a>
            <a href="#variables" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">var / let / const</a>
            <a href="#comparisons" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">Операторы сравнения</a>
            <a href="#callbacks" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">Колбэки и prompt</a>
            <a href="#this-context" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">Объекты и this</a>
            <a href="#timers" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">setTimeout & setInterval</a>
            <a href="#typescript" className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">TypeScript & Generics</a>
          </div>

          {/* Section 1: Strict Mode */}
          <section id="strict-mode" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">01</span>
              <h2 className="text-lg font-bold text-white">Что такое «строгий режим»? Для чего он нужен?</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong>Строгий режим (<code className="text-blue-400 font-mono">"use strict";</code>)</strong> — это специальный режим исполнения JavaScript, представленный в стандарте ECMAScript 5 (ES5), который переводит движок JS в строгую семантику выполнения.
            </p>
            <div className="space-y-2 text-xs text-zinc-300">
              <p className="font-semibold text-zinc-200">Ключевые цели и отличия строгого режима:</p>
              <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pl-1">
                <li><strong className="text-zinc-200">Запрет неявного создания глобальных переменных:</strong> присвоение значения необъявленной переменной (<code className="font-mono text-zinc-300">x = 10;</code>) вызывает ошибку <code className="font-mono text-red-400">ReferenceError</code>, а не создает свойство в <code className="font-mono text-zinc-300">window/global</code>.</li>
                <li><strong className="text-zinc-200">Ошибки при недопустимых мутациях:</strong> запись в read-only свойства или свойства объекта с <code className="font-mono text-zinc-300">Object.freeze</code> генерирует <code className="font-mono text-red-400">TypeError</code> вместо тихого игнорирования.</li>
                <li><strong className="text-zinc-200">Безопасный <code className="font-mono text-zinc-300">this</code>:</strong> в обычной функции, вызванной без контекста объекта, <code className="font-mono text-zinc-300">this</code> равен <code className="font-mono text-amber-300">undefined</code>, а не глобальному объекту (<code className="font-mono text-zinc-300">window/global</code>).</li>
                <li><strong className="text-zinc-200">Запрет устаревших конструкций:</strong> оператор <code className="font-mono text-zinc-300">with</code> и восьмеричные литералы без префикса (например <code className="font-mono text-zinc-300">0123</code>) запрещены синтаксически.</li>
                <li><strong className="text-zinc-200">Резервирование ключевых слов:</strong> слова <code className="font-mono text-zinc-300">interface, let, package, private, protected, public, static, yield</code> зарезервированы для будущих версий.</li>
              </ul>
              <p className="text-zinc-400 pt-1">
                <em>Примечание:</em> В современных модулях ES (ESM, <code className="font-mono text-zinc-300">&lt;script type="module"&gt;</code>) и телах классов строгий режим включен <strong>автоматически по умолчанию</strong>.
              </p>
            </div>
          </section>

          {/* Section 2: Variables */}
          <section id="variables" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">02</span>
              <h2 className="text-lg font-bold text-white">Переменные – в чем отличие var, let, const? Когда и что предпочтительнее применять?</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-800 rounded-lg">
                <thead className="bg-zinc-800/80 text-zinc-300">
                  <tr>
                    <th className="p-2.5 border-b border-zinc-700">Критерий</th>
                    <th className="p-2.5 border-b border-zinc-700 font-mono text-amber-300">var</th>
                    <th className="p-2.5 border-b border-zinc-700 font-mono text-blue-300">let</th>
                    <th className="p-2.5 border-b border-zinc-700 font-mono text-emerald-300">const</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-400">Область видимости</td>
                    <td className="p-2.5">Функциональная</td>
                    <td className="p-2.5">Блочная (<code className="font-mono">&#123; ... &#125;</code>)</td>
                    <td className="p-2.5">Блочная (<code className="font-mono">&#123; ... &#125;</code>)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-400">Всплытие (Hoisting)</td>
                    <td className="p-2.5">Да (инициализируется в <code className="font-mono">undefined</code>)</td>
                    <td className="p-2.5">Да, но находится в TDZ до объявления</td>
                    <td className="p-2.5">Да, но находится в TDZ до объявления</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-400">TDZ (Temporal Dead Zone)</td>
                    <td className="p-2.5">Нет</td>
                    <td className="p-2.5">Да (<code className="font-mono text-red-400">ReferenceError</code> при обращении)</td>
                    <td className="p-2.5">Да (<code className="font-mono text-red-400">ReferenceError</code> при обращении)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-400">Повторное объявление</td>
                    <td className="p-2.5">Разрешено</td>
                    <td className="p-2.5">Запрещено (<code className="font-mono text-red-400">SyntaxError</code>)</td>
                    <td className="p-2.5">Запрещено (<code className="font-mono text-red-400">SyntaxError</code>)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-zinc-400">Переприсваивание</td>
                    <td className="p-2.5">Разрешено</td>
                    <td className="p-2.5">Разрешено</td>
                    <td className="p-2.5">Запрещено (ссылка константна)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>Что и когда предпочтительнее:</strong>
              <br />
              1. <strong>По умолчанию всегда использовать <code className="text-emerald-400 font-mono">const</code></strong> — обеспечивает иммутабельность связывания ссылки, предотвращает случайную перезапись и облегчает чтение кода.
              <br />
              2. <strong>Использовать <code className="text-blue-400 font-mono">let</code></strong> исключительно тогда, когда значение переменной действительно планируется изменять (счетчики циклов, флаги, локальные аккумуляторы).
              <br />
              3. <strong><code className="text-amber-400 font-mono">var</code> избегать полностью</strong> в современном коде.
            </p>
          </section>

          {/* Section 3: Comparisons & Coercion */}
          <section id="comparisons" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">03</span>
              <h2 className="text-lg font-bold text-white">Операторы сравнения: == vs ===, null, undefined</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">Отличие `==` от `===` и `!=` от `!==`</div>
                <p className="text-zinc-400">
                  <code className="text-amber-300 font-mono">==</code> (абстрактное равенство) выполняет <strong>неявное приведение типов (type coercion)</strong> по алгоритму Abstract Equality Comparison.
                  <br />
                  <code className="text-emerald-300 font-mono">===</code> (строгое равенство) проверяет равенство типов и значений без приведения типов.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">'01' == 1 vs '01' === 1</div>
                <p className="text-zinc-400">
                  <code className="text-emerald-400 font-mono">'01' == 1 ➔ true</code> (строка приводится к числу: <code className="font-mono">ToNumber('01') ➔ 1</code>, затем <code className="font-mono">1 === 1</code>).
                  <br />
                  <code className="text-red-400 font-mono">'01' === 1 ➔ false</code> (типы различны: <code className="font-mono">string !== number</code>).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">null === undefined vs null == undefined</div>
                <p className="text-zinc-400">
                  <code className="text-red-400 font-mono">null === undefined ➔ false</code> (разные примитивные типы).
                  <br />
                  <code className="text-emerald-400 font-mono">null == undefined ➔ true</code> (по спецификации ECMAScript 7.2.14 эти значения при нестрогом сравнении равны только друг другу и ничему больше).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">null &gt; 0, null == 0, null &gt;= 0</div>
                <p className="text-zinc-400 leading-relaxed">
                  • <code className="text-red-400 font-mono">null &gt; 0 ➔ false</code> (при реляционном сравнении <code className="font-mono">ToNumber(null) ➔ 0</code>; <code className="font-mono">0 &gt; 0</code> ложно).
                  <br />
                  • <code className="text-red-400 font-mono">null == 0 ➔ false</code> (оператор <code className="font-mono">==</code> НЕ приводит null к числу; null равен только undefined).
                  <br />
                  • <code className="text-emerald-400 font-mono">null &gt;= 0 ➔ true</code> (в спецификации оператор <code className="font-mono">&gt;=</code> вычисляется как <code className="font-mono">!(null &lt; 0)</code> ➔ <code className="font-mono">!(0 &lt; 0)</code> ➔ <code className="font-mono">!false ➔ true</code>).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2 md:col-span-2">
                <div className="font-semibold text-zinc-200">undefined &gt; 0, undefined &lt; 0, undefined == 0</div>
                <p className="text-zinc-400 leading-relaxed">
                  • <code className="text-red-400 font-mono">undefined &gt; 0 ➔ false</code>
                  <br />
                  • <code className="text-red-400 font-mono">undefined &lt; 0 ➔ false</code>
                  <br />
                  • <code className="text-red-400 font-mono">undefined == 0 ➔ false</code>
                  <br />
                  <strong>Почему:</strong> Приведение <code className="font-mono text-zinc-200">ToNumber(undefined)</code> возвращает <code className="font-mono text-amber-300">NaN</code>. Любое реляционное сравнение с <code className="font-mono">NaN</code> (&gt;, &lt;, &gt;=, &lt;=) всегда дает <code className="font-mono text-red-400">false</code>. А для равенства <code className="font-mono">==</code>, undefined равен исключительно null или undefined.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Functions & Callbacks with interactive prompt */}
          <section id="callbacks" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">04 & 05</span>
              <h2 className="text-lg font-bold text-white">Функции в переменных и Callback с подтверждением через prompt</h2>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>Можно ли сохранить функцию в переменную?</strong>
              <br />
              Да, в JavaScript функции являются <em>объектами первого класса (first-class citizens)</em>. Их можно присваивать переменным (Function Expression, Arrow Functions), передавать в качестве аргументов и возвращать из других функций.
            </p>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-200">Интерактивный запуск функции подтверждения (prompt):</span>
                <button
                  type="button"
                  onClick={handleRunPrompt}
                  className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                >
                  Запустить confirmAction
                </button>
              </div>
              {promptResult && (
                <div className="p-2.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono text-blue-300">
                  {promptResult}
                </div>
              )}
              <pre className="p-3 rounded bg-zinc-900 text-zinc-300 text-xs font-mono overflow-x-auto">
{`function confirmAction(question, onConfirm, onCancel) {
  const result = prompt(question);
  if (result !== null && (result.trim().toLowerCase() === 'да' || result.trim().toLowerCase() === 'yes')) {
    onConfirm(result);
  } else {
    onCancel(result);
  }
}`}
              </pre>
            </div>
          </section>

          {/* Section 5: Objects, Methods, this */}
          <section id="this-context" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">06</span>
              <h2 className="text-lg font-bold text-white">Объекты, методы объектов, this и потеря контекста</h2>
            </div>
            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <p>
                <strong>Что такое this?</strong> В JS значение <code className="font-mono text-blue-400">this</code> определяется не в момент создания функции, а в момент ее вызова (динамический контекст), за исключением стрелочных функций (лексический контекст).
              </p>
              <p>
                <strong>Пример потери this:</strong> передача метода объекта в качестве колбэка:
              </p>
              <pre className="p-3 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-300">
{`const user = {
  name: 'Максим',
  greet() { console.log('Привет, я ' + this.name); }
};

// Потеря контекста при передаче ссылки:
setTimeout(user.greet, 100); // -> "Привет, я undefined"`}
              </pre>
              <p>
                <strong>Решения проблемы:</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-200 font-semibold mb-1">1. Привязка через .bind()</div>
                  <code className="font-mono text-emerald-400">setTimeout(user.greet.bind(user), 100);</code>
                </div>
                <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-200 font-semibold mb-1">2. Стрелочная функция (обертка)</div>
                  <code className="font-mono text-emerald-400">setTimeout(() =&gt; user.greet(), 100);</code>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Timers */}
          <section id="timers" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">07</span>
              <h2 className="text-lg font-bold text-white">Планирование: setTimeout и setInterval, отличия, отмена</h2>
            </div>
            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <p>
                <strong>Для чего используются:</strong> <code className="font-mono text-blue-400">setTimeout</code> планирует однократный вызов функции через указанное количество миллисекунд; <code className="font-mono text-blue-400">setInterval</code> планирует повторяющийся вызов функции с заданным интервалом.
              </p>
              <p>
                <strong>Отличие setInterval от рекурсивного setTimeout:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-1">
                <li><strong className="text-zinc-200">setInterval:</strong> интервал отсчитывается между <em>запусками</em> колбэка. Если выполнение тела функции занимает 80мс, а интервал 100мс, пауза между завершением и следующим запуском составит всего 20мс. Если же выполнение превысит интервал, вызовы выстроятся в очередь без паузы.</li>
                <li><strong className="text-zinc-200">Рекурсивный setTimeout:</strong> следующий таймер планируется строго <em>после</em> того, как предыдущее выполнение завершилось. Это гарантирует точную фиксированную задержку между окончаниями итераций.</li>
              </ul>
              <p>
                <strong>Отмена таймеров:</strong> вызов <code className="font-mono text-emerald-400">clearTimeout(timerId)</code> или <code className="font-mono text-emerald-400">clearInterval(intervalId)</code> с идентификатором, возвращенным при создании.
              </p>
            </div>
          </section>

          {/* Section 7: TypeScript Deep Dive */}
          <section id="typescript" className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">08–14</span>
              <h2 className="text-lg font-bold text-white">Вопросы TypeScript (Generics, type vs interface, Partial, Omit, Overloads)</h2>
            </div>

            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200">Что такое TypeScript и отличие от JS:</div>
                <p className="text-zinc-400">
                  Строго типизированное надмножество JavaScript, компилируемое в чистый JS. Введено для выявления ошибок на этапе компиляции, автодополнения в IDE (DX) и надежного рефакторинга крупных кодовых баз. В рантайме типы полностью стираются (zero runtime cost).
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200">Базовые типы TS:</div>
                <p className="text-zinc-400 font-mono">
                  string, number, boolean, bigint, symbol, null, undefined, any, unknown, never, void, tuple, enum, object.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">Обобщенные типы (Generics) с примерами:</div>
                <p className="text-zinc-400">
                  Позволяют создавать компоненты и функции, работающие с различными типами с сохранением типобезопасности.
                </p>
                <pre className="p-2.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-blue-300 text-[11px]">
{`// 1. Обобщенный API-ответ:
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 2. Обобщенная утилита фильтрации:
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}`}
                </pre>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">type vs interface: в чем отличие?</div>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li><strong>Declaration Merging:</strong> интерфейсы с одинаковым именем в одной области видимости объединяются (полезно для расширения библиотек). Type выдаст синтаксическую ошибку дубликата.</li>
                  <li><strong>Примитивы и объединения:</strong> <code className="font-mono text-zinc-300">type</code> может описывать примитивы, кортежи и union-типы (<code className="font-mono text-zinc-300">type ID = string | number;</code>). Interface описывает только формы объектов и функций.</li>
                  <li><strong>Синтаксис наследования:</strong> <code className="font-mono text-zinc-300">interface extends</code> против <code className="font-mono text-zinc-300">type = A & B</code>.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">Необязательные свойства и Partial&lt;T&gt;:</div>
                <p className="text-zinc-400">
                  • Сделать ряд свойств необязательными: оператор <code className="font-mono text-emerald-400">?</code> (например, <code className="font-mono text-zinc-300">age?: number</code>).
                  <br />
                  • Сделать <strong>все</strong> свойства интерфейса необязательными: утилитный тип <code className="font-mono text-blue-400">Partial&lt;User&gt;</code> (под капотом: <code className="font-mono text-zinc-300">&#123; [P in keyof T]?: T[P] &#125;</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">Для чего нужен тип Omit&lt;T, K&gt;?</div>
                <p className="text-zinc-400">
                  Конструирует новый тип, выбирая все свойства из <code className="font-mono text-zinc-300">T</code> и исключая ключи <code className="font-mono text-zinc-300">K</code>. Пример:
                  <br />
                  <code className="font-mono text-blue-300">type UserWithoutPassword = Omit&lt;User, 'password' | 'salt'&gt;;</code>
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="font-semibold text-zinc-200">Перегрузка функций (Function Overloading):</div>
                <p className="text-zinc-400">
                  Да, в TypeScript возможно объявить несколько сигнатур перегрузки и одну общую сигнатуру реализации:
                </p>
                <pre className="p-2.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-blue-300 text-[11px]">
{`function parseInput(input: string): string[];
function parseInput(input: number): number[];
function parseInput(input: string | number): (string | number)[] {
  return typeof input === 'string' ? input.split('') : [input];
}`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </Body>
    </Page>
  );
};
