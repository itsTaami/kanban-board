import { Board } from '@/components/Board';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getColumns } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const columns = await getColumns();
  const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);
  const completedTasks = columns.find(col => col.title === 'Done')?.tasks.length || 0;
  const inProgressTasks = columns.find(col => col.title === 'In Progress')?.tasks.length || 0;
  const todoTasks = columns.find(col => col.title === 'To Do')?.tasks.length || 0;

  return (
    <>
      <AnimatedBackground />

      <main className="relative min-h-screen flex flex-col p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <Header
            totalTasks={totalTasks}
            completedTasks={completedTasks}
          />

          <div className="flex-1">
            <Board initialColumns={columns} />
          </div>

          <Footer
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            inProgressTasks={inProgressTasks}
            todoTasks={todoTasks}
          />
        </div>
      </main>
    </>
  );
}
