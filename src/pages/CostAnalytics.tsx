import React from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { KPICard } from '../components/common/KPICard';
import { CostVarianceChart } from '../components/charts/CostVarianceChart';
import {
  calculateTotalApprovedCost,
  calculateTotalRevisedCost,
  calculateTotalExpenditure,
  calculateCostVariance,
  formatCurrency,
  calculateSectorRisk,
  calculateMinistryRisk
} from '../utils/calculations';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Building,
  Layers,
  PieChart as PieIcon,
  BarChart3,
  Percent
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

export const CostAnalytics: React.FC = () => {
  const { filteredProjects } = useFilters();

  const totalApproved = calculateTotalApprovedCost(filteredProjects);
  const totalRevised = calculateTotalRevisedCost(filteredProjects);
  const totalExpenditure = calculateTotalExpenditure(filteredProjects);
  const varianceData = calculateCostVariance(filteredProjects);
  const projectsWithCostRisk = filteredProjects.filter(
    p => (p.revised_cost || p.approved_cost) > p.approved_cost
  ).length;

  // Cost Escalation Drivers
  const costDrivers = [
    { driver: 'Raw Material & Commodity Price Escalation', pct: 34, impact: 'High Impact', desc: 'Steel, cement, and fuel index escalations in long-gestation civil EPC contracts.' },
    { driver: 'Land Acquisition & R&R Compensation Packages', pct: 28, impact: 'High Impact', desc: 'Higher compensation claims, urban land valuation updates, and tribal rehabilitation.' },
    { driver: 'Engineering Scope Expansion & Alignment Changes', pct: 18, impact: 'Moderate Impact', desc: 'Addition of elevated viaducts, additional spurs, and underground utility diversions.' },
    { driver: 'Contract Variations & Dispute Claims', pct: 10, impact: 'Moderate Impact', desc: 'Contractor idling claims, change-in-law compensations, and currency exchange volatility.' },
    { driver: 'Delayed Execution Overhead & Financing Charges', pct: 7, impact: 'Low Impact', desc: 'Prolonged project management overheads, IDC (Interest During Construction).' },
    { driver: 'Resource Constraints & Geological Surprises', pct: 3, impact: 'Low Impact', desc: 'Rock burst stabilization, river foundation changes, specialized crane mobilizations.' }
  ];

  const sectorData = calculateSectorRisk(filteredProjects);
  const ministryData = calculateMinistryRisk(filteredProjects);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Cost Escalation & Overrun Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Surveillance of capital outlay variances, CCEA sanction revisions, and expenditure absorption.
          </p>
        </div>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Approved Cost"
          value={formatCurrency(totalApproved)}
          subtitle="Original sanctioned capital"
          icon={DollarSign}
          accentColor="blue"
        />

        <KPICard
          title="Revised Cost"
          value={formatCurrency(totalRevised)}
          subtitle="Current estimated completion cost"
          icon={TrendingUp}
          accentColor="amber"
        />

        <KPICard
          title="Cumulative Expenditure"
          value={formatCurrency(totalExpenditure)}
          subtitle={`${((totalExpenditure / Math.max(1, totalRevised)) * 100).toFixed(1)}% financial absorption`}
          icon={DollarSign}
          accentColor="emerald"
        />

        <KPICard
          title="Average Cost Variance"
          value={`${varianceData.averageVariancePercentage > 0 ? '+' : ''}${varianceData.averageVariancePercentage}%`}
          subtitle={`${formatCurrency(varianceData.totalVarianceCr, { showSign: true })} total escalation`}
          icon={Percent}
          accentColor="red"
          trend={{ value: `${projectsWithCostRisk} Escalated`, isPositive: false }}
        />

        <KPICard
          title="Projects With Cost Risk"
          value={projectsWithCostRisk}
          subtitle={`out of ${filteredProjects.length} projects`}
          icon={AlertTriangle}
          accentColor="purple"
        />
      </div>

      {/* Primary Chart: Approved vs Revised */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Top Cost Escalations Across Active Portfolio</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Comparing baseline sanctioned cost with revised anticipated cost (₹ Crores)</p>
          </div>
        </div>
        <CostVarianceChart projects={filteredProjects} limit={10} />
      </div>

      {/* Cost Escalation Drivers Breakdown */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  space-y-5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Macro Drivers of Infrastructure Cost Escalation</h3>
          </div>
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
            Portfolio Decomposition
          </span>
        </div>

        <div className="space-y-4">
          {costDrivers.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-800 dark:text-gray-200">{item.driver}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.impact}</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{item.pct}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-50 dark:bg-gray-950 rounded-full h-2.5 overflow-hidden border border-gray-200 dark:border-gray-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${item.pct}%` }}
                />
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sector and Ministry Cost Escalations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Cost Escalation */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
            Cumulative Cost Variance by Sector
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {sectorData.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">No sector cost data available</p>
            ) : (
              sectorData.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{sec.sector}</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Total Outlay: {formatCurrency(sec.totalCostCr)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${sec.totalVarianceCr > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
                      {formatCurrency(sec.totalVarianceCr, { showSign: true })}
                    </span>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">
                      {sec.totalVarianceCr > 0 ? 'Escalation' : 'Within Budget'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ministry Cost Escalation */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
            Cumulative Cost Variance by Ministry
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {ministryData.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">No ministry cost data available</p>
            ) : (
              ministryData.map((min, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
                  <div className="max-w-[70%]">
                    <span className="font-bold text-gray-800 dark:text-gray-200 truncate block">{min.ministry}</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{min.projectCount} Projects</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${min.totalVarianceCr > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
                      {formatCurrency(min.totalVarianceCr, { showSign: true })}
                    </span>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">
                      {min.totalVarianceCr > 0 ? 'Escalation' : 'Within Budget'}
                    </p>
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
