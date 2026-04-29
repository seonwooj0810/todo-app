import { TodoList } from '@/features/todo';
import { ThemeToggle } from '@/features/theme';
import { APP_NAME } from '@/shared/config/constants';

export default function TodosPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <ThemeToggle />
      </header>
      <TodoList />
    </main>
  );
}
