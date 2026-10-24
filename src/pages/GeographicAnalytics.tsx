import React, { useState, useMemo } from 'react';
import { useFilters } from '../context/FilterContext';
import { FilterBar } from '../components/common/FilterBar';
import { IndiaMap } from '../components/map/IndiaMap';
import { calculateStateRisk, formatCurrency } from '../utils/calculations';
import { RiskBadge } from '../components/common/RiskBadge';
import { getRiskLevel, calculateRiskScore } from '../utils/riskScore';
import { Project, LocationAccuracy } from '../types/project';
import {
  Map,
  MapPin,
  Layers,
  ArrowRight,
  Building,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Crosshair,
  Navigation,
  Compass,
  Search,
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GeographicAnalytics: React.FC = () => {
  const { filteredProjects, filters, updateFilter } = useFilters();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [accuracyFilter, setAccuracyFilter] = useState<'ALL' | LocationAccuracy>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract available districts from current filtered project set
  const availableDistricts = useMemo(() => {
    const set = new Set<string>();
    filteredProjects.forEach(p => {
      if (p.district) set.add(p.district);
    });
    return Array.from(set).sort();
  }, [filteredProjects]);

  // Apply local district and accuracy filters
  const visibleProjects = useMemo(() => {
    return filteredProjects.filter(p => {
      if (selectedDistrict !== 'ALL' && p.district !== selectedDistrict) {
        return false;
      }
      if (accuracyFilter !== 'ALL' && p.location_accuracy !== accuracyFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.project_name.toLowerCase().includes(q);
        const matchId = p.project_id.toLowerCase().includes(q);
        const matchDist = p.district?.toLowerCase().includes(q);
        const matchCity = p.city?.toLowerCase().includes(q);
        const matchState = p.state.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchDist && !matchCity && !matchState) {
          return false;
        }
      }
      return true;
    });
  }, [filteredProjects, selectedDistrict, accuracyFilter, searchQuery]);

  const stateRiskList = calculateStateRisk(filteredProjects);

  // Precision breakdown
  const precisionCounts = useMemo(() => {
    const exact = filteredProjects.filter(p => p.location_accuracy === 'EXACT_SITE').length;
    const district = filteredProjects.filter(p => p.location_accuracy === 'DISTRICT').length;
    const city = filteredProjects.filter(p => p.location_accuracy === 'CITY').length;
    const state = filteredProjects.filter(p => p.location_accuracy === 'STATE').length;
    return { exact, district, city, state };
  }, [filteredProjects]);

  const renderAccuracyPill = (acc?: LocationAccuracy) => {
    switch (acc) {
      case 'EXACT_SITE':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <Crosshair className="h-3 w-3" />
            <span>Exact Site Coordinates</span>
          </span>
        );
      case 'CITY':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Navigation className="h-3 w-3" />
            <span>City-Level Corridor</span>
          </span>
        );
      case 'DISTRICT':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <MapPin className="h-3 w-3" />
            <span>District Corridor Section</span>
          </span>
        );
      case 'STATE':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <Layers className="h-3 w-3" />
            <span>Statewide Linear Network</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 font-sans tracking-tight">
              Geospatial Infrastructure Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Google Maps GIS surveillance with verified exact-site coordinates, district tracking, and cluster aggregation across 33 Indian mega-projects.
          </p>
        </div>

        {/* Global summary badge */}
        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
            {precisionCounts.exact} Verified Exact Sites
          </span>
          <span className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
            {visibleProjects.length} In View
          </span>
        </div>
      </div>

      <FilterBar />

      {/* Sub-toolbar: District & Location Precision Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative min-w-[200px]">
            <Search className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search site, city, district..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* District selector if available */}
          {availableDistricts.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">District:</span>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 text-xs text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Districts ({availableDistricts.length})</option>
                {availableDistricts.map(dist => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Location Accuracy Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Precision:</span>
            <select
              value={accuracyFilter}
              onChange={e => setAccuracyFilter(e.target.value as any)}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 text-xs text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Precisions ({filteredProjects.length})</option>
              <option value="EXACT_SITE">Exact Sites ({precisionCounts.exact})</option>
              <option value="DISTRICT">District Sections ({precisionCounts.district})</option>
              <option value="CITY">City Corridors ({precisionCounts.city})</option>
              <option value="STATE">Statewide Networks ({precisionCounts.state})</option>
            </select>
          </div>
        </div>

        {/* Clear local filters */}
        {(selectedDistrict !== 'ALL' || accuracyFilter !== 'ALL' || searchQuery.trim() !== '') && (
          <button
            onClick={() => {
              setSelectedDistrict('ALL');
              setAccuracyFilter('ALL');
              setSearchQuery('');
            }}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Reset Geospatial Filters
          </button>
        )}
      </div>

      {/* Main Map & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full Interactive Google Map */}
        <div className="lg:col-span-2 space-y-3">
          <IndiaMap
            projects={visibleProjects}
            selectedProjectId={selectedProject?.project_id}
            onSelectProject={p => setSelectedProject(p)}
            height="580px"
            zoom={5}
            accuracyFilter={accuracyFilter}
          />
        </div>

        {/* Selected Project Inspector Side Panel */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Geospatial Asset Inspector</span>
              </h3>
              {selectedProject && (
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {selectedProject ? (
              <div className="space-y-3.5 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded">
                    {selectedProject.project_id}
                  </span>
                  <RiskBadge
                    level={getRiskLevel(selectedProject.risk_score || calculateRiskScore(selectedProject))}
                    score={selectedProject.risk_score || calculateRiskScore(selectedProject)}
                    size="sm"
                  />
                </div>

                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug">
                    {selectedProject.project_name}
                  </h4>
                  <div className="mt-1">{renderAccuracyPill(selectedProject.location_accuracy)}</div>
                </div>

                {/* Specific Verified Location Dossier */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">District:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{selectedProject.district || 'Statewide'}</strong>
                  </div>
                  {selectedProject.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">City / Terminal:</span>
                      <strong className="text-gray-800 dark:text-gray-200">{selectedProject.city}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">State:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{selectedProject.state}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Coordinates:</span>
                    <strong className="font-mono text-gray-700 dark:text-gray-300">
                      {selectedProject.coordinates.lat.toFixed(4)}° N, {selectedProject.coordinates.lng.toFixed(4)}° E
                    </strong>
                  </div>
                  {selectedProject.site_address && (
                    <div className="pt-1.5 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300">
                      <span className="font-bold text-gray-700 dark:text-gray-200 block mb-0.5">Verified Site Address:</span>
                      <p className="leading-relaxed">{selectedProject.site_address}</p>
                    </div>
                  )}
                  {selectedProject.location_source && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 italic pt-1">
                      Source: {selectedProject.location_source}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800/60">
                    <span className="text-gray-500 dark:text-gray-400">Ministry:</span>
                    <strong className="text-gray-800 dark:text-gray-200 truncate max-w-[170px]">{selectedProject.ministry}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800/60">
                    <span className="text-gray-500 dark:text-gray-400">Sector:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{selectedProject.sector}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800/60">
                    <span className="text-gray-500 dark:text-gray-400">Revised Cost:</span>
                    <strong className="font-mono text-blue-600 dark:text-blue-300">
                      {formatCurrency(selectedProject.revised_cost || selectedProject.approved_cost)}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800/60">
                    <span className="text-gray-500 dark:text-gray-400">Schedule Delay:</span>
                    <strong className="font-mono text-rose-500">+{selectedProject.time_variance} Mo</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800/60">
                    <span className="text-gray-500 dark:text-gray-400">Physical Progress:</span>
                    <strong className="font-mono text-emerald-500">{selectedProject.physical_progress}%</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/projects/${selectedProject.project_id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition-all shadow-sm"
                  >
                    <span>Open Full Intelligence Dossier</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-3">
                <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300">
                    <Info className="h-4 w-4" />
                    <span>Location Precision Breakdown</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    Every marker reflects actual project coordinates audited against official DPRs and GIS masterplans:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="text-emerald-600 font-bold">{precisionCounts.exact}</span> Exact Sites
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="text-amber-600 font-bold">{precisionCounts.district}</span> District Corridors
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="text-blue-600 font-bold">{precisionCounts.city}</span> City Metros
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="text-purple-600 font-bold">{precisionCounts.state}</span> Statewide Net
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quick Project Jump List ({visibleProjects.length})
                  </p>
                  <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
                    {visibleProjects.slice(0, 8).map(p => (
                      <button
                        key={p.project_id}
                        onClick={() => setSelectedProject(p)}
                        className="w-full text-left p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-center justify-between text-xs group"
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {p.project_name}
                          </p>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">
                            {p.district ? `${p.district}, ` : ''}{p.state}
                          </span>
                        </div>
                        <RiskBadge level={getRiskLevel(p.risk_score || calculateRiskScore(p))} score={p.risk_score || calculateRiskScore(p)} size="sm" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3 text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
            <span className="font-bold text-gray-700 dark:text-gray-300">Marker Clustering:</span>
            <p>Clusters automatically expand upon zoom or click, ensuring zero visual congestion while maintaining actual verified site coordinates.</p>
          </div>
        </div>
      </div>

      {/* State-Level Infrastructure Risk Breakdown */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
          State-Wise Infrastructure Investment & Risk Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stateRiskList.map((st, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (filters.state === st.state) {
                  updateFilter('state', 'ALL');
                } else {
                  updateFilter('state', st.state);
                }
              }}
              className={`rounded-xl border p-3.5 space-y-2 cursor-pointer transition-all ${
                filters.state === st.state
                  ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/30 shadow-sm'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">{st.state}</h4>
                <RiskBadge level={getRiskLevel(st.averageRisk)} score={st.averageRisk} size="sm" />
              </div>

              <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-0.5 font-mono">
                <div className="flex justify-between">
                  <span>Projects:</span>
                  <strong className="text-gray-700 dark:text-gray-300">{st.projectCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Outlay:</span>
                  <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(st.totalCostCr)}</strong>
                </div>
                {st.criticalCount > 0 && (
                  <div className="flex justify-between text-red-500 font-bold">
                    <span>Critical Alerts:</span>
                    <strong>{st.criticalCount}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
