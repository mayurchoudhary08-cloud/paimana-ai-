import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Project } from '../../types/project';

interface MonthlyProgressChartProps {
  projects: Project[];
}

export const MonthlyProgressChart: React.FC<MonthlyProgressChartProps> = ({ projects }) => {
  // Aggregate progression curves dynamically across active portfolio scope
  const defaultHistory = [
    { month: 'Oct 23', planned: 52, actual: 48, rate: 2.1 },
    { month: 'Nov 23', planned: 56, actual: 51, rate: 2.3 },
    { month: 'Dec 23', planned: 61, actual: 54, rate: 2.0 },
    { month: 'Jan 24', planned: 66, actual: 58, rate: 2.4 },
    { month: 'Feb 24', planned: 71, actual: 62, rate: 2.5 },
    { month: 'Mar 24', planned: 76, actual: 66, rate: 2.6 },
    { month: 'Apr 24', planned: 80, actual: 70, rate: 2.3 },
    { month: 'May 24', planned: 85, actual: 73, rate: 2.2 },
    { month: 'Jun 24', planned: 89, actual: 77, rate: 2.5 },
    { month: 'Jul 24', planned: 93, actual: 80, rate: 2.4 },
    { month: 'Aug 24', planned: 96, actual: 83, rate: 2.1 },
    { month: 'Sep 24', planned: 100, actual: 86, rate: 2.2 }
  ];

  const chartData = React.useMemo(() => {
    const projectsWithHistory = projects.filter(p => p.progress_history && p.progress_history.length > 0);
    if (projectsWithHistory.length === 0) {
      return defaultHistory;
    }

    const monthMap: Record<string, { plannedSum: number; actualSum: number; count: number }> = {};
    const monthOrder: string[] = [];

    projectsWithHistory.forEach(p => {
      p.progress_history?.forEach(h => {
        if (!monthMap[h.month]) {
          monthMap[h.month] = { plannedSum: 0, actualSum: 0, count: 0 };
          monthOrder.push(h.month);
        }
        monthMap[h.month].plannedSum += h.planned;
        monthMap[h.month].actualSum += h.actual;
        monthMap[h.month].count += 1;
      });
    });

    return monthOrder.map(month => ({
      month,
      planned: Number((monthMap[month].plannedSum / monthMap[month].count).toFixed(1)),
      actual: Number((monthMap[month].actualSum / monthMap[month].count).toFixed(1))
    }));
  }, [projects]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const planned = payload.find((p: any) => p.dataKey === 'planned')?.value;
      const actual = payload.find((p: any) => p.dataKey === 'actual')?.value;
      const gap = planned && actual ? (planned - actual).toFixed(1) : 0;

      return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-lg text-xs space-y-1.5 min-w-[170px]">
          <p className="font-bold text-gray-900 dark:text-gray-100">{label}</p>
          <div className="pt-1.5 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Target Physical:</span>
              <strong className="font-mono text-blue-600 dark:text-blue-400">{planned}%</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Actual Progress:</span>
              <strong className="font-mono text-emerald-400">{actual}%</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Progress Gap:</span>
              <strong className="font-mono text-amber-400">-{gap}%</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px' }}
            formatter={(value) => (
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium ml-1">
                {value === 'planned' ? 'Planned Baseline Target' : 'Actual Monitored Progress'}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="planned"
            stroke="#06b6d4"
            strokeWidth={2}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#colorPlanned)"
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorActual)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
