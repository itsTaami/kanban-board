import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.column.deleteMany();

  // Create default columns
  const todoColumn = await prisma.column.create({
    data: {
      title: 'To Do',
      order: 0,
    },
  });

  const inProgressColumn = await prisma.column.create({
    data: {
      title: 'In Progress',
      order: 1,
    },
  });

  const doneColumn = await prisma.column.create({
    data: {
      title: 'Done',
      order: 2,
    },
  });

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Set up project structure',
        description: 'Initialize Next.js with TypeScript and Tailwind CSS',
        priority: 'HIGH',
        order: 0,
        columnId: doneColumn.id,
      },
      {
        title: 'Design database schema',
        description: 'Create Prisma models for columns and tasks',
        priority: 'HIGH',
        order: 1,
        columnId: doneColumn.id,
      },
      {
        title: 'Implement drag and drop',
        description: 'Add @dnd-kit for task reordering between columns',
        priority: 'MEDIUM',
        order: 0,
        columnId: inProgressColumn.id,
      },
      {
        title: 'Add task modal',
        description: 'Create modal for creating and editing tasks',
        priority: 'MEDIUM',
        order: 1,
        columnId: inProgressColumn.id,
      },
      {
        title: 'Write documentation',
        description: 'Add README with setup instructions',
        priority: 'LOW',
        order: 0,
        columnId: todoColumn.id,
      },
      {
        title: 'Add due date reminders',
        description: 'Highlight tasks that are due soon or overdue',
        priority: 'LOW',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        order: 1,
        columnId: todoColumn.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
