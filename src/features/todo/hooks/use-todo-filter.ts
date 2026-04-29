'use client';

import { useMemo, useState } from 'react';
import type { Todo, TodoFilter } from '../types';

export function useTodoFilter(todos: Todo[]) {
  const [filter, setFilter] = useState<TodoFilter>('all');

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return { filter, setFilter, filteredTodos, counts };
}
