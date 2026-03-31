'use server';

import { prisma } from './db';
import { revalidatePath } from 'next/cache';
import type { CreateTaskInput, UpdateTaskInput, Priority } from '@/types';

export async function getColumns() {
  const columns = await prisma.column.findMany({
    orderBy: { order: 'asc' },
    include: {
      tasks: {
        orderBy: { order: 'asc' },
      },
    },
  });
  return columns;
}

export async function createTask(input: CreateTaskInput) {
  const { title, description, priority = 'MEDIUM', dueDate, columnId } = input;

  // Get the max order in the column
  const maxOrder = await prisma.task.aggregate({
    where: { columnId },
    _max: { order: true },
  });

  const newOrder = (maxOrder._max.order ?? -1) + 1;

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,
      priority,
      dueDate: dueDate || null,
      order: newOrder,
      columnId,
    },
  });

  revalidatePath('/');
  return task;
}

export async function updateTask(input: UpdateTaskInput) {
  const { id, ...data } = input;

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
      ...(data.columnId !== undefined && { columnId: data.columnId }),
      ...(data.order !== undefined && { order: data.order }),
    },
  });

  revalidatePath('/');
  return task;
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath('/');
}

export async function moveTask(
  taskId: string,
  targetColumnId: string,
  newOrder: number
) {
  // Get the task's current position
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error('Task not found');
  }

  const oldColumnId = task.columnId;
  const oldOrder = task.order;

  // If moving within the same column
  if (oldColumnId === targetColumnId) {
    if (newOrder > oldOrder) {
      // Moving down: decrement order of tasks between old and new position
      await prisma.task.updateMany({
        where: {
          columnId: targetColumnId,
          order: { gt: oldOrder, lte: newOrder },
        },
        data: { order: { decrement: 1 } },
      });
    } else if (newOrder < oldOrder) {
      // Moving up: increment order of tasks between new and old position
      await prisma.task.updateMany({
        where: {
          columnId: targetColumnId,
          order: { gte: newOrder, lt: oldOrder },
        },
        data: { order: { increment: 1 } },
      });
    }
  } else {
    // Moving to a different column
    // Decrement order of tasks after the old position in old column
    await prisma.task.updateMany({
      where: {
        columnId: oldColumnId,
        order: { gt: oldOrder },
      },
      data: { order: { decrement: 1 } },
    });

    // Increment order of tasks at and after new position in target column
    await prisma.task.updateMany({
      where: {
        columnId: targetColumnId,
        order: { gte: newOrder },
      },
      data: { order: { increment: 1 } },
    });
  }

  // Update the task's position
  await prisma.task.update({
    where: { id: taskId },
    data: {
      columnId: targetColumnId,
      order: newOrder,
    },
  });

  revalidatePath('/');
}
