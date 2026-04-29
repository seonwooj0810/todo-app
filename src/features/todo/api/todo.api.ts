import { STORAGE_PREFIX } from '@/shared/config/constants';
import type { Todo, CreateTodoInput } from '../types';

const STORAGE_KEY = `${STORAGE_PREFIX}:todos`;

function readStorage(): Todo[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(todos: Todo[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * Todo 데이터 계층.
 * 실제 프로젝트에서는 fetch / TanStack Query 등으로 대체.
 * 컴포넌트는 이 모듈의 시그니처에만 의존하므로 내부 구현이 바뀌어도 영향 없음.
 */
export const todoApi = {
  async list(): Promise<Todo[]> {
    return readStorage();
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = readStorage();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    writeStorage([...todos, newTodo]);
    return newTodo;
  },

  async toggle(id: string): Promise<void> {
    const todos = readStorage();
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    writeStorage(updated);
  },

  async remove(id: string): Promise<void> {
    const todos = readStorage();
    writeStorage(todos.filter((t) => t.id !== id));
  },
};
