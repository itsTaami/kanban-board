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

const columnColors: Record<string, string> = {
  'To Do': 'border-t-blue-500',
  'In Progress': 'border-t-yellow-500',
  'Done': 'border-t-green-500',
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

  return (
    <div
      className={`
        flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg min-w-[300px] max-w-[300px]
        border-t-4 ${columnColors[column.title] || 'border-t-gray-500'}
      `}
    >
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            {column.title}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Add task to ${column.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
          flex-1 p-2 space-y-2 overflow-y-auto min-h-[200px]
          ${isOver ? 'bg-gray-200 dark:bg-gray-800' : ''}
          transition-colors
        `}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </SortableContext>

        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
}
