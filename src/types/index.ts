export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  dueDate: Date | null;
  order: number;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardData {
  columns: Column[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date | null;
  columnId: string;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string | null;
  priority?: Priority;
  dueDate?: Date | null;
  columnId?: string;
  order?: number;
}
