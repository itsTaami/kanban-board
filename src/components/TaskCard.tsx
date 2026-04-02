'use client';

import type { Task, Priority } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityConfig: Record<Priority, { bg: string; icon: string; label: string }> = {
  LOW: {
    bg: 'bg-gradient-to-r from-blue-900/50 to-blue-800/30 text-blue-300 ring-1 ring-blue-800',
    icon: '',
    label: 'Low',
  },
  MEDIUM: {
    bg: 'bg-gradient-to-r from-amber-900/50 to-amber-800/30 text-amber-300 ring-1 ring-amber-800',
    icon: '',
    label: 'Medium',
  },
  HIGH: {
    bg: 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-red-300 ring-1 ring-red-800',
    icon: '',
    label: 'High',
  },
};

const priorityBorder: Record<Priority, string> = {
  LOW: 'border-l-blue-500',
  MEDIUM: 'border-l-amber-500',
  HIGH: 'border-l-red-500',
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.columnId !== 'done';

  const isDueSoon =
    task.dueDate &&
    !isOverdue &&
    new Date(task.dueDate) < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const priority = task.priority as Priority;

  return (
    <div
      onClick={() => onEdit(task)}
      className={`
        group p-4 rounded-xl bg-slate-800/90
        shadow-sm hover:shadow-lg hover:shadow-indigo-500/10
        border border-slate-700/50 hover:border-indigo-500/30
        border-l-4 ${priorityBorder[priority]}
        cursor-pointer
        transition-all duration-200 ease-out
        hover:-translate-y-1
        animate-fade-in
        card-shine
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-100 leading-tight">
          {task.title}
        </h3>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
            />
          </svg>
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
            priorityConfig[priority].bg
          }`}
        >
          <span className="text-[10px]">{priorityConfig[priority].icon}</span>
          {priorityConfig[priority].label}
        </span>

        {task.dueDate && (
          <span
            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
              isOverdue
                ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-red-300 ring-1 ring-red-800 animate-pulse-soft'
                : isDueSoon
                ? 'bg-gradient-to-r from-orange-900/50 to-orange-800/30 text-orange-300 ring-1 ring-orange-800'
                : 'bg-gradient-to-r from-slate-700/50 to-slate-600/30 text-gray-300 ring-1 ring-slate-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
          </span>
        )}
      </div>
    </div>
  );
}
