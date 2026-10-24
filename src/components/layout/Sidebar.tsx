import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  ShieldAlert,
  TrendingUp,
  Clock,
  AlertOctagon,
  BarChart3,
  Map,
  Bot,
  FileText,
  Home,
  LucideIcon
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projects';
import { calculateRiskScore } from '../../utils/riskScore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  isHighlight?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const criticalCount = MOCK_PROJECTS.filter(
    p => (p.risk_score || calculateRiskScore(p)) > 75
  ).length;

  const navItems: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { name: 'Portal Home', path: '/', icon: Home },
        { name: 'National Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Project Portfolio', path: '/projects', icon: FolderGit2, badge: `${MOCK_PROJECTS.length}` }
      ]
    },
    {
      group: 'Predictive Intelligence',
      items: [
        { name: 'Risk Analytics', path: '/risk-analytics', icon: ShieldAlert },
        { name: 'Cost Overrun Analytics', path: '/cost-analytics', icon: TrendingUp },
        { name: 'Time & Delay Analytics', path: '/time-analytics', icon: Clock },
        { name: 'Early Warning Center', path: '/early-warnings', icon: AlertOctagon, badge: `${criticalCount} Alert${criticalCount === 1 ? '' : 's'}`, badgeColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800' }
      ]
    },
    {
      group: 'Decision & Spatial Tools',
      items: [
        { name: 'Benchmarking', path: '/benchmarking', icon: BarChart3 },
        { name: 'Geographic Map', path: '/geographic-analytics', icon: Map },
        { name: 'PAIMANA AI Assistant', path: '/ai-assistant', icon: Bot, isHighlight: true },
        { name: 'Executive Reports', path: '/reports', icon: FileText }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 lg:z-30 w-64 border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navItems.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map(item => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300'
                            : item.isHighlight
                            ? 'text-blue-600 hover:bg-blue-50 border border-blue-100 dark:text-blue-400 dark:hover:bg-gray-800 dark:border-gray-800'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                            location.pathname === item.path
                              ? 'text-blue-600 dark:text-blue-400'
                              : item.isHighlight
                              ? 'text-blue-500 dark:text-blue-400'
                              : 'text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold border ${
                            item.badgeColor || 'border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* System status card footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/40">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-3 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
                </span>
                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-300">Live AI Engine</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">ONLINE</span>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              {MOCK_PROJECTS.length} mega projects monitored in active demo stream.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
