import React from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { KPICard } from '../components/common/KPICard';
import { MonthlyProgressChart } from '../components/charts/MonthlyProgressChart';
import { calculateDelayMonths, calculateSectorRisk } from '../utils/calculations';
import {
  Clock,
  Calendar,
  AlertOctagon,
  TrendingDown,
  Layers,
  BarChart2,
  CheckCircle2,
  Hourglass
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const TimeAnalytics: React.FC = () => {
  const { filteredProjects } = useFilters();

  const delayData = calculateDelayMonths(filteredProjects);
  const sectorData = calculateSectorRisk(filteredProjects);

  const delayedProjects = [...filteredProjects]
    .filter(p => (p.time_variance || 0) > 0)
    .sort((a, b) => (b.time_variance || 0) - (a.time_variance || 0));

  const chartData = delayedProjects.slice(0, 10).map(p => ({
    name: p.project_name.length > 20 ? p.project_name.slice(0, 18) + '...' : p.project_name,
    fullName: p.project_name,
    delay: p.time_variance,
    planned: p.planned_completion,
    expected: p.expected_completion,
    sector: p.sector
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Time Overrun & Schedule Slippage Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tracking execution milestones, timeline drift, and predictive commissioning dates.
          </p>
        </div>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Average Schedule Delay"
          value={`${delayData.averageDelay} Mo`}
          subtitle="Across active portfolio scope"
          icon={Clock}
          accentColor="red"
        />

        <KPICard
          title="Maximum Slippage"
          value={`${delayData.maxDelay} Mo`}
          subtitle="Recorded in single project"
          icon={AlertOctagon}
          accentColor="amber"
        />

        <KPICard
          title="Projects Facing Delay"
          value={delayData.delayedProjectsCount}
          subtitle={`${((delayData.delayedProjectsCount / Math.max(1, filteredProjects.length)) * 100).toFixed(0)}% of tracked projects`}
          icon={Hourglass}
          accentColor="purple"
        />

        <KPICard
          title="On-Schedule Projects"
          value={filteredProjects.length - delayData.delayedProjectsCount}
          subtitle="Tracking strictly on-time"
          icon={CheckCircle2}
          accentColor="emerald"
        />
      </div>

      {/* Primary Chart: Top Project Delays */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Top Schedule Delays by Project</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Recorded slippage in months from original planned commissioning baseline</p>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="py-14 text-center text-gray-500 dark:text-gray-400 text-xs">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">No project delays in current filter scope</p>
            <p className="text-[11px] text-gray-400 mt-0.5">All monitored assets are tracking strictly on schedule.</p>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={11}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(val) => `${val} mo`}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-lg text-xs space-y-1.5 min-w-[200px]">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{d.fullName}</p>
                          <p className="text-gray-500 dark:text-gray-400">{d.sector}</p>
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Original Target:</span>
                              <strong className="font-mono text-blue-600 dark:text-blue-400">{d.planned}</strong>
                            </div>
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Revised Target:</span>
                              <strong className="font-mono text-amber-400">{d.expected}</strong>
                            </div>
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Total Slippage:</span>
                              <strong className="font-mono text-rose-400">+{d.delay} Months</strong>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="delay" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={32}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Progress Trends and Sector Delays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Trajectory */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Physical Progress Velocity Trajectory</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Target vs actual delivery curves</p>
            </div>
          </div>
          <MonthlyProgressChart projects={filteredProjects} />
        </div>

        {/* Sector Schedule Slippage */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
            Average Delay by Sector (Months)
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {sectorData.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">No sector data available</p>
            ) : (
              sectorData.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{sec.sector}</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{sec.projectCount} active projects</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-rose-400">+{sec.averageDelayMonths} Mo</span>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Average Delay</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
