import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../data/projects';
import { calculateRiskScore, getRiskLevel } from '../utils/riskScore';
import { RiskBadge } from '../components/common/RiskBadge';
import { AlertItem, RiskLevel } from '../types/project';
import {
  AlertOctagon,
  ShieldAlert,
  AlertTriangle,
  Clock,
  TrendingUp,
  Activity,
  CheckCircle2,
  Filter,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export const EarlyWarnings: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Record<string, boolean>>({});

  // Generate dynamic alerts from projects dataset
  const allAlerts: AlertItem[] = useMemo(() => {
    const alerts: AlertItem[] = [];

    MOCK_PROJECTS.forEach((p, idx) => {
      const score = p.risk_score || calculateRiskScore(p);
      const level = getRiskLevel(score);

      // 1. Critical Risk Alert
      if (score > 75) {
        alerts.push({
          id: `ALT-CRIT-${p.project_id}`,
          project_id: p.project_id,
          project_name: p.project_name,
          ministry: p.ministry,
          sector: p.sector,
          state: p.state,
          risk_score: score,
          risk_level: level,
          type: 'CRITICAL',
          severity: 'CRITICAL',
          title: `Critical Risk Threshold Exceeded (${score}/100)`,
          description: `Severe risk factors detected: ${p.time_variance} months delay and ${formatCurrency(p.cost_variance)} cost escalation. Immediate Cabinet Committee / CCEA review advised.`,
          timestamp: '15 mins ago',
          recommended_action: p.recommendations[0] || 'Convene high-level inter-ministerial taskforce.'
        });
      }

      // 2. Cost Escalation Alert
      if (p.cost_variance > 3000) {
        alerts.push({
          id: `ALT-COST-${p.project_id}`,
          project_id: p.project_id,
          project_name: p.project_name,
          ministry: p.ministry,
          sector: p.sector,
          state: p.state,
          risk_score: score,
          risk_level: level,
          type: 'COST',
          severity: score > 60 ? 'HIGH' : 'MODERATE',
          title: `High Cost Variance Alert (${formatCurrency(p.cost_variance, { showSign: true })})`,
          description: `Approved cost ${formatCurrency(p.approved_cost)} revised to ${formatCurrency(p.revised_cost || p.approved_cost)} (+${(((p.revised_cost - p.approved_cost) / Math.max(1, p.approved_cost)) * 100).toFixed(1)}%). Price variation clause limits breached.`,
          timestamp: '1 hour ago',
          recommended_action: 'Conduct value-engineering audit before sanctioning supplemental disbursement.'
        });
      }

      // 3. Schedule Delay Alert
      if (p.time_variance >= 12) {
        alerts.push({
          id: `ALT-SCHED-${p.project_id}`,
          project_id: p.project_id,
          project_name: p.project_name,
          ministry: p.ministry,
          sector: p.sector,
          state: p.state,
          risk_score: score,
          risk_level: level,
          type: 'SCHEDULE',
          severity: p.time_variance > 24 ? 'CRITICAL' : 'HIGH',
          title: `Schedule Slippage Alert (${p.time_variance} Months)`,
          description: `Commissioning deadline shifted from ${p.planned_completion} to ${p.expected_completion}. Critical path viaduct and tunneling works behind schedule.`,
          timestamp: '3 hours ago',
          recommended_action: 'Re-sequence critical path activities and implement double-shift construction.'
        });
      }

      // 4. Financial Discrepancy Alert
      if (p.financial_progress > p.physical_progress + 10) {
        alerts.push({
          id: `ALT-FIN-${p.project_id}`,
          project_id: p.project_id,
          project_name: p.project_name,
          ministry: p.ministry,
          sector: p.sector,
          state: p.state,
          risk_score: score,
          risk_level: level,
          type: 'FINANCIAL',
          severity: 'HIGH',
          title: `Financial-Physical Progress Mismatch Detected`,
          description: `Financial expenditure (${p.financial_progress}%) is outpacing physical progress (${p.physical_progress}%) by ${(p.financial_progress - p.physical_progress).toFixed(1)}%. Potential contractor cashflow or measurement discrepancy.`,
          timestamp: '5 hours ago',
          recommended_action: 'Conduct independent third-party physical quantity verification on site.'
        });
      }

      // 5. Milestone Delay Alert
      if (p.delayed_milestones > 2) {
        alerts.push({
          id: `ALT-MS-${p.project_id}`,
          project_id: p.project_id,
          project_name: p.project_name,
          ministry: p.ministry,
          sector: p.sector,
          state: p.state,
          risk_score: score,
          risk_level: level,
          type: 'IMPLEMENTATION',
          severity: 'MODERATE',
          title: `Milestone Slippage Detected (${p.delayed_milestones} Delayed)`,
          description: `${p.delayed_milestones} out of ${p.total_milestones} milestone execution gates missed due to Right of Way and utility clearance bottlenecks.`,
          timestamp: '1 day ago',
          recommended_action: 'Engage district administration for expedited land handover.'
        });
      }
    });

    return alerts;
  }, []);

  const filteredAlerts = useMemo(() => {
    return allAlerts.filter(a => {
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'CRITICAL') return a.severity === 'CRITICAL';
      if (activeFilter === 'COST') return a.type === 'COST';
      if (activeFilter === 'SCHEDULE') return a.type === 'SCHEDULE';
      if (activeFilter === 'FINANCIAL') return a.type === 'FINANCIAL';
      if (activeFilter === 'IMPLEMENTATION') return a.type === 'IMPLEMENTATION';
      return true;
    });
  }, [allAlerts, activeFilter]);

  const toggleAcknowledge = (id: string) => {
    setAcknowledgedAlerts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const criticalCount = allAlerts.filter(a => a.severity === 'CRITICAL').length;
  const highCount = allAlerts.filter(a => a.severity === 'HIGH').length;
  const modCount = allAlerts.filter(a => a.severity === 'MODERATE').length;
  const lowCount = allAlerts.filter(a => a.severity === 'LOW').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-6 w-6 text-red-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Early Warning Command Centre
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Automated predictive warning dispatch detecting project vulnerabilities prior to deadline collapse.
          </p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Simulated hackathon surveillance stream</span>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4 space-y-1">
          <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">Critical Alerts</span>
          <p className="text-2xl font-black font-mono text-red-700 dark:text-red-300">{criticalCount}</p>
          <span className="text-[10px] text-red-600/80 dark:text-red-400/80">Immediate escalations</span>
        </div>

        <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-1">
          <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">High Risk Alerts</span>
          <p className="text-2xl font-black font-mono text-amber-700 dark:text-amber-300">{highCount}</p>
          <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80">Departmental review</span>
        </div>

        <div className="rounded-xl border border-yellow-200 dark:border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/20 p-4 space-y-1">
          <span className="text-xs font-bold uppercase text-yellow-600 dark:text-yellow-400">Moderate Alerts</span>
          <p className="text-2xl font-black font-mono text-yellow-700 dark:text-yellow-300">{modCount}</p>
          <span className="text-[10px] text-yellow-600/80 dark:text-yellow-400/80">Continuous tracking</span>
        </div>

        <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-4 space-y-1">
          <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">Low / Controlled</span>
          <p className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300">{lowCount}</p>
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">Standard monitoring</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
        {[
          { key: 'ALL', label: 'All Alerts', count: allAlerts.length },
          { key: 'CRITICAL', label: 'Critical Escalations', count: criticalCount },
          { key: 'COST', label: 'Cost Variance', count: allAlerts.filter(a => a.type === 'COST').length },
          { key: 'SCHEDULE', label: 'Schedule Delays', count: allAlerts.filter(a => a.type === 'SCHEDULE').length },
          { key: 'FINANCIAL', label: 'Financial Discrepancy', count: allAlerts.filter(a => a.type === 'FINANCIAL').length },
          { key: 'IMPLEMENTATION', label: 'Implementation / Milestone', count: allAlerts.filter(a => a.type === 'IMPLEMENTATION').length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
              activeFilter === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                activeFilter === tab.key
                  ? 'bg-gray-50 dark:bg-gray-950 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">No active alerts in this category</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All parameters within approved tolerance levels.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isAck = acknowledgedAlerts[alert.id];

            return (
              <div
                key={alert.id}
                className={`rounded-2xl border p-5 transition-all shadow-lg ${
                  isAck
                    ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-60'
                    : alert.severity === 'CRITICAL'
                    ? 'border-red-200 dark:border-red-500/40 bg-red-50/50 dark:bg-gradient-to-r dark:from-red-950/30 dark:via-slate-900/90 dark:to-slate-900/90 shadow-red-500/5'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
                        {alert.project_id}
                      </span>
                      <RiskBadge level={alert.risk_level} score={alert.risk_score} size="sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.timestamp}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{alert.ministry}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.state}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {alert.title}
                    </h3>

                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 p-3 text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Prescribed AI Actionable Mitigation:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">{alert.recommended_action}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-row lg:flex-col items-center sm:items-center lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => toggleAcknowledge(alert.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border ${
                        isAck
                          ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <CheckSquare className="h-3.5 w-3.5" />
                      <span>{isAck ? 'Acknowledged' : 'Acknowledge'}</span>
                    </button>

                    <Link
                      to={`/projects/${alert.project_id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-sm"
                    >
                      <span>Project Dossier</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
