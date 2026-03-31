import { Board } from '@/components/Board';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getColumns } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const columns = await getColumns();

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Kanban Board
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Drag and drop tasks to organize your workflow
            </p>
          </div>
          <ThemeToggle />
        </header>

        <Board initialColumns={columns} />
      </div>
    </main>
  );
}
