import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface FilterBarProps {
  showSearch?: boolean;
  compact?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  showSearch = true,
  compact = false
}) => {
  const {
    filters,
    updateFilter,
    resetFilters,
    ministriesList,
    sectorsList,
    statesList,
    filteredProjects,
    allProjects
  } = useFilters();

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.ministry !== 'ALL' ||
    filters.sector !== 'ALL' ||
    filters.state !== 'ALL' ||
    filters.riskLevel !== 'ALL' ||
    filters.status !== 'ALL';

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-lg ">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        {showSearch && (
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name, ID, agency, state..."
              value={filters.searchQuery}
              onChange={e => updateFilter('searchQuery', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        )}

        {/* Filter Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 flex-wrap flex-grow">
          {/* Ministry */}
          <div>
            <select
              value={filters.ministry}
              onChange={e => updateFilter('ministry', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="ALL">All Ministries</option>
              {ministriesList.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div>
            <select
              value={filters.sector}
              onChange={e => updateFilter('sector', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="ALL">All Sectors</option>
              {sectorsList.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <select
              value={filters.state}
              onChange={e => updateFilter('state', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="ALL">All States</option>
              {statesList.map(st => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <select
              value={filters.riskLevel}
              onChange={e => updateFilter('riskLevel', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical (Score 76-100)</option>
              <option value="HIGH">High (Score 51-75)</option>
              <option value="MODERATE">Moderate (Score 26-50)</option>
              <option value="LOW">Low (Score 0-25)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={filters.status}
              onChange={e => updateFilter('status', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="ALL">All Statuses</option>
              <option value="ON_TRACK">On Track</option>
              <option value="AT_RISK">At Risk</option>
              <option value="CRITICAL">Critical Alert</option>
              <option value="COMPLETED">Near Completion</option>
            </select>
          </div>
        </div>

        {/* Reset Filters & Count */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-200 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Showing <strong className="text-blue-600 dark:text-blue-400">{filteredProjects.length}</strong> of {allProjects.length} projects
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
