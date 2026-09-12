import React from 'react';
import { Field } from './Field';
import { EditViewProps } from '../../types';

export const EditView: React.FC<EditViewProps> = ({
  fields,
  values,
  onChange,
  onSubmit,
  onReset,
  disabledFieldIds = {},
  hiddenFieldIds = {},
  isSubmitting = false,
  saveSuccess = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* Dependency logic indicator banner */}
      <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-zinc-200">
            Связанность полей (ТЗ: Продвинутый уровень)
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
            Field A ➔ Hide B ➔ Disable C & Preset
          </span>
        </div>
        <p className="text-zinc-400 leading-relaxed">
          Измените значение в <strong className="text-zinc-200">Поле А (Тип трудоустройства)</strong>.
          При выборе <span className="text-amber-300 font-medium">«Стажировка / Студент»</span>:
          <strong className="text-zinc-200"> Поле Б (Офис)</strong> мгновенно скрывается, а
          <strong className="text-zinc-200"> Поле В (Наставник)</strong> блокируется с предустановленным значением
          «Обязательно требуется наставник».
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <span>Данные профиля успешно сохранены в Mock REST API!</span>
        </div>
      )}

      {/* Grid of 20 fields rendered via Field component */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {fields.map((fieldDef) => {
          const isHidden = !!hiddenFieldIds[fieldDef.id];
          const isDisabled = !!disabledFieldIds[fieldDef.id];
          const val = values[fieldDef.id];

          // Make full-width for text/bio, skills, and wide elements
          const isFullSpan =
            fieldDef.type === 'text' ||
            fieldDef.type === 'checkbox' ||
            fieldDef.id === 'employmentType';

          return (
            <div
              key={fieldDef.id}
              className={`${isFullSpan ? 'md:col-span-2' : ''} ${isHidden ? 'hidden' : ''}`}
            >
              <Field
                definition={fieldDef}
                value={val}
                onChange={onChange}
                disabled={isDisabled}
                hidden={isHidden}
              />
            </div>
          );
        })}
      </div>

      {/* Form actions */}
      <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-end gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors disabled:opacity-50"
        >
          Сбросить изменения
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Сохранение...</span>
            </>
          ) : (
            <span>Сохранить профиль (20 полей)</span>
          )}
        </button>
      </div>
    </form>
  );
};
