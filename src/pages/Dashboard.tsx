import React from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { KPICard } from '../components/common/KPICard';
import { RiskDistributionChart } from '../components/charts/RiskDistributionChart';
import { CostVarianceChart } from '../components/charts/CostVarianceChart';
import { SectorRiskBarChart } from '../components/charts/SectorRiskBarChart';
import { MonthlyProgressChart } from '../components/charts/MonthlyProgressChart';
import { IndiaMap } from '../components/map/IndiaMap';
import {
  FolderGit2,
  ShieldAlert,
  AlertOctagon,
  Activity,
  TrendingUp,
  Clock,
  Layers,
  MapPin,
  Sparkles,
  BarChart3
} from 'lucide-react';
import {
  calculateTotalProjects,
  calculateAverageRisk,
  calculateCostVariance,
  calculateDelayMonths,
  getCriticalProjects,
  getHighRiskProjects,
  formatCurrency
} from '../utils/calculations';

export const Dashboard: React.FC = () => {
  const { filteredProjects, allProjects } = useFilters();

  const totalCount = calculateTotalProjects(filteredProjects);
  const avgRisk = calculateAverageRisk(filteredProjects);
  const criticalList = getCriticalProjects(filteredProjects);
  const highRiskList = getHighRiskProjects(filteredProjects);
  const totalAtRisk = criticalList.length + highRiskList.length;
  const costVarianceData = calculateCostVariance(filteredProjects);
  const delayData = calculateDelayMonths(filteredProjects);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              National Infrastructure Intelligence Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time multi-dimensional surveillance of mega projects across Indian ministries and states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-mono text-blue-600 dark:text-blue-400">
            {filteredProjects.length} Projects In Scope
          </span>
        </div>
      </div>

      {/* Global Reactive Filter Bar */}
      <FilterBar />

      {/* 6 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Projects"
          value={totalCount}
          subtitle={`Filtered from ${allProjects.length}`}
          icon={FolderGit2}
          accentColor="cyan"
        />

        <KPICard
          title="Projects At Risk"
          value={totalAtRisk}
          subtitle={`${((totalAtRisk / Math.max(1, totalCount)) * 100).toFixed(0)}% of active portfolio`}
          icon={ShieldAlert}
          accentColor="amber"
          trend={{ value: `${highRiskList.length} High`, isPositive: false }}
        />

        <KPICard
          title="Critical Projects"
          value={criticalList.length}
          subtitle="Score > 75 (Urgent Action)"
          icon={AlertOctagon}
          accentColor="red"
          trend={{ value: `${criticalList.length} Critical`, isPositive: false }}
        />

        <KPICard
          title="Average Risk Score"
          value={`${avgRisk}/100`}
          subtitle={avgRisk > 50 ? 'High Portfolio Vulnerability' : 'Moderate Threshold'}
          icon={Activity}
          accentColor={avgRisk > 50 ? 'amber' : 'emerald'}
        />

        <KPICard
          title="Cost Overrun Risk"
          value={formatCurrency(costVarianceData.totalVarianceCr)}
          subtitle={`${costVarianceData.averageVariancePercentage}% avg budget escalation`}
          icon={TrendingUp}
          accentColor="purple"
        />

        <KPICard
          title="Schedule Delay Risk"
          value={`${delayData.averageDelay} Mo`}
          subtitle={`${delayData.delayedProjectsCount} projects facing delay`}
          icon={Clock}
          accentColor="blue"
        />
      </div>

      {/* Primary Analytics Section: Risk Distribution & Cost Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Donut */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Risk Profile Distribution</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Classification by composite 5-factor risk engine</p>
            </div>
          </div>
          <RiskDistributionChart projects={filteredProjects} />
        </div>

        {/* Cost Analytics Bar */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Approved Cost vs Revised Cost</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Capital outlay and cost variance comparison (₹ Crores)</p>
            </div>
          </div>
          <CostVarianceChart projects={filteredProjects} limit={7} />
        </div>
      </div>

      {/* Secondary Analytics Section: Sector Risk & Monthly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Risk Bar Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Average Risk by Sector</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Comparative vulnerability index across infrastructure domains</p>
            </div>
          </div>
          <SectorRiskBarChart projects={filteredProjects} />
        </div>

        {/* Monthly Progress Curves */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Portfolio Execution Velocity</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Planned baseline trajectory vs actual recorded physical progress (%)</p>
            </div>
          </div>
          <MonthlyProgressChart projects={filteredProjects} />
        </div>
      </div>

      {/* Spatial Map Section: India Infrastructure Geospatial View */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm  space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                National Geographic Infrastructure Map
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Interactive Google Map tracking national infrastructure project sites with predictive risk markers (Green: Low, Yellow: Mod, Orange: High, Red: Critical)
            </p>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {filteredProjects.length} markers mapped
          </span>
        </div>

        <IndiaMap projects={filteredProjects} height="440px" />
      </div>
    </div>
  );
};
