import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { RiskBadge } from '../components/common/RiskBadge';
import { RiskGauge } from '../components/common/RiskGauge';
import { calculateRiskScore, getRiskLevel, RISK_WEIGHTS } from '../utils/riskScore';
import { calculateSectorRisk, calculateMinistryRisk, formatCurrency } from '../utils/calculations';
import {
  ShieldAlert,
  Sliders,
  Sparkles,
  BarChart2,
  TrendingUp,
  AlertOctagon,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const RiskAnalytics: React.FC = () => {
  const { filteredProjects } = useFilters();

  // Interactive Risk Simulator State
  const [simDelayMonths, setSimDelayMonths] = useState(14);
  const [simCostOverrunPct, setSimCostOverrunPct] = useState(22);
  const [simPhysicalProgress, setSimPhysicalProgress] = useState(55);
  const [simFinancialProgress, setSimFinancialProgress] = useState(70);
  const [simDelayedMilestonesPct, setSimDelayedMilestonesPct] = useState(35);

  // Dynamic calculation for simulated project
  const simScheduleScore = Math.min(100, (simDelayMonths / 20) * 100);
  const simCostScore = Math.min(100, (simCostOverrunPct / 40) * 100);
  const simPhysicalScore = Math.max(0, 100 - simPhysicalProgress);
  const simFinancialGap = Math.max(0, simFinancialProgress - simPhysicalProgress);
  const simFinancialScore = Math.min(100, simFinancialGap * 2.5 + (100 - simFinancialProgress) * 0.3);
  const simMilestoneScore = simDelayedMilestonesPct;

  const simTotalScore = Math.round(
    simScheduleScore * RISK_WEIGHTS.SCHEDULE +
    simCostScore * RISK_WEIGHTS.COST +
    simPhysicalScore * RISK_WEIGHTS.PHYSICAL +
    simFinancialScore * RISK_WEIGHTS.FINANCIAL +
    simMilestoneScore * RISK_WEIGHTS.MILESTONE
  );

  const sectorRiskList = calculateSectorRisk(filteredProjects);
  const ministryRiskList = calculateMinistryRisk(filteredProjects);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Predictive Risk Analytics & Scoring Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Standardized 5-factor mathematical weighting model with interactive simulation sandbox.
          </p>
        </div>
      </div>

      <FilterBar />

      {/* 5-Factor Mathematical Model Summary */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">5-Factor Risk Weighting Architecture</h3>
          </div>
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
            MoSPI Aligned Formula
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { name: 'Schedule Performance', weight: '30%', desc: 'Timeline variance & delay duration', color: 'border-rose-200 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300' },
            { name: 'Cost Variance', weight: '25%', desc: 'Revised vs approved capital outlay', color: 'border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300' },
            { name: 'Physical Progress', weight: '20%', desc: 'Ground execution completion rate', color: 'border-blue-200 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300' },
            { name: 'Financial Discrepancy', weight: '15%', desc: 'Disbursement vs physical delivery gap', color: 'border-purple-200 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300' },
            { name: 'Milestone Health', weight: '10%', desc: 'Delayed vs total milestone ratio', color: 'border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' }
          ].map((item, idx) => (
            <div key={idx} className={`rounded-xl border p-3.5 space-y-1 ${item.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{item.name}</span>
                <span className="font-mono text-xs font-black">{item.weight}</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Risk Simulator Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Interactive Risk Simulation Sandbox</h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Adjust parameters to simulate project risk</span>
          </div>

          <div className="space-y-4">
            {/* Slider 1: Delay Months */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Schedule Delay:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{simDelayMonths} Months</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={simDelayMonths}
                onChange={e => setSimDelayMonths(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: Cost Overrun % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Cost Escalation:</span>
                <span className="font-mono font-bold text-amber-400">+{simCostOverrunPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simCostOverrunPct}
                onChange={e => setSimCostOverrunPct(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider 3: Physical Progress % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Physical Progress:</span>
                <span className="font-mono font-bold text-blue-400">{simPhysicalProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simPhysicalProgress}
                onChange={e => setSimPhysicalProgress(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
            </div>

            {/* Slider 4: Financial Progress % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Financial Progress / Outlay:</span>
                <span className="font-mono font-bold text-purple-400">{simFinancialProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simFinancialProgress}
                onChange={e => setSimFinancialProgress(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Slider 5: Delayed Milestones % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Milestone Slippage Ratio:</span>
                <span className="font-mono font-bold text-emerald-400">{simDelayedMilestonesPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simDelayedMilestonesPct}
                onChange={e => setSimDelayedMilestonesPct(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Live Simulator Output Gauge */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Simulated Composite Result
          </span>

          <RiskGauge
            score={simTotalScore}
            label="Simulated Risk Index"
            subtext={
              simTotalScore > 75
                ? 'CRITICAL ALERT: Immediate CCEA intervention'
                : simTotalScore > 50
                ? 'HIGH RISK: Escalated line ministry review'
                : 'MODERATE / CONTROLLED'
            }
            size={180}
          />

          <div className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-left text-xs space-y-1 text-gray-500 dark:text-gray-400">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Simulation Insight:</p>
            <p>
              {simFinancialProgress > simPhysicalProgress + 15
                ? '⚠️ Financial burn outpaces physical delivery, triggering financial discrepancy risk.'
                : '✓ Financial spending aligns closely with physical site progress.'}
            </p>
          </div>
        </div>
      </div>

      {/* Sector & Ministry Risk Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Risk */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
            Sector Vulnerability Rankings
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {sectorRiskList.length === 0 ? (
              <p className="py-8 text-center text-xs text-gray-500">No sectors match active filters</p>
            ) : (
              sectorRiskList.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{sec.sector}</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{sec.projectCount} projects • Avg Delay: {sec.averageDelayMonths} mo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{sec.averageRisk}/100</span>
                    <RiskBadge level={getRiskLevel(sec.averageRisk)} size="sm" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ministry Risk */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
            Ministry Performance Rankings
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {ministryRiskList.length === 0 ? (
              <p className="py-8 text-center text-xs text-gray-500">No ministries match active filters</p>
            ) : (
              ministryRiskList.map((min, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
                  <div className="max-w-[70%]">
                    <span className="font-bold text-gray-800 dark:text-gray-200 truncate block">{min.ministry}</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{min.projectCount} projects • Total: {formatCurrency(min.totalCostCr)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{min.averageRisk}/100</span>
                    <RiskBadge level={getRiskLevel(min.averageRisk)} size="sm" />
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
