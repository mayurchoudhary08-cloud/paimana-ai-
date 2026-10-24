import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { RiskBadge } from '../components/common/RiskBadge';
import { calculateRiskScore, getRiskLevel } from '../utils/riskScore';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { exportProjectsToCSV } from '../utils/reportGenerator';
import {
  ArrowUpDown,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  Eye,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { Project } from '../types/project';

type SortKey = 'project_id' | 'project_name' | 'ministry' | 'sector' | 'state' | 'approved_cost' | 'revised_cost' | 'expenditure' | 'physical_progress' | 'financial_progress' | 'risk_score';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { filteredProjects, resetFilters } = useFilters();

  const [sortKey, setSortKey] = useState<SortKey>('risk_score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page to 1 whenever filteredProjects changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects.length]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (sortKey === 'risk_score') {
        aVal = a.risk_score || calculateRiskScore(a);
        bVal = b.risk_score || calculateRiskScore(b);
      } else if (sortKey === 'revised_cost') {
        aVal = a.revised_cost || a.approved_cost;
        bVal = b.revised_cost || b.approved_cost;
      } else {
        aVal = a[sortKey];
        bVal = b[sortKey];
      }

      if (typeof aVal === 'string' || typeof bVal === 'string') {
        const strA = (aVal ?? '').toString();
        const strB = (bVal ?? '').toString();
        return sortOrder === 'asc'
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }

      const numA = typeof aVal === 'number' && !isNaN(aVal) ? aVal : 0;
      const numB = typeof bVal === 'number' && !isNaN(bVal) ? bVal : 0;
      return sortOrder === 'asc' ? numA - numB : numB - numA;
    });
  }, [filteredProjects, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedProjects = sortedProjects.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              National Infrastructure Project Portfolio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Complete registry of mega infrastructure projects with multi-column sorting, filtering, and risk profiling.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportProjectsToCSV(filteredProjects, 'paimana_filtered_projects.csv')}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:text-blue-300 transition-all shadow-md"
          >
            <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Project Table Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th
                  onClick={() => handleSort('project_id')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Project ID</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('project_name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Project Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ministry')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Ministry</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sector')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sector</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('state')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>State</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('approved_cost')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Approved</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('revised_cost')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Revised</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('physical_progress')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Physical</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('risk_score')}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-blue-600 dark:text-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Risk Level</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60 text-xs">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No matching projects found</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try resetting your active filters.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:bg-gray-700"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedProjects.map(p => {
                  const score = p.risk_score || calculateRiskScore(p);
                  const level = getRiskLevel(score);

                  return (
                    <tr
                      key={p.project_id}
                      className="hover:bg-gray-100 dark:bg-gray-800 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/projects/${p.project_id}`)}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {p.project_id}
                      </td>

                      <td className="py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 max-w-[260px] group-hover:text-blue-600 dark:text-blue-300 transition-colors truncate">
                        {p.project_name}
                      </td>

                      <td className="py-3 px-4 text-gray-500 dark:text-gray-400 max-w-[160px] truncate">
                        {p.ministry}
                      </td>

                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700/60 text-[11px]">
                          {p.sector}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {p.district ? `${p.district}, ` : ''}{p.state}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-gray-700 dark:text-gray-300">
                        {formatCurrency(p.approved_cost)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-gray-900 dark:text-gray-100">
                        {formatCurrency(p.revised_cost || p.approved_cost)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-500 h-full rounded-full"
                              style={{ width: `${p.physical_progress}%` }}
                            />
                          </div>
                          <span className="text-blue-600 dark:text-blue-300 font-semibold">{p.physical_progress}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <RiskBadge level={level} score={score} size="sm" />
                      </td>

                      <td className="py-3 px-4 text-center" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/projects/${p.project_id}`)}
                          className="inline-flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-all border border-gray-300 dark:border-gray-700"
                          title="View Project Intelligence Dossier"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400">
          <div>
            Showing <strong className="text-gray-800 dark:text-gray-200">{sortedProjects.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-gray-800 dark:text-gray-200">
              {Math.min(safePage * itemsPerPage, sortedProjects.length)}
            </strong>{' '}
            of <strong className="text-blue-600 dark:text-blue-400">{sortedProjects.length}</strong> filtered projects
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={safePage === 1}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-3 py-1 font-mono font-semibold text-gray-800 dark:text-gray-200">
              Page {safePage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
