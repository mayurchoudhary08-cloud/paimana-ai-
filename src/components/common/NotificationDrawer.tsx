import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bell, AlertOctagon, TrendingUp, Clock, AlertTriangle, ArrowRight, CheckCheck } from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projects';
import { calculateRiskScore, getRiskLevel } from '../../utils/riskScore';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Generate dynamic alerts from high risk and delayed projects
  const alerts = MOCK_PROJECTS.flatMap(p => {
    const score = p.risk_score || calculateRiskScore(p);
    const level = getRiskLevel(score);
    const list = [];

    if (score > 75) {
      list.push({
        id: `crit-${p.project_id}`,
        projectId: p.project_id,
        projectName: p.project_name,
        type: 'CRITICAL',
        title: `Critical Risk Alert (${score}/100)`,
        description: `Project has exceeded critical thresholds with ${p.time_variance}mo delay and ₹${p.cost_variance} Cr cost revision.`,
        time: '12m ago',
        level: level,
        icon: AlertOctagon,
        iconColor: 'text-red-400 bg-red-500/10 border-red-500/30'
      });
    }

    if (p.cost_variance > 5000) {
      list.push({
        id: `cost-${p.project_id}`,
        projectId: p.project_id,
        projectName: p.project_name,
        type: 'COST',
        title: `Major Cost Escalation Detected`,
        description: `Approved cost ₹${p.approved_cost} Cr escalated by ₹${p.cost_variance} Cr (+${(((p.revised_cost - p.approved_cost) / p.approved_cost) * 100).toFixed(1)}%).`,
        time: '1h ago',
        level: level,
        icon: TrendingUp,
        iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      });
    }

    if (p.delayed_milestones > 3) {
      list.push({
        id: `delay-${p.project_id}`,
        projectId: p.project_id,
        projectName: p.project_name,
        type: 'SCHEDULE',
        title: `Multiple Milestone Slippages (${p.delayed_milestones} Delayed)`,
        description: `${p.delayed_milestones} out of ${p.total_milestones} key milestones are behind scheduled targets.`,
        time: '3h ago',
        level: level,
        icon: Clock,
        iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
      });
    }

    return list;
  }).slice(0, 12);

  if (!isOpen) return null;

  const handleOpenProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Live Warning Feed</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Automated early warning telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/early-warnings')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:text-blue-300 font-medium px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800"
            >
              Full Feed
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-gray-200 dark:divide-gray-800">
          {alerts.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenProject(item.projectId)}
                className="pt-3 first:pt-0 group rounded-xl p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:bg-gray-100 dark:bg-gray-800 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border shrink-0 ${item.iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                        {item.projectId}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                        {item.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:text-blue-300 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <span className="truncate max-w-[200px] text-gray-500 dark:text-gray-400 font-medium">
                        {item.projectName}
                      </span>
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Inspect <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{alerts.length} active warning signals</span>
          <button
            onClick={() => {
              navigate('/early-warnings');
              onClose();
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:text-blue-300 font-medium flex items-center gap-1"
          >
            Early Warnings Dashboard <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
