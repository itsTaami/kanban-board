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
      // To Do tasks
      {
        title: 'Research API integration options',
        description: 'Evaluate REST vs GraphQL for the backend API. Consider performance, caching, and developer experience.',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        order: 0,
        columnId: todoColumn.id,
      },
      {
        title: 'Design user authentication flow',
        description: 'Create wireframes for login, registration, and password reset screens.',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        order: 1,
        columnId: todoColumn.id,
      },
      {
        title: 'Write unit tests for components',
        description: 'Add Jest and React Testing Library tests for all UI components.',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        order: 2,
        columnId: todoColumn.id,
      },
      {
        title: 'Optimize images and assets',
        description: 'Compress images, implement lazy loading, and set up CDN.',
        priority: 'LOW',
        order: 3,
        columnId: todoColumn.id,
      },
      // In Progress tasks
      {
        title: 'Build responsive navigation',
        description: 'Create mobile-first navigation with hamburger menu and smooth transitions.',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        order: 0,
        columnId: inProgressColumn.id,
      },
      {
        title: 'Implement dark mode toggle',
        description: 'Add theme switching functionality with system preference detection.',
        priority: 'MEDIUM',
        order: 1,
        columnId: inProgressColumn.id,
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        order: 2,
        columnId: inProgressColumn.id,
      },
      // Done tasks
      {
        title: 'Initialize project repository',
        description: 'Set up Next.js 14 with TypeScript, Tailwind CSS, and ESLint configuration.',
        priority: 'HIGH',
        order: 0,
        columnId: doneColumn.id,
      },
      {
        title: 'Design database schema',
        description: 'Created Prisma models for columns, tasks, and relationships.',
        priority: 'HIGH',
        order: 1,
        columnId: doneColumn.id,
      },
      {
        title: 'Implement drag and drop',
        description: 'Integrated @dnd-kit for smooth task reordering between columns.',
        priority: 'MEDIUM',
        order: 2,
        columnId: doneColumn.id,
      },
      {
        title: 'Create task management UI',
        description: 'Built modal for creating and editing tasks with form validation.',
        priority: 'MEDIUM',
        order: 3,
        columnId: doneColumn.id,
      },
      {
        title: 'Add priority indicators',
        description: 'Implemented color-coded priority badges for visual task organization.',
        priority: 'LOW',
        order: 4,
        columnId: doneColumn.id,
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
