'use client';

import { Checkbox } from '@/shared/ui/checkbox';
import { cn } from '@/shared/lib/cn';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} 완료 토글`}
      />
      <span
        className={cn(
          'flex-1 text-gray-900 dark:text-gray-100',
          todo.completed && 'text-gray-400 line-through dark:text-gray-500'
        )}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-sm text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        aria-label={`${todo.title} 삭제`}
      >
        삭제
      </button>
    </li>
  );
}
