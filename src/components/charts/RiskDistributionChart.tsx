import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Project } from '../../types/project';
import { calculateRiskScore, getRiskLevel } from '../../utils/riskScore';
import { useTheme } from '../../context/ThemeContext';

interface RiskDistributionChartProps {
  projects: Project[];
}

const COLORS = {
  LOW: '#10b981',      // Emerald
  MODERATE: '#eab308', // Yellow
  HIGH: '#f97316',     // Orange
  CRITICAL: '#ef4444'  // Red
};

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ projects }) => {
  const { theme } = useTheme();
  const counts = {
    LOW: 0,
    MODERATE: 0,
    HIGH: 0,
    CRITICAL: 0
  };

  projects.forEach(p => {
    const score = p.risk_score || calculateRiskScore(p);
    const level = getRiskLevel(score);
    counts[level]++;
  });

  const data = [
    { name: 'Low (0-25)', key: 'LOW', value: counts.LOW, color: COLORS.LOW },
    { name: 'Moderate (26-50)', key: 'MODERATE', value: counts.MODERATE, color: COLORS.MODERATE },
    { name: 'High (51-75)', key: 'HIGH', value: counts.HIGH, color: COLORS.HIGH },
    { name: 'Critical (76-100)', key: 'CRITICAL', value: counts.CRITICAL, color: COLORS.CRITICAL },
  ].filter(d => d.value > 0);

  const total = projects.length || 1;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-lg text-xs">
          <p className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Projects: <strong className="font-mono text-blue-600 dark:text-blue-400">{d.value}</strong> ({((d.value / total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-[280px] w-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">No risk data available</p>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={theme === 'dark' ? '#0f172a' : '#ffffff'}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium ml-1">
                {value} ({entry.payload.value})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center count overlay */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-2xl font-extrabold font-mono text-gray-900 dark:text-gray-100">{total}</span>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Total</p>
      </div>
    </div>
  );
};
