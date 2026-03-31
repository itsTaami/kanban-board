# Kanban Board

A drag-and-drop kanban board built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Drag and Drop**: Reorder tasks within columns or move them between columns using @dnd-kit
- **Task Management**: Create, edit, and delete tasks with title, description, priority, and due date
- **Dark Mode**: Toggle between light and dark themes
- **Persistent Storage**: SQLite database with Prisma ORM
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Prisma + SQLite
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable
- **Theming**: next-themes

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
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Main board page
│   │   └── globals.css    # Tailwind + dark mode styles
│   ├── components/
│   │   ├── Board.tsx      # Main kanban board with DnD
│   │   ├── Column.tsx     # Single column component
│   │   ├── TaskCard.tsx   # Draggable task card
│   │   ├── TaskModal.tsx  # Create/Edit task modal
│   │   ├── ThemeToggle.tsx
│   │   └── providers/
│   │       └── ThemeProvider.tsx
│   ├── lib/
│   │   ├── db.ts          # Prisma client singleton
│   │   └── actions.ts     # Server actions (CRUD)
│   └── types/
│       └── index.ts       # TypeScript types
└── package.json
```

## License

MIT
