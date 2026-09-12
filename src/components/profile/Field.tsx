import React from 'react';
import { FieldProps } from '../../types';

export const Field: React.FC<FieldProps> = ({
  definition,
  value,
  onChange,
  disabled = false,
  hidden = false,
  error,
}) => {
  if (hidden) {
    return null;
  }

  const { id, label, type, placeholder, options = [], helperText, required, min, max } = definition;

  const baseInputClasses =
    'w-full px-3.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-60 disabled:bg-zinc-800/80 disabled:cursor-not-allowed';

  return (
    <div className="flex flex-col space-y-1.5" data-testid={`field-container-${id}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-zinc-200 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
        {disabled && (
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
            Заблокировано (Поле В)
          </span>
        )}
      </div>

      {/* Render input depending on field type */}
      {type === 'string' && (
        <input
          id={id}
          type="text"
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(id, e.target.value)}
          className={baseInputClasses}
        />
      )}

      {type === 'number' && (
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value !== undefined ? value : ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : Number(e.target.value);
            onChange(id, val);
          }}
          className={baseInputClasses}
        />
      )}

      {type === 'date' && (
        <input
          id={id}
          type="date"
          value={typeof value === 'string' ? value : ''}
          disabled={disabled}
          onChange={(e) => onChange(id, e.target.value)}
          className={baseInputClasses}
        />
      )}

      {type === 'text' && (
        <textarea
          id={id}
          rows={3}
          value={typeof value === 'string' ? value : ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(id, e.target.value)}
          className={baseInputClasses}
        />
      )}

      {type === 'select' && (
        <select
          id={id}
          value={typeof value === 'string' ? value : ''}
          disabled={disabled}
          onChange={(e) => onChange(id, e.target.value)}
          className={baseInputClasses}
        >
          <option value="" disabled>
            {placeholder || 'Выберите вариант...'}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-zinc-900 text-zinc-100">
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {type === 'radio' && (
        <div className="space-y-2 pt-1">
          {options.map((opt) => {
            const isChecked = value === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-start space-x-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-blue-600 bg-blue-950/20 text-white'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-zinc-300'
                } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <input
                  type="radio"
                  name={id}
                  value={opt.value}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => onChange(id, opt.value)}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500 border-zinc-700 bg-zinc-900"
                />
                <span className="leading-snug">{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {type === 'checkbox' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {options.map((opt) => {
            const currentArr = Array.isArray(value) ? value : [];
            const isChecked = currentArr.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-center space-x-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-blue-500/80 bg-blue-950/20 text-white'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-zinc-300'
                } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange(id, [...currentArr, opt.value]);
                    } else {
                      onChange(
                        id,
                        currentArr.filter((v) => v !== opt.value)
                      );
                    }
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500 border-zinc-700 bg-zinc-900"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
};
