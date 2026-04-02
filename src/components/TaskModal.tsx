'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Task, Priority, CreateTaskInput, UpdateTaskInput } from '@/types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  task?: Task | null;
  columnId: string;
}

export function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  columnId,
}: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority as Priority);
      setDueDate(
        task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : ''
      );
    } else {
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setDueDate('');
    }
    setShowDeleteConfirm(false);
  }, [task, isOpen]);

  const handleClose = useCallback(() => {
    setShowDeleteConfirm(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsLoading(true);
    try {
      if (isEditing && task) {
        await onSave({
          id: task.id,
          title: title.trim(),
          description: description.trim() || null,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
        });
      } else {
        await onSave({
          title: title.trim(),
          description: description.trim() || undefined,
          priority,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          columnId,
        });
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !onDelete) return;

    setIsLoading(true);
    try {
      await onDelete(task.id);
      handleClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10" />
          <div className="relative flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {isEditing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-100">
                {isEditing ? 'Edit Task' : 'New Task'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-600 rounded-xl
                bg-slate-700/50 text-gray-100
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                placeholder:text-gray-500
                transition-all duration-200"
              placeholder="What needs to be done?"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-600 rounded-xl
                bg-slate-700/50 text-gray-100
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                placeholder:text-gray-500
                transition-all duration-200 resize-none"
              placeholder="Add more details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-4 py-3 border border-slate-600 rounded-xl
                    bg-slate-700/50 text-gray-100
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="LOW">🔵 Low</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HIGH">🔴 High</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-slate-600 rounded-xl
                  bg-slate-700/50 text-gray-100
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-700">
            {isEditing && onDelete ? (
              showDeleteConfirm ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <span className="text-sm font-medium text-red-400">
                    Confirm delete?
                  </span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600
                      rounded-lg hover:from-red-600 hover:to-rose-700 shadow-md shadow-red-500/20
                      disabled:opacity-50 transition-all duration-200"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-400
                      hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400
                    hover:bg-red-900/20 rounded-xl transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Delete
                </button>
              )
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-400
                  hover:bg-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !title.trim()}
                className="px-5 py-2.5 text-sm font-medium text-white
                  bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl
                  hover:from-indigo-600 hover:to-purple-700
                  shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:shadow-none transition-all duration-200
                  hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : isEditing ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
