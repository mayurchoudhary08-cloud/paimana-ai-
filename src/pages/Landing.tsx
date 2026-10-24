import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  AlertTriangle,
  Layers,
  Sparkles,
  ChevronRight,
  Activity,
  Cpu,
  Database,
  BarChart4,
  ExternalLink,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { REFERENCE_STATS, MOCK_PROJECTS } from '../data/projects';
import { MethodologyCard } from '../components/common/MethodologyCard';
import { RiskBadge } from '../components/common/RiskBadge';
import { calculateRiskScore, getRiskLevel } from '../utils/riskScore';
import { formatCurrency } from '../utils/calculations';

export const Landing: React.FC = () => {
  const topCritical = MOCK_PROJECTS.filter(p => (p.risk_score || calculateRiskScore(p)) > 75).slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section - Clean Google Style */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 lg:p-16 shadow-sm dark:bg-gray-900 dark:border-gray-800">
        {/* Google 4-Color Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="w-1/4 bg-[#1a73e8]" />
          <div className="w-1/4 bg-[#d93025]" />
          <div className="w-1/4 bg-[#f9ab00]" />
          <div className="w-1/4 bg-[#1e8e3e]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>PAIMANA AI Infrastructure Monitoring</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-600 dark:text-gray-400">National Hackathon Prototype</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white font-sans leading-[1.15]">
            Predict Infrastructure Risks{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Before They Become Delays.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered predictive analytics and early warning intelligence for large-scale infrastructure projects across Indian ministries, sectors, and states.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
            >
              <span>Explore National Dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/risk-analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>View Risk Analytics Engine</span>
            </Link>
          </div>
        </div>

        {/* Live National Statistics Banner */}
        <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Ongoing Projects</p>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-1">1,981</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">National Portfolio</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Ministries</p>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-gray-900 dark:text-gray-100 mt-1">17</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Central Departments</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Sectors</p>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-1">22</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Infra Domains</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Original Cost</p>
              <p className="text-xl sm:text-2xl font-extrabold font-mono text-blue-700 dark:text-blue-300 mt-1">₹37.13 L Cr</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Initial Sanction</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Revised Cost</p>
              <p className="text-xl sm:text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400 mt-1">₹42.78 L Cr</p>
              <span className="text-[10px] text-red-600 font-medium">+₹5.65 L Cr Escalation</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:bg-gray-800/60 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Expenditure</p>
              <p className="text-xl sm:text-2xl font-extrabold font-mono text-green-600 dark:text-green-400 mt-1">₹20.36 L Cr</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Cumulative Outlay</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-4">
            Reference figures based on standard national monitoring benchmarks; dashboard analytics use demo dataset.
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <MethodologyCard />

      {/* Critical Projects Attention Banner */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Early Warning Focus: Top At-Risk Mega Projects
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              High-priority assets flagged by the 5-factor predictive risk calculation engine.
            </p>
          </div>

          <Link
            to="/projects"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
          >
            <span>View All {MOCK_PROJECTS.length} Projects</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topCritical.map(project => {
            const score = project.risk_score || calculateRiskScore(project);
            const level = getRiskLevel(score);

            return (
              <div
                key={project.project_id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all dark:bg-gray-900 dark:border-gray-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300">
                      {project.project_id}
                    </span>
                    <RiskBadge level={level} score={score} size="sm" showPulse />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                    {project.project_name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="truncate">{project.ministry}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {project.state}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Physical Progress:</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{project.physical_progress}%</span>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${project.physical_progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-gray-500">Cost Variance:</span>
                    <span className="font-mono font-bold text-red-600">
                      {formatCurrency(project.cost_variance, { showSign: true })}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/projects/${project.project_id}`}
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                >
                  <span>Inspect Risk Breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Feature Pillars - Clean Google Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Comprehensive Infrastructure Intelligence
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            From reactive delay tracking to proactive machine intelligence and automated early warning dispatches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">5-Factor Risk Scoring</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Weighted scoring combining Schedule (30%), Cost (25%), Physical Progress (20%), Financial Progress (15%), and Milestone targets (10%).
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-200 dark:bg-red-950/60 dark:border-red-800 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Early Warning Feed</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Automated multi-level alerts trigger before cost and schedule overruns become irreversible crisis points.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-200 dark:bg-green-950/60 dark:border-green-800 dark:text-green-400">
              <BarChart4 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Multi-Axis Benchmarking</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Cross-compare performance metrics and cost escalation ratios across ministries, sectors, and states in real-time.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-800 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">AI Infrastructure Copilot</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Ask natural language queries like "Which transport projects are delayed?" to receive instant structured intelligence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
