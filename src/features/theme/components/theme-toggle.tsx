'use client';

import { useTheme } from '../hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 text-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
