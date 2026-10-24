import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Map,
  InfoWindow,
  useMap,
  useApiLoadingStatus,
  APILoadingStatus
} from '@vis.gl/react-google-maps';
import {
  MarkerClusterer,
  Cluster,
  ClusterStats,
  Renderer
} from '@googlemaps/markerclusterer';
import { Project, LocationAccuracy } from '../../types/project';
import { calculateRiskScore, getRiskLevel } from '../../utils/riskScore';
import { RiskBadge } from '../common/RiskBadge';
import { formatCurrency } from '../../utils/calculations';
import { useTheme } from '../../context/ThemeContext';
import {
  isValidCoordinate,
  getMarkerSymbol,
  darkMapStyles,
  lightMapStyles
} from './mapStyles';
import {
  ExternalLink,
  MapPin,
  RefreshCw,
  Compass,
  AlertTriangle,
  Layers,
  ShieldAlert,
  Key,
  Info,
  CheckCircle2,
  Navigation,
  Crosshair,
  Filter
} from 'lucide-react';

export interface IndiaMapProps {
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject?: (project: Project | null) => void;
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number } | [number, number];
  accuracyFilter?: 'ALL' | LocationAccuracy;
}

// Geographic Center of India
const DEFAULT_INDIA_CENTER = { lat: 22.5937, lng: 78.9629 };

/**
 * Custom High-Tech Cluster Renderer for Google Maps
 * Renders pulsing radar count clusters matching PAIMANA AI design system
 */
class PaimanaClusterRenderer implements Renderer {
  render({ count, position }: Cluster, _stats: ClusterStats, _map: google.maps.Map): google.maps.Marker {
    // Determine cluster color based on density
    const color = count >= 8 ? '#ef4444' : count >= 4 ? '#f59e0b' : '#2563eb';
    const ringColor = count >= 8 ? 'rgba(239, 68, 68, 0.25)' : count >= 4 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(37, 99, 235, 0.25)';

    const svg = `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="${ringColor}" stroke="${color}" stroke-width="1.5" />
        <circle cx="24" cy="24" r="15" fill="${color}" stroke="#ffffff" stroke-width="2" />
      </svg>
    `;

    return new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(48, 48),
        anchor: new google.maps.Point(24, 24)
      },
      label: {
        text: String(count),
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 'bold',
        fontFamily: 'monospace'
      },
      title: `${count} Infrastructure Projects in this Cluster (Click to Drill Down)`,
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
    });
  }
}

/**
 * Manages Google Maps Marker Clustering lifecycle
 */
const ClusteredProjectMarkers: React.FC<{
  projects: Project[];
  activeProjectId?: string;
  onSelectProject: (p: Project) => void;
}> = ({ projects, activeProjectId, onSelectProject }) => {
  const map = useMap();
  const clustererRef = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({
        map,
        renderer: new PaimanaClusterRenderer(),
        onClusterClick: (_event, cluster, mapInstance) => {
          if (cluster.bounds) {
            mapInstance.fitBounds(cluster.bounds);
          }
        }
      });
    }

    const clusterer = clustererRef.current;
    clusterer.clearMarkers();

    const markers = projects.map(project => {
      const score = project.risk_score || calculateRiskScore(project);
      const level = getRiskLevel(score);
      const isSelected = activeProjectId === project.project_id;

      const marker = new google.maps.Marker({
        position: {
          lat: project.coordinates.lat,
          lng: project.coordinates.lng
        },
        title: `${project.project_id}: ${project.project_name} (${project.district || project.city || project.state})`,
        icon: getMarkerSymbol(level, isSelected)
      });

      marker.addListener('click', () => {
        onSelectProject(project);
      });

      return marker;
    });

    clusterer.addMarkers(markers);

    return () => {
      clusterer.clearMarkers();
    };
  }, [map, projects, activeProjectId, onSelectProject]);

  return null;
};

/**
 * Controller inside Google Map to manage dynamic bounds, pan, and zoom
 */
