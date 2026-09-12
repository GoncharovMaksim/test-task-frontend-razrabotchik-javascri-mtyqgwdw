import React from 'react';
import { BodyProps } from '../../types';

export const Body: React.FC<BodyProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
}) => {
  return (
    <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="mb-8 pb-6 border-b border-zinc-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {title && (
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm text-zinc-400 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      <div className="w-full">{children}</div>
    </main>
  );
};
