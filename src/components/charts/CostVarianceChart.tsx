import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Project } from '../../types/project';
import { formatCurrency } from '../../utils/calculations';

interface CostVarianceChartProps {
  projects: Project[];
  limit?: number;
}

export const CostVarianceChart: React.FC<CostVarianceChartProps> = ({ projects, limit = 8 }) => {
  const sorted = [...projects]
    .sort((a, b) => (b.revised_cost || b.approved_cost) - (a.revised_cost || a.approved_cost))
    .slice(0, limit);

  const data = sorted.map(p => ({
    name: p.project_name.length > 22 ? p.project_name.slice(0, 20) + '...' : p.project_name,
    fullName: p.project_name,
    id: p.project_id,
    approved: p.approved_cost,
    revised: p.revised_cost || p.approved_cost,
    variance: (p.revised_cost || p.approved_cost) - p.approved_cost,
    expenditure: p.expenditure
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-lg text-xs space-y-1.5 min-w-[220px]">
          <p className="font-bold text-gray-900 dark:text-gray-100">{d.fullName}</p>
          <p className="font-mono text-[11px] text-blue-600 dark:text-blue-400">{d.id}</p>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Approved Cost:</span>
              <strong className="font-mono text-blue-600 dark:text-blue-400">{formatCurrency(d.approved)}</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Revised Cost:</span>
              <strong className="font-mono text-amber-600 dark:text-amber-400">{formatCurrency(d.revised)}</strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Cumulative Variance:</span>
              <strong className={`font-mono ${d.variance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {formatCurrency(d.variance, { showSign: true })}
              </strong>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Expenditure:</span>
              <strong className="font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(d.expenditure)}</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-[320px] w-full flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs">
        <p className="font-semibold text-gray-700 dark:text-gray-300">No project cost data available</p>
        <p className="text-[11px] text-gray-400 mt-0.5">Adjust filter criteria to view cost variance analytics</p>
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            tickFormatter={(val) => `₹${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}Cr`}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px' }}
            formatter={(value) => (
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium ml-1">
                {value === 'approved' ? 'Approved Cost' : 'Revised Cost'}
              </span>
            )}
          />
          <Bar dataKey="approved" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
          <Bar dataKey="revised" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
