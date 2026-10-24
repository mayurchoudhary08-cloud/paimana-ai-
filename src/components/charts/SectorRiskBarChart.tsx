import React from 'react';
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
import { Project } from '../../types/project';
import { calculateSectorRisk } from '../../utils/calculations';

interface SectorRiskBarChartProps {
  projects: Project[];
}

export const SectorRiskBarChart: React.FC<SectorRiskBarChartProps> = ({ projects }) => {
  const sectorData = calculateSectorRisk(projects);

  const getBarColor = (score: number) => {
    if (score > 75) return '#ef4444'; // Red
    if (score > 50) return '#f97316'; // Orange
    if (score > 25) return '#eab308'; // Yellow
    return '#10b981'; // Green
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-lg text-xs space-y-1 min-w-[180px]">
          <p className="font-bold text-gray-900 dark:text-gray-100">{d.sector}</p>
          <div className="pt-1.5 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Average Risk:</span>
              <strong className="font-mono text-amber-500">{d.averageRisk}/100</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Active Projects:</span>
              <strong className="font-mono text-blue-600 dark:text-blue-400">{d.projectCount}</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Avg Delay:</span>
              <strong className="font-mono text-rose-500">+{d.averageDelayMonths} mo</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (sectorData.length === 0) {
    return (
      <div className="h-[280px] w-full flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs">
        <p className="font-semibold text-gray-700 dark:text-gray-300">No sector risk data available</p>
        <p className="text-[11px] text-gray-400 mt-0.5">Reset filters to analyze sector vulnerability profiles</p>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sectorData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="sector"
            stroke="#94a3b8"
            fontSize={11}
            width={120}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="averageRisk"
            radius={[0, 4, 4, 0]}
            maxBarSize={22}
          >
            {sectorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.averageRisk)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
