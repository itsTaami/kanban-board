'use client';

import { useState, useCallback } from 'react';
import { Column } from './Column';
import { TaskModal } from './TaskModal';
import { HowToUse } from './HowToUse';
import { createTask, updateTask, deleteTask, moveTask } from '@/lib/actions';
import type { Column as ColumnType, Task, CreateTaskInput, UpdateTaskInput } from '@/types';

interface BoardProps {
  initialColumns: ColumnType[];
}

export function Board({ initialColumns }: BoardProps) {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>('');

  const handleAddTask = useCallback((columnId: string, columnTitle: string) => {
    setSelectedColumnId(columnId);
    setSelectedColumnTitle(columnTitle);
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task: Task, columnTitle: string) => {
    setEditingTask(task);
    setSelectedColumnId(task.columnId);
    setSelectedColumnTitle(columnTitle);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSaveTask = useCallback(
    async (data: CreateTaskInput | UpdateTaskInput) => {
      if ('id' in data) {
        const updatedTask = await updateTask(data);
        setColumns((prev) =>
          prev.map((col) => ({
            ...col,
            tasks: col.tasks.map((t) =>
              t.id === updatedTask.id ? { ...t, ...updatedTask } : t
            ),
          }))
        );
      } else {
        const newTask = await createTask(data);
        setColumns((prev) =>
          prev.map((col) => {
            if (col.id === data.columnId) {
              return {
                ...col,
                tasks: [...col.tasks, newTask as Task],
              };
            }
            return col;
          })
        );
      }
    },
    []
  );

  const handleDeleteTask = useCallback(async (taskId: string) => {
    await deleteTask(taskId);
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  }, []);

  const handleMoveTask = useCallback(async (taskId: string, targetColumnTitle: string) => {
    let targetColumnId = '';
    let targetColumnTaskCount = 0;

    setColumns((prev) => {
      const targetColumn = prev.find(col => col.title === targetColumnTitle);
      if (!targetColumn) return prev;

      targetColumnId = targetColumn.id;
      targetColumnTaskCount = targetColumn.tasks.length;

      const sourceColumn = prev.find(col => col.tasks.some(t => t.id === taskId));
      if (!sourceColumn) return prev;

      const task = sourceColumn.tasks.find(t => t.id === taskId);
      if (!task) return prev;

      return prev.map((col) => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (col.id === targetColumn.id) {
          return {
            ...col,
            tasks: [...col.tasks, { ...task, columnId: col.id }],
          };
        }
        return col;
      });
    });

    if (targetColumnId) {
      await moveTask(taskId, targetColumnId, targetColumnTaskCount);
    }
  }, []);

  return (
    <>
      <HowToUse />

      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 -mx-2">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Column
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
            />
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onMoveTask={handleMoveTask}
        task={editingTask}
        columnId={selectedColumnId}
        columnTitle={selectedColumnTitle}
      />
    </>
  );
}
