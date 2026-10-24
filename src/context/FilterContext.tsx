import React, { createContext, useContext, useState, useMemo } from 'react';
import { Project, FilterState } from '../types/project';
import { MOCK_PROJECTS } from '../data/projects';
import { calculateRiskScore, getRiskLevel } from '../utils/riskScore';

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  filteredProjects: Project[];
  allProjects: Project[];
  ministriesList: string[];
  sectorsList: string[];
  statesList: string[];
}

const initialFilters: FilterState = {
  searchQuery: '',
  ministry: 'ALL',
  sector: 'ALL',
  state: 'ALL',
  riskLevel: 'ALL',
  status: 'ALL'
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [allProjects] = useState<Project[]>(MOCK_PROJECTS);

  const ministriesList = useMemo(() => {
    return Array.from(new Set(allProjects.map(p => p.ministry))).sort();
  }, [allProjects]);

  const sectorsList = useMemo(() => {
    return Array.from(new Set(allProjects.map(p => p.sector))).sort();
  }, [allProjects]);

  const statesList = useMemo(() => {
    return Array.from(new Set(allProjects.map(p => p.state))).sort();
  }, [allProjects]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const terms = q.split(/\s+/).filter(Boolean);
        const combined = `${project.project_name} ${project.project_id} ${project.ministry} ${project.sector} ${project.state} ${project.implementing_agency}`.toLowerCase();
        const allTermsMatch = terms.every(term => combined.includes(term));
        if (!allTermsMatch) {
          return false;
        }
      }

      // 2. Ministry
      if (filters.ministry !== 'ALL' && project.ministry !== filters.ministry) {
        return false;
      }

      // 3. Sector
      if (filters.sector !== 'ALL' && project.sector !== filters.sector) {
        return false;
      }

      // 4. State
      if (filters.state !== 'ALL' && project.state !== filters.state) {
        return false;
      }

      // 5. Risk Level
      if (filters.riskLevel !== 'ALL') {
        const score = project.risk_score || calculateRiskScore(project);
        const level = getRiskLevel(score);
        if (level !== filters.riskLevel) {
          return false;
        }
      }

      // 6. Status
      if (filters.status !== 'ALL') {
        const score = project.risk_score || calculateRiskScore(project);
        if (filters.status === 'CRITICAL' && score <= 75) return false;
        if (filters.status === 'AT_RISK' && (score <= 50 || score > 75)) return false;
        if (filters.status === 'ON_TRACK' && score > 50) return false;
        if (filters.status === 'COMPLETED' && project.physical_progress < 95) return false;
      }

      return true;
    });
  }, [allProjects, filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        filteredProjects,
        allProjects,
        ministriesList,
        sectorsList,
        statesList
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
