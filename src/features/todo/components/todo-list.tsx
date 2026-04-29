'use client';

import { useTodos } from '../hooks/use-todos';
import { useTodoFilter } from '../hooks/use-todo-filter';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';
import { TodoFilterBar } from './todo-filter';

export function TodoList() {
  const { todos, isLoading, addTodo, toggleTodo, removeTodo } = useTodos();
  const { filter, setFilter, filteredTodos, counts } = useTodoFilter(todos);

  if (isLoading) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <TodoForm onAdd={addTodo} />
      <TodoFilterBar value={filter} onChange={setFilter} counts={counts} />

      {filteredTodos.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">
          {todos.length === 0
            ? '아직 할 일이 없습니다. 위에서 추가해보세요!'
            : '이 필터에 해당하는 항목이 없습니다.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
