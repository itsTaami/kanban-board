import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Kanban Board | Task Management',
  description: 'A beautiful drag-and-drop kanban board for organizing your tasks and projects. Built with Next.js 14, TypeScript, and Tailwind CSS.',
  keywords: ['kanban', 'task management', 'productivity', 'project management'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
