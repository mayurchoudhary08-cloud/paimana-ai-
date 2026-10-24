import React from 'react';
import { Cpu, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-6 text-gray-500 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-blue-600 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-400">
            <Cpu className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            PAIMANA AI — Predictive Infrastructure Monitoring & Early Warning System
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Simulated Hackathon Prototype Dataset</span>
          </span>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <span className="text-gray-500 dark:text-gray-400">
            Reference standard: MoSPI / OCMS Guidelines
          </span>
        </div>
      </div>
    </footer>
  );
};
