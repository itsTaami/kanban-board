# Kanban Board

A drag-and-drop kanban board built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Drag and Drop**: Reorder tasks within columns or move them between columns using @dnd-kit
- **Task Management**: Create, edit, and delete tasks with title, description, priority, and due date
- **Dark Theme**: Beautiful dark-themed UI with gradient accents
- **Persistent Storage**: SQLite database with Prisma ORM
- **Responsive Design**: Works on desktop and mobile devices
- **Progress Tracking**: Visual stats showing total tasks, completed tasks, and progress percentage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Prisma + SQLite
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kanban-board
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Seed the database with sample data (optional):
   ```bash
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Task
1. Click the **+** button in any column header (To Do, In Progress, or Done)
2. Fill in the task details:
   - **Title** (required): Enter a descriptive task name
   - **Description** (optional): Add more details about the task
   - **Priority**: Select Low, Medium, or High
   - **Due Date** (optional): Set a deadline
3. Click **Create Task** to save

### Editing a Task
1. Click on any task card to open the edit modal
2. Modify the task details as needed
3. Click **Save Changes** to update

### Deleting a Task
1. Click on a task card to open the edit modal
2. Click **Delete Task** at the bottom left
3. Confirm deletion by clicking **Yes**

### Moving Tasks (Drag and Drop)
- **Between columns**: Drag a task card and drop it into another column to change its status
- **Reorder within column**: Drag a task up or down within the same column to change its priority order

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
kanban-board/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.ts            # Seed script
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main board page
│   │   └── globals.css    # Tailwind styles
│   ├── components/
│   │   ├── Board.tsx      # Main kanban board with DnD
│   │   ├── Column.tsx     # Single column component
│   │   ├── TaskCard.tsx   # Draggable task card
│   │   └── TaskModal.tsx  # Create/Edit task modal
│   ├── lib/
│   │   ├── db.ts          # Prisma client singleton
│   │   └── actions.ts     # Server actions (CRUD)
│   └── types/
│       └── index.ts       # TypeScript types
└── package.json
```

## License

MIT
