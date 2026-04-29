'use client';

import { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { todoApi } from '../api/todo.api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    todoApi.list().then((data) => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  const addTodo = async (title: string) => {
    const newTodo = await todoApi.create({ title });
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: string) => {
    await todoApi.toggle(id);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTodo = async (id: string) => {
    await todoApi.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, isLoading, addTodo, toggleTodo, removeTodo };
}
