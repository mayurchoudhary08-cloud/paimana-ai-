import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Bell, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { MOCK_PROJECTS } from '../../data/projects';
import { calculateRiskScore } from '../../utils/riskScore';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  // Global Ctrl+K / Cmd+K listener to toggle search modal anywhere
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const criticalCount = MOCK_PROJECTS.filter(p => (p.risk_score || calculateRiskScore(p)) > 75).length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95  dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left section: Hamburger & Logo */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              onClick={onToggleSidebar}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-all lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white p-0.5 shadow-sm group-hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white font-sans">
                    PAIMANA <span className="text-blue-600 dark:text-blue-400">AI</span>
                  </span>
                  <span className="hidden sm:inline-block rounded border border-blue-200 bg-blue-50 px-1.5 py-0.2 text-[9px] font-mono font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                    INTEL CORE
                  </span>
                </div>
                <span className="hidden md:inline-block text-[10px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
                  National Predictive Infrastructure Monitoring
                </span>
              </div>
            </Link>
          </div>

          {/* Center search trigger (Ctrl+K) */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-xs text-gray-500 hover:border-blue-500 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-gray-200 transition-all shadow-inner"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Search project name, ID, sector, ministry...</span>
              </span>
              <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-mono text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* Right section: Quick actions, notifications, theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-all md:hidden"
              title="Search"
            >
              <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </button>

            {/* AI Assistant Quick Link */}
            <Link
              to="/ai-assistant"
              className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                location.pathname === '/ai-assistant'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm'
                  : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>AI Copilot</span>
            </Link>

            {/* Notifications Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
              title="Early Warning Notifications"
            >
              <Bell className="h-4 w-4" />
              {criticalCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
              title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-500 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
};
