'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  totalTasks: number;
  completedTasks: number;
}

const quotes = [
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Small progress is still progress.",
  "Done is better than perfect.",
  "One task at a time. One day at a time.",
  "Your future is created by what you do today.",
  "Discipline is choosing between what you want now and what you want most.",
  "The only way to do great work is to love what you do.",
];

export function Header({ totalTasks, completedTasks }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      // Set greeting based on time
      if (hours < 12) {
        setGreeting('Good morning');
      } else if (hours < 17) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }

      // Format time
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );

      // Format date
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!mounted) {
    return <div className="h-40" />;
  }

  return (
    <header className="mb-8 animate-fade-in">
      {/* Top row: Time and Date */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 animate-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white neon-text">
              Kanban Board
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {greeting} — {currentDate}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {/* Time display */}
          <div className="text-right">
            <p className="text-4xl font-bold text-white tracking-tight">{currentTime}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Local Time</p>
          </div>

          {/* Progress circle */}
          <div className="relative w-20 h-20">
            <svg className="progress-ring w-20 h-20" viewBox="0 0 80 80">
              <circle
                className="text-slate-700"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
              />
              <circle
                className="text-indigo-500 progress-ring__circle"
                strokeWidth="6"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational quote */}
      <div className="glass rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-amber-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </div>
          <p className="quote-text text-sm md:text-base font-medium italic">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Today's Progress</span>
          <span>{completedTasks}/{totalTasks} tasks</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Stats cards - Mobile */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        <div className="stat-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-white">{totalTasks}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="stat-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{totalTasks - completedTasks}</p>
          <p className="text-xs text-gray-400">Remaining</p>
        </div>
        <div className="stat-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-400">{completedTasks}</p>
          <p className="text-xs text-gray-400">Done</p>
        </div>
      </div>
    </header>
  );
}
