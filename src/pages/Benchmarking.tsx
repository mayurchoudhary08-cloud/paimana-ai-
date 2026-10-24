import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { calculateSectorRisk, calculateMinistryRisk, calculateStateRisk, formatCurrency } from '../utils/calculations';
import { RiskBadge } from '../components/common/RiskBadge';
import { getRiskLevel } from '../utils/riskScore';
import {
  BarChart3,
  Layers,
  Building,
  MapPin
} from 'lucide-react';
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

export const Benchmarking: React.FC = () => {
  const { filteredProjects } = useFilters();
  const [dimension, setDimension] = useState<'SECTOR' | 'MINISTRY' | 'STATE'>('SECTOR');

  const sectorData = calculateSectorRisk(filteredProjects);
  const ministryData = calculateMinistryRisk(filteredProjects);
  const stateData = calculateStateRisk(filteredProjects);

  const activeData: { name: string; fullName: string; risk: number; delay: number; cost: number; count: number }[] =
    dimension === 'SECTOR'
      ? sectorData.map(d => ({
          name: d.sector,
          fullName: d.sector,
          risk: d.averageRisk,
          delay: d.averageDelayMonths,
          cost: d.totalCostCr,
          count: d.projectCount
        }))
      : dimension === 'MINISTRY'
      ? ministryData.map(d => ({
          name: d.ministry.length > 20 ? d.ministry.slice(0, 18) + '...' : d.ministry,
          fullName: d.ministry,
          risk: d.averageRisk,
          delay: d.averageDelayMonths,
          cost: d.totalCostCr,
          count: d.projectCount
        }))
      : stateData.map(d => ({
          name: d.state,
          fullName: d.state,
          risk: d.averageRisk,
          delay: d.averageDelayMonths,
          cost: d.totalCostCr,
          count: d.projectCount
        }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Cross-Dimensional Infrastructure Benchmarking
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Neutral comparative analytics across ministries, sectors, and states to identify delivery velocity and variance.
          </p>
        </div>
      </div>

      <FilterBar />

      {/* Dimension Switcher */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
        <button
          onClick={() => setDimension('SECTOR')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            dimension === 'SECTOR'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Sector Benchmarking</span>
        </button>

        <button
          onClick={() => setDimension('MINISTRY')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            dimension === 'MINISTRY'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <Building className="h-4 w-4" />
          <span>Ministry Benchmarking</span>
        </button>

        <button
          onClick={() => setDimension('STATE')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            dimension === 'STATE'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>State Benchmarking</span>
        </button>
      </div>

      {/* Primary Comparative Chart */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Comparative Risk & Performance Matrix ({dimension})
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Average Composite Risk Score (0-100) vs Delay (Months)</p>
          </div>
        </div>

        {activeData.length === 0 ? (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400 text-xs">
            <p className="font-semibold text-gray-700 dark:text-gray-300">No project data for current filter criteria</p>
            <p className="text-[11px] text-gray-400 mt-1">Try resetting or broadening your filters above.</p>
          </div>
        ) : (
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeData}
                margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
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
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-lg text-xs space-y-1.5 min-w-[200px]">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{d.fullName || d.name}</p>
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Tracked Assets:</span>
                              <strong className="font-mono text-blue-600 dark:text-blue-400">{d.count} Projects</strong>
                            </div>
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Average Risk Score:</span>
                              <strong className="font-mono text-amber-400">{d.risk}/100</strong>
                            </div>
                            {d.delay > 0 && (
                              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                <span>Average Delay:</span>
                                <strong className="font-mono text-rose-400">+{d.delay} Mo</strong>
                              </div>
                            )}
                            <div className="flex justify-between text-gray-700 dark:text-gray-300">
                              <span>Total Capital:</span>
                              <strong className="font-mono text-blue-400">{formatCurrency(d.cost)}</strong>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px' }} />
                <Bar dataKey="risk" name="Average Risk Score" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="delay" name="Average Delay (Months)" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Comparative Cards Grid */}
      {activeData.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          No benchmark data available for this dimension with the current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeData.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 space-y-3 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate max-w-[180px]">
                  {item.fullName || item.name}
                </h4>
                <RiskBadge level={getRiskLevel(item.risk)} score={item.risk} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-800 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">Active Assets</span>
                  <p className="font-mono font-bold text-gray-800 dark:text-gray-200">{item.count} Projects</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">Total Outlay</span>
                  <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{formatCurrency(item.cost)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