const MapBoundsController: React.FC<{
  validProjects: Project[];
  selectedProject?: Project;
  onFitAllReady?: (fitAllFn: () => void) => void;
}> = ({ validProjects, selectedProject, onFitAllReady }) => {
  const map = useMap();

  const fitAll = useCallback(() => {
    if (!map || validProjects.length === 0) return;

    if (validProjects.length === 1) {
      const p = validProjects[0];
      map.panTo({ lat: p.coordinates.lat, lng: p.coordinates.lng });
      map.setZoom(9);
      return;
    }

    if (typeof google !== 'undefined' && google.maps) {
      const bounds = new google.maps.LatLngBounds();
      validProjects.forEach(p => {
        bounds.extend({ lat: p.coordinates.lat, lng: p.coordinates.lng });
      });
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [map, validProjects]);

  useEffect(() => {
    if (onFitAllReady) {
      onFitAllReady(fitAll);
    }
  }, [fitAll, onFitAllReady]);

  // Recenter when selected project changes
  useEffect(() => {
    if (!map) return;

    if (
      selectedProject &&
      isValidCoordinate(selectedProject.coordinates?.lat, selectedProject.coordinates?.lng)
    ) {
      map.panTo({
        lat: selectedProject.coordinates.lat,
        lng: selectedProject.coordinates.lng
      });
      map.setZoom(selectedProject.location_accuracy === 'EXACT_SITE' ? 10 : 8);
      return;
    }

    // Auto-fit on project set change
    fitAll();
  }, [map, selectedProject, fitAll]);

  return null;
};

export const IndiaMap: React.FC<IndiaMapProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  height = '540px',
  zoom = 5,
  center,
  accuracyFilter = 'ALL'
}) => {
  const { theme } = useTheme();
  const loadingStatus = useApiLoadingStatus();

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [authFailed, setAuthFailed] = useState<boolean>(false);
  const [fitAllHandler, setFitAllHandler] = useState<(() => void) | null>(null);
  const [localAccuracy, setLocalAccuracy] = useState<'ALL' | LocationAccuracy>(accuracyFilter);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const isKeyMissingOrPlaceholder =
    !apiKey ||
    apiKey.trim() === '' ||
    apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

  // Listen for Google Maps JS API global auth failure callback
  useEffect(() => {
    const prevAuthFailure = (window as any).gm_authFailure;
    (window as any).gm_authFailure = () => {
      setAuthFailed(true);
      if (typeof prevAuthFailure === 'function') {
        try {
          prevAuthFailure();
        } catch {
          // ignore
        }
      }
    };

    return () => {
      (window as any).gm_authFailure = prevAuthFailure;
    };
  }, []);

  // Filter projects with valid geospatial coordinates and optional accuracy filter
  const validProjects = useMemo(() => {
    return projects.filter(p => {
      if (!isValidCoordinate(p.coordinates?.lat, p.coordinates?.lng)) return false;
      if (localAccuracy === 'ALL') return true;
      return p.location_accuracy === localAccuracy;
    });
  }, [projects, localAccuracy]);

  // Accuracy breakdown stats
  const accuracyStats = useMemo(() => {
    const exact = projects.filter(p => p.location_accuracy === 'EXACT_SITE').length;
    const district = projects.filter(p => p.location_accuracy === 'DISTRICT').length;
    const city = projects.filter(p => p.location_accuracy === 'CITY').length;
    const state = projects.filter(p => p.location_accuracy === 'STATE').length;
    return { exact, district, city, state };
  }, [projects]);

  // Sync external selectedProjectId with activeProject
  useEffect(() => {
    if (selectedProjectId) {
      const match = projects.find(p => p.project_id === selectedProjectId);
      if (match) setActiveProject(match);
    }
  }, [selectedProjectId, projects]);

  const handleMarkerClick = useCallback(
    (project: Project) => {
      setActiveProject(project);
      if (onSelectProject) {
        onSelectProject(project);
      }
    },
    [onSelectProject]
  );

  const handleCloseInfoWindow = () => {
    setActiveProject(null);
    if (onSelectProject) {
      onSelectProject(null);
    }
  };

  const resolvedCenter = useMemo(() => {
    if (center) {
      if (Array.isArray(center)) return { lat: center[0], lng: center[1] };
      return center;
    }
    return DEFAULT_INDIA_CENTER;
  }, [center]);

  // Helper badge renderer for location accuracy
  const renderAccuracyBadge = (accuracy?: LocationAccuracy) => {
    switch (accuracy) {
      case 'EXACT_SITE':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <Crosshair className="h-2.5 w-2.5" />
            <span>Exact Site Coordinates</span>
          </span>
        );
      case 'CITY':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Navigation className="h-2.5 w-2.5" />
            <span>City-Level Corridor</span>
          </span>
        );
      case 'DISTRICT':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <MapPin className="h-2.5 w-2.5" />
            <span>District Section</span>
          </span>
        );
      case 'STATE':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-purple-100 dark:bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <Layers className="h-2.5 w-2.5" />
            <span>Statewide Linear Network</span>
          </span>
        );
    }
  };

  // Case 1: API Key missing or placeholder
  if (isKeyMissingOrPlaceholder) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-gray-900/90 p-6 flex flex-col justify-center items-center text-center space-y-4 shadow-sm"
      >
        <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Key className="h-6 w-6" />
        </div>

        <div className="max-w-md space-y-1">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Google Maps API Key Required
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Configure your restricted Google Maps API key in{' '}
            <code className="font-mono text-[11px] bg-amber-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-700 dark:text-amber-300">
              .env.local
            </code>{' '}
            to explore the geospatial cluster map.
          </p>
        </div>
      </div>
    );
  }

  // Case 2: Google Maps Auth or Billing Failure
  if (authFailed) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl border border-red-300 dark:border-red-500/40 bg-red-50/50 dark:bg-gray-900/90 p-6 flex flex-col justify-center items-center text-center space-y-4 shadow-sm"
      >
        <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-700 flex items-center justify-center text-red-600 dark:text-red-400">
          <ShieldAlert className="h-6 w-6" />
        </div>

        <div className="max-w-md space-y-1">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Google Maps Authorization Error
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Verify Maps JavaScript API is enabled with HTTP referrer restrictions on your Google Cloud project.
          </p>
        </div>
      </div>
    );
  }

  // Case 3: Script loading failure
  if (loadingStatus === APILoadingStatus.FAILED) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-center items-center text-center space-y-3"
      >
        <AlertTriangle className="h-8 w-8 text-amber-500" />
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
          Failed to load Google Maps script
        </h4>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Reload Application</span>
        </button>
      </div>
    );
  }

  // Case 4: No valid coordinates in filtered subset
  if (validProjects.length === 0 && loadingStatus === APILoadingStatus.LOADED) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-8 flex flex-col justify-center items-center text-center space-y-2"
      >
        <MapPin className="h-8 w-8 text-gray-400" />
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
          No Projects Matched Accuracy Filter
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
          No projects match the selected accuracy filter ({localAccuracy}).
        </p>
        <button
          onClick={() => setLocalAccuracy('ALL')}
          className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reset to Show All Locations
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm relative bg-gray-100 dark:bg-gray-950 flex flex-col"
    >
      {/* Loading overlay while API initializes */}
      {loadingStatus === APILoadingStatus.LOADING && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-xs space-y-3">
          <div className="h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Initializing Google Maps GIS Surveillance Layer...
          </p>
        </div>
      )}

      {/* Floating Toolbar: Fit All, Accuracy Filter, Count Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 max-w-[90%]">
        <button
          onClick={() => fitAllHandler?.()}
          title="Fit All Projects"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          <Compass className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Fit All Projects</span>
        </button>

        {/* Location Precision Filter Pills */}
        <div className="hidden sm:flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-0.5 text-[11px] shadow-md">
          <button
            onClick={() => setLocalAccuracy('ALL')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              localAccuracy === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setLocalAccuracy('EXACT_SITE')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              localAccuracy === 'EXACT_SITE'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200'
            }`}
          >
            <Crosshair className="h-3 w-3" />
            <span>Exact Sites ({accuracyStats.exact})</span>
          </button>
          <button
            onClick={() => setLocalAccuracy('DISTRICT')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              localAccuracy === 'DISTRICT'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200'
            }`}
          >
            Corridors ({accuracyStats.district + accuracyStats.city})
          </button>
        </div>

        <span className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono font-bold text-gray-700 dark:text-gray-300 shadow-md">
          {validProjects.length} Mapped
        </span>
      </div>

      <Map
        id="paimana-national-gis-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={resolvedCenter}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        zoomControl={true}
        mapTypeControl={true}
        fullscreenControl={true}
        streetViewControl={false}
        styles={theme === 'dark' ? darkMapStyles : lightMapStyles}
        minZoom={4}
        maxZoom={18}
      >
        <MapBoundsController
          validProjects={validProjects}
          selectedProject={activeProject || undefined}
          onFitAllReady={fn => setFitAllHandler(() => fn)}
        />

        {/* Clustered Project Markers via @googlemaps/markerclusterer */}
        <ClusteredProjectMarkers
          projects={validProjects}
          activeProjectId={activeProject?.project_id}
          onSelectProject={handleMarkerClick}
        />

        {/* Detailed InfoWindow for selected project */}
        {activeProject &&
          isValidCoordinate(activeProject.coordinates?.lat, activeProject.coordinates?.lng) && (
            <InfoWindow
              position={{
                lat: activeProject.coordinates.lat,
                lng: activeProject.coordinates.lng
              }}
              onCloseClick={handleCloseInfoWindow}
              headerContent={
                <div className="flex items-center justify-between gap-2 pb-1 w-full">
                  <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-1.5 py-0.5 rounded">
                    {activeProject.project_id}
                  </span>
                  <RiskBadge
                    level={getRiskLevel(activeProject.risk_score || calculateRiskScore(activeProject))}
                    score={activeProject.risk_score || calculateRiskScore(activeProject)}
                    size="sm"
                  />
                </div>
              }
            >
              <div className="p-1 min-w-[260px] max-w-[310px] space-y-2.5 font-sans text-gray-900 dark:text-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-snug">
                    {activeProject.project_name}
                  </h4>
                  <div className="mt-1">{renderAccuracyBadge(activeProject.location_accuracy)}</div>
                </div>

                {/* Specific Geographic Location Details */}
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 p-2 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">District:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{activeProject.district || 'Statewide'}</strong>
                  </div>
                  {activeProject.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">City / Site:</span>
                      <strong className="text-gray-800 dark:text-gray-200">{activeProject.city}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">State:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{activeProject.state}</strong>
                  </div>
                  {activeProject.site_address && (
                    <div className="pt-1 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 block">Site Location:</span>
                      <span>{activeProject.site_address}</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gray-600 dark:text-gray-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Ministry:</span>
                    <strong className="text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
                      {activeProject.ministry}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Sector:</span>
                    <strong className="text-gray-800 dark:text-gray-200">{activeProject.sector}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Approved Cost:</span>
                    <strong className="font-mono text-gray-800 dark:text-gray-200">
                      {formatCurrency(activeProject.approved_cost)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Revised Cost:</span>
                    <strong className="font-mono text-blue-600 dark:text-blue-400">
                      {formatCurrency(activeProject.revised_cost || activeProject.approved_cost)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Expenditure:</span>
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(activeProject.expenditure)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Target Date:</span>
                    <strong className="font-mono text-gray-800 dark:text-gray-200">
                      {activeProject.expected_completion}
                    </strong>
                  </div>
                </div>

                {/* Physical Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500 font-medium">Physical Progress</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {activeProject.physical_progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${activeProject.physical_progress}%` }}
                    />
                  </div>
                </div>

                {/* Primary Risk Factor */}
                {activeProject.risk_factors && activeProject.risk_factors.length > 0 && (
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800/80 p-2 text-[10px] text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-red-600 dark:text-red-400 block mb-0.5">
                      Critical Risk Factor:
                    </span>
                    <p className="line-clamp-2">{activeProject.risk_factors[0]}</p>
                  </div>
                )}

                {/* Location Source Verification Citation */}
                {activeProject.location_source && (
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 italic">
                    Source: {activeProject.location_source}
                  </p>
                )}

                <div className="pt-1.5 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    to={`/projects/${activeProject.project_id}`}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
                  >
                    <span>View Project Dossier</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </InfoWindow>
          )}
      </Map>

      {/* Floating Legend: Risk Tiers & Location Precision */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-xs space-y-2.5 max-w-[210px]">
        <div>
          <p className="font-bold text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Risk Severity
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50 animate-pulse" />
              <span className="text-gray-700 dark:text-gray-300 text-[11px]">Critical (76-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-sm" />
              <span className="text-gray-700 dark:text-gray-300 text-[11px]">High (51-75)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-sm" />
              <span className="text-gray-700 dark:text-gray-300 text-[11px]">Moderate (26-50)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-gray-700 dark:text-gray-300 text-[11px]">Low (0-25)</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          <p className="font-bold text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Location Precision
          </p>
          <div className="space-y-1 text-[10px] text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Crosshair className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>Exact Construction Site</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
              <span>District Corridor Junction</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-purple-500 shrink-0" />
              <span>Regional / Statewide HQ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
