import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import {
  ReportType,
  generateReportData,
  GeneratedReport,
  exportProjectsToCSV
} from '../utils/reportGenerator';
import { formatCurrency } from '../utils/calculations';
import {
  FileText,
  Download,
  Eye,
  Sparkles,
  CheckCircle2,
  Printer,
  Calendar,
  Layers,
  ArrowRight,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { filteredProjects } = useFilters();
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('MONTHLY_MONITORING');
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport>(() =>
    generateReportData('MONTHLY_MONITORING', filteredProjects)
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Keep report dynamically synchronized with active filter state
  React.useEffect(() => {
    setGeneratedReport(generateReportData(selectedReportType, filteredProjects));
  }, [filteredProjects, selectedReportType]);

  const reportOptions: { type: ReportType; title: string; desc: string; badge: string }[] = [
    {
      type: 'MONTHLY_MONITORING',
      title: 'Monthly Portfolio Monitoring Report',
      desc: 'High-level physical and financial progress summary across active mega infrastructure assets.',
      badge: 'National Cabinet Brief'
    },
    {
      type: 'RISK_ASSESSMENT',
      title: 'Predictive Risk & Early Warning Dossier',
      desc: '5-factor risk scoring synthesis highlighting projects with critical milestone slippages.',
      badge: 'Surveillance Audit'
    },
    {
      type: 'COST_OVERRUN',
      title: 'Cost Escalation & Capital Variance Analysis',
      desc: 'Comprehensive capital variance evaluation comparing original vs revised sanctions.',
      badge: 'CCEA / Expenditure'
    },
    {
      type: 'TIME_OVERRUN',
      title: 'Schedule Delay & Milestone Slippage Report',
      desc: 'Critical path evaluation analyzing project timeline drift and expected commissioning dates.',
      badge: 'Delivery Velocity'
    },
    {
      type: 'MINISTRY_ANALYTICS',
      title: 'Inter-Ministerial Infrastructure Performance',
      desc: 'Comparative benchmarking across 17 line ministries and implementing agencies.',
      badge: 'Inter-Departmental'
    }
  ];

  const handleGenerate = (type: ReportType) => {
    setSelectedReportType(type);
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReport(generateReportData(type, filteredProjects));
      setIsGenerating(false);
    }, 600);
  };

  const handleDownloadCSV = () => {
    exportProjectsToCSV(
      generatedReport.projects,
      `paimana_${selectedReportType.toLowerCase()}_report.csv`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Automated Executive Reports & Dossiers
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dynamic report synthesis generator tailored for Cabinet reviews, ministry audits, and public oversight.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:text-blue-300 transition-all shadow-md"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Download CSV Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-md"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      <div className="print:hidden">
        <FilterBar />
      </div>

      {/* Report Template Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 print:hidden">
        {reportOptions.map(opt => {
          const isSelected = selectedReportType === opt.type;

          return (
            <div
              key={opt.type}
              onClick={() => handleGenerate(opt.type)}
              className={`rounded-2xl border p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-sm -translate-y-1'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:border-gray-700 hover:bg-white dark:bg-gray-900'
              }`}
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
                  {opt.badge}
                </span>
                <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 pt-1">
                  {opt.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  {opt.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                <span>{isSelected ? 'Active Preview' : 'Generate'}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Generated Report Preview Sheet */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
                {generatedReport.id}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{generatedReport.generatedDate}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100 font-sans">
              {generatedReport.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Generated by: <strong className="text-gray-700 dark:text-gray-300">{generatedReport.author}</strong> • Scope: <strong className="text-gray-700 dark:text-gray-300">{generatedReport.datasetSize} Tracked Assets</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isGenerating && (
              <span className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 px-3 py-1.5 rounded-xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                Synthesizing Telemetry...
              </span>
            )}
          </div>
        </div>

        {/* Document Body */}
        <div className="p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-gray-800 dark:text-gray-200">
          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              1. Executive Summary
            </h3>
            <p className="leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
              {generatedReport.summaryText}
            </p>
          </div>

          {/* Key Findings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              2. Core Quantitative Findings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedReport.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 leading-snug">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              3. Strategic Inter-Ministerial Recommendations
            </h3>
            <div className="space-y-2">
              {generatedReport.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-gray-800 dark:text-gray-200 leading-snug">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Data Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              4. Active Portfolio Excerpt (Top Monitored Projects)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 font-mono text-[11px] border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="p-3">Project ID</th>
                    <th className="p-3">Project Name</th>
                    <th className="p-3">Ministry</th>
                    <th className="p-3 text-right">Approved Cost</th>
                    <th className="p-3 text-right">Revised Cost</th>
                    <th className="p-3 text-right">Delay</th>
                    <th className="p-3 text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60 font-mono">
                  {generatedReport.projects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-500 dark:text-gray-400 font-sans">
                        No projects match the current filter selection.
                      </td>
                    </tr>
                  ) : (
                    generatedReport.projects.slice(0, 6).map(p => (
                      <tr key={p.project_id} className="hover:bg-gray-100 dark:bg-gray-800/50">
                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">{p.project_id}</td>
                        <td className="p-3 font-sans font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[220px]">
                          {p.project_name}
                        </td>
                        <td className="p-3 font-sans text-gray-500 dark:text-gray-400 truncate max-w-[160px]">{p.ministry}</td>
                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">{formatCurrency(p.approved_cost)}</td>
                        <td className="p-3 text-right text-gray-900 dark:text-gray-100 font-bold">{formatCurrency(p.revised_cost || p.approved_cost)}</td>
                        <td className="p-3 text-right text-rose-400">+{p.time_variance || 0} Mo</td>
                        <td className="p-3 text-right text-blue-600 dark:text-blue-300">{p.physical_progress}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
