'use client';

import { useState } from 'react';

export function HowToUse() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300
          bg-slate-800/60 hover:bg-slate-700/60 rounded-xl border border-slate-700/50
          transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
        How to Use
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 p-5 bg-slate-800/60 rounded-2xl border border-slate-700/50 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Create Tasks */}
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-100">Create Tasks</h3>
              </div>
              <p className="text-sm text-gray-400">
                Click the <span className="text-blue-400 font-medium">+</span> button on To Do or In Progress columns to add new tasks.
              </p>
            </div>

            {/* Start Tasks */}
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-100">Start Tasks</h3>
              </div>
              <p className="text-sm text-gray-400">
                Click a task in To Do, then press <span className="text-amber-400 font-medium">Start</span> to move it to In Progress.
              </p>
            </div>

            {/* Complete Tasks */}
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-100">Complete / Revert</h3>
              </div>
              <p className="text-sm text-gray-400">
                Press <span className="text-emerald-400 font-medium">Complete</span> to finish a task, or <span className="text-blue-400 font-medium">Revert</span> to move it back to To Do.
              </p>
            </div>

            {/* Priority Levels */}
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-100">Priority</h3>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Low</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>Medium</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>High</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
