'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import type { Column as ColumnType, Task } from '@/types';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
}

const columnConfig: Record<string, { gradient: string; icon: string; bg: string; accent: string; glow: string }> = {
  'To Do': {
    gradient: 'from-blue-500 to-indigo-600',
    icon: '📋',
    bg: 'bg-blue-950/20',
    accent: 'text-blue-400',
    glow: 'glow-blue',
  },
  'In Progress': {
    gradient: 'from-amber-500 to-orange-500',
    icon: '⚡',
    bg: 'bg-amber-950/20',
    accent: 'text-amber-400',
    glow: 'glow-amber',
  },
  'Done': {
    gradient: 'from-emerald-500 to-green-600',
    icon: '✅',
    bg: 'bg-emerald-950/20',
    accent: 'text-emerald-400',
    glow: 'glow-emerald',
  },
};

const defaultConfig = {
  gradient: 'from-gray-500 to-slate-600',
  icon: '📁',
  bg: 'bg-gray-900/20',
  accent: 'text-gray-400',
  glow: '',
};

export function Column({ column, onAddTask, onEditTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const taskIds = column.tasks.map((task) => task.id);
  const config = columnConfig[column.title] || defaultConfig;

  return (
    <div
      className={`
        flex flex-col rounded-2xl min-w-[320px] max-w-[320px]
        bg-slate-900/60
        backdrop-blur-sm
        border border-slate-700/50
        shadow-lg shadow-slate-900/50
        overflow-hidden
        animate-fade-in
        column-glow ${config.glow}
        hover-lift
      `}
    >
      {/* Gradient header */}
      <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl" role="img" aria-label={column.title}>
            {config.icon}
          </span>
          <div>
            <h2 className="font-bold text-gray-100">
              {column.title}
            </h2>
            <span className={`text-xs font-medium ${config.accent}`}>
              {column.tasks.length} {column.tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className={`
            p-2 rounded-xl
            bg-gradient-to-r ${config.gradient}
            text-white shadow-md
            hover:shadow-lg hover:scale-105
            active:scale-95
            transition-all duration-200
          `}
          aria-label={`Add task to ${column.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 p-3 space-y-3 overflow-y-auto min-h-[300px] max-h-[calc(100vh-280px)]
          transition-all duration-200
          ${isOver ? `${config.bg} ring-2 ring-inset ring-indigo-600` : ''}
        `}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task, index) => (
            <div key={task.id} className={`stagger-${Math.min(index + 1, 5)}`}>
              <TaskCard task={task} onEdit={onEditTask} />
            </div>
          ))}
        </SortableContext>

        {column.tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 empty-state rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12 mb-3 opacity-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className="text-xs mt-1">Click + to add one</p>
          </div>
        )}
      </div>
    </div>
  );
}
