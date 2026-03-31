'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { createTask, updateTask, deleteTask, moveTask } from '@/lib/actions';
import type { Column as ColumnType, Task, CreateTaskInput, UpdateTaskInput } from '@/types';

interface BoardProps {
  initialColumns: ColumnType[];
}

export function Board({ initialColumns }: BoardProps) {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const findColumnByTaskId = useCallback(
    (taskId: string) => {
      return columns.find((col) => col.tasks.some((task) => task.id === taskId));
    },
    [columns]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const task = active.data.current?.task as Task;
    if (task) {
      setActiveTask(task);
    }
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeColumn = findColumnByTaskId(activeId);
      const overColumn =
        columns.find((col) => col.id === overId) || findColumnByTaskId(overId);

      if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) {
        return;
      }

      setColumns((prev) => {
        const activeTaskIndex = activeColumn.tasks.findIndex(
          (t) => t.id === activeId
        );
        const activeTaskData = activeColumn.tasks[activeTaskIndex];

        return prev.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== activeId),
            };
          }
          if (col.id === overColumn.id) {
            const overTaskIndex = col.tasks.findIndex((t) => t.id === overId);
            const newTasks = [...col.tasks];
            const insertIndex =
              overTaskIndex >= 0 ? overTaskIndex : col.tasks.length;
            newTasks.splice(insertIndex, 0, {
              ...activeTaskData,
              columnId: col.id,
            });
            return {
              ...col,
              tasks: newTasks,
            };
          }
          return col;
        });
      });
    },
    [columns, findColumnByTaskId]
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeColumn = findColumnByTaskId(activeId);
      const overColumn =
        columns.find((col) => col.id === overId) || findColumnByTaskId(overId);

      if (!activeColumn || !overColumn) return;

      const activeTaskIndex = activeColumn.tasks.findIndex(
        (t) => t.id === activeId
      );
      const overTaskIndex =
        overColumn.id === overId
          ? overColumn.tasks.length
          : overColumn.tasks.findIndex((t) => t.id === overId);

      if (activeColumn.id === overColumn.id) {
        // Same column - just reorder
        if (activeTaskIndex !== overTaskIndex) {
          setColumns((prev) =>
            prev.map((col) => {
              if (col.id === activeColumn.id) {
                return {
                  ...col,
                  tasks: arrayMove(col.tasks, activeTaskIndex, overTaskIndex),
                };
              }
              return col;
            })
          );

          // Persist to database
          const newOrder =
            overTaskIndex >= 0 ? overTaskIndex : overColumn.tasks.length;
          await moveTask(activeId, overColumn.id, newOrder);
        }
      } else {
        // Different column - move task
        const newOrder =
          overTaskIndex >= 0 ? overTaskIndex : overColumn.tasks.length;
        await moveTask(activeId, overColumn.id, newOrder);
      }
    },
    [columns, findColumnByTaskId]
  );

  const handleAddTask = useCallback((columnId: string) => {
    setSelectedColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setSelectedColumnId(task.columnId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSaveTask = useCallback(
    async (data: CreateTaskInput | UpdateTaskInput) => {
      if ('id' in data) {
        // Update existing task
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
        // Create new task
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

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              isDragOverlay
            />
          )}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={editingTask}
        columnId={selectedColumnId}
      />
    </>
  );
}
