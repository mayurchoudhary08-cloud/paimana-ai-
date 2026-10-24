import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Building, MapPin, Layers, AlertTriangle } from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projects';
import { Project } from '../../types/project';
import { calculateRiskScore, getRiskLevel } from '../../utils/riskScore';
import { RiskBadge } from './RiskBadge';
import { formatCurrency } from '../../utils/calculations';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/).filter(Boolean);
    const filtered = MOCK_PROJECTS.filter(p => {
      const combined = `${p.project_name} ${p.project_id} ${p.ministry} ${p.sector} ${p.state} ${p.implementing_agency}`.toLowerCase();
      return terms.every(term => combined.includes(term));
    }).slice(0, 8);

    setResults(filtered);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSelect = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm transition-all animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3.5 gap-3">
          <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects by name, ID (e.g. IN-TR-1001), ministry, sector, or state..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:text-gray-300 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded px-1.5 py-0.5 text-[10px] font-mono uppercase bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:bg-gray-700"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-gray-200 dark:divide-gray-800">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Quick Searches</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['High Speed Rail', 'Ken-Betwa', 'Western Dedicated Freight Corridor', 'Green Hydrogen', 'Solar Park', 'Maharashtra'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-2.5 py-1 text-xs text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:text-blue-300 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <AlertTriangle className="h-8 w-8 mx-auto text-amber-500/60 mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">No projects found</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                No active projects match "{query}". Try checking the spelling or searching by sector.
              </p>
            </div>
          ) : (
            results.map(project => {
              const score = project.risk_score || calculateRiskScore(project);
              const level = getRiskLevel(score);
              return (
                <div
                  key={project.project_id}
                  onClick={() => handleSelect(project.project_id)}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:bg-gray-800 cursor-pointer transition-all"
                >
                  <div className="space-y-1 pr-4 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                        {project.project_id}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:text-blue-300 transition-colors truncate">
                        {project.project_name}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                        <span className="truncate max-w-[180px]">{project.ministry}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                        <span>{project.sector}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                        <span>{project.state}</span>
                      </span>
                      <span className="font-mono text-gray-700 dark:text-gray-300 font-medium">
                        {formatCurrency(project.revised_cost || project.approved_cost)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <RiskBadge level={level} score={score} size="sm" />
                    <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-2 bg-gray-50 dark:bg-gray-900 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
          <span>Search across 32+ national infrastructure assets</span>
          <span className="font-mono">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
