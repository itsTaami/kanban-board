'use client';

interface FooterProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
}

export function Footer({ totalTasks, completedTasks, inProgressTasks, todoTasks }: FooterProps) {
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <footer className="mt-8 animate-fade-in">
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Stats summary */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-semibold text-white">{todoTasks}</p>
                <p className="text-xs text-gray-500">To Do</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-700" />

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-white">{inProgressTasks}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-700" />

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-white">{completedTasks}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-indigo-400">{progressPercent}%</span>
              </div>
            </div>

            {/* Productivity score */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-indigo-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span className="text-xs font-semibold text-indigo-300">
                {progressPercent >= 80 ? 'Excellent!' : progressPercent >= 50 ? 'Good progress!' : 'Keep going!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-600 mt-4">
        Built with Next.js, TypeScript & Tailwind CSS
      </p>
    </footer>
  );
}
