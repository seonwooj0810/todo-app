'use client';

import { cn } from '@/shared/lib/cn';
import type { TodoFilter } from '../types';

interface Props {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  counts: Record<TodoFilter, number>;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
];

export function TodoFilterBar({ value, onChange, counts }: Props) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'rounded-md px-3 py-1 text-sm transition-colors',
            value === f.value
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          )}
        >
          {f.label}
          <span className="ml-1 text-xs opacity-70">({counts[f.value]})</span>
        </button>
      ))}
    </div>
  );
}
