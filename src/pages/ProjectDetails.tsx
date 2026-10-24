import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PROJECTS } from '../data/projects';
import { calculateRiskScore, getRiskLevel, getRiskBreakdown, calculateCostRisk, calculateDelayRisk, calculateImplementationRisk } from '../utils/riskScore';
import { formatCurrency } from '../utils/calculations';
import { RiskBadge } from '../components/common/RiskBadge';
import { RiskGauge } from '../components/common/RiskGauge';
import { ProjectTimeline } from '../components/timeline/ProjectTimeline';
import { IndiaMap } from '../components/map/IndiaMap';
import {
  ArrowLeft,
  Building,
  MapPin,
  Layers,
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Bot
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = MOCK_PROJECTS.find(
    p => p.project_id.toLowerCase() === id?.toLowerCase()
  );

  if (!project) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center space-y-4 max-w-lg mx-auto my-12">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Project Not Found</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No project exists with ID <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{id}</code> in the national repository.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects Portfolio
        </Link>
      </div>
    );
  }

  const score = project.risk_score || calculateRiskScore(project);
  const level = getRiskLevel(score);
  const breakdown = getRiskBreakdown(project);
  const costRisk = project.cost_overrun_probability || calculateCostRisk(project);
  const delayRisk = project.delay_probability || calculateDelayRisk(project);
  const implRisk = project.implementation_risk || calculateImplementationRisk(project);

  return (
    <div className="space-y-6">
      {/* Top breadcrumb & back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Link
            to="/ai-assistant"
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/40 transition-all"
          >
            <Bot className="h-3.5 w-3.5 text-purple-400" />
            <span>Ask AI About This Project</span>
          </Link>
        </div>
      </div>

      {/* Project Header Banner */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
                {project.project_id}
              </span>
              <RiskBadge level={level} score={score} size="md" showPulse />
              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                {project.sector}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              {project.project_name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{project.ministry}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-400" />
                <span>Agency: <strong className="text-gray-800 dark:text-gray-200">{project.implementing_agency}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                <span>Location: <strong className="text-gray-800 dark:text-gray-200">{project.site_address || (project.district ? `${project.district}, ${project.state}` : project.state)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Parameter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Approved Cost</p>
            <p className="text-base font-mono font-bold text-blue-400">{formatCurrency(project.approved_cost)}</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Revised Cost</p>
            <p className="text-base font-mono font-bold text-amber-400">
              {formatCurrency(project.revised_cost || project.approved_cost)}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Expenditure</p>
            <p className="text-base font-mono font-bold text-emerald-400">{formatCurrency(project.expenditure)}</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Physical Progress</p>
            <p className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">{project.physical_progress}%</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Financial Progress</p>
            <p className="text-base font-mono font-bold text-purple-400">{project.financial_progress}%</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Expected End</p>
            <p className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">{project.expected_completion}</p>
          </div>
        </div>
      </div>

      {/* Risk Gauges & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Composite Risk Gauge */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  flex flex-col items-center justify-center space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Overall Composite Risk</h3>
          <RiskGauge
            score={score}
            label="PAIMANA Risk Index"
            subtext="Calculated via 5-factor weighted algorithm"
            size={190}
          />

          <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 dark:border-gray-800 text-center">
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-semibold">Cost Risk</span>
              <strong className="text-xs font-mono text-amber-400">{costRisk}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-semibold">Delay Risk</span>
              <strong className="text-xs font-mono text-rose-400">{delayRisk}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-semibold">Execution</span>
              <strong className="text-xs font-mono text-purple-400">{implRisk}%</strong>
            </div>
          </div>
        </div>

        {/* 5-Factor Risk Weight Contributors */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Risk Factor Contribution Breakdown</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Dynamic score decomposition per national monitoring algorithm</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {[
              { label: 'Schedule Performance (30% Weight)', score: breakdown.scheduleScore, desc: `${project.time_variance} months variance from baseline`, color: 'bg-rose-500' },
              { label: 'Cost Variance (25% Weight)', score: breakdown.costScore, desc: `${formatCurrency(project.cost_variance, { showSign: true })} (${project.cost_variance > 0 ? '+' : ''}${(((project.cost_variance)/Math.max(1, project.approved_cost))*100).toFixed(1)}%)`, color: 'bg-amber-500' },
              { label: 'Physical Progress (20% Weight)', score: breakdown.physicalScore, desc: `${project.physical_progress}% completion achieved`, color: 'bg-blue-500' },
              { label: 'Financial Discrepancy (15% Weight)', score: breakdown.financialScore, desc: `${project.financial_progress}% funds spent vs ${project.physical_progress}% physical progress`, color: 'bg-purple-500' },
              { label: 'Milestone Health (10% Weight)', score: breakdown.milestoneScore, desc: `${project.delayed_milestones} delayed of ${project.total_milestones} milestones`, color: 'bg-blue-600' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{item.label}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-300 font-bold">{item.score}/100</span>
                </div>
                <div className="w-full bg-gray-50 dark:bg-gray-950 rounded-full h-2 overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${Math.min(100, Math.max(5, item.score))}%` }}
                  />
                </div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Timeline & Milestones */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Project Milestone & Schedule Timeline</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Sequential execution gates and critical path tracking</p>
          </div>
        </div>

        <ProjectTimeline project={project} />
      </div>

      {/* Project Geographic Site Surveillance Map */}
      {project.coordinates && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Project Geospatial Site Location
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {project.location_accuracy && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {project.location_accuracy === 'EXACT_SITE' ? 'Verified Site' : project.location_accuracy === 'DISTRICT' ? 'Corridor / District' : project.location_accuracy}
                </span>
              )}
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                {project.coordinates.lat.toFixed(4)}° N, {project.coordinates.lng.toFixed(4)}° E • {project.district ? `${project.district}, ` : ''}{project.state}
              </span>
            </div>
          </div>

          <IndiaMap
            projects={[project]}
            selectedProjectId={project.project_id}
            height="320px"
            zoom={8}
            center={{ lat: project.coordinates.lat, lng: project.coordinates.lng }}
          />
        </div>
      )}

      {/* AI Recommendations & Identified Risk Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Risk Factors */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm  space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Identified Root-Cause Risk Drivers</h3>
          </div>

          <div className="space-y-2.5">
            {project.risk_factors.map((factor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic AI Recommendations */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">PAIMANA AI Actionable Mitigation Playbook</h3>
            </div>
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
              Generated Advisory
            </span>
          </div>

          <div className="space-y-2.5">
            {project.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-gray-900/90 border border-blue-200/80 dark:border-blue-800 text-xs text-gray-800 dark:text-gray-200 shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
