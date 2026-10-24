import React from 'react';
import { RiskLevel } from '../../types/project';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  score,
  size = 'md',
  showPulse = false
}) => {
  const getColors = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/15 border-red-500/40 text-red-400 dark:text-red-300',
          dot: 'bg-red-500 shadow-red-500/50',
          pulse: 'bg-red-400'
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-400 dark:text-amber-300',
          dot: 'bg-amber-500 shadow-amber-500/50',
          pulse: 'bg-amber-400'
        };
      case 'MODERATE':
        return {
          bg: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400 dark:text-yellow-300',
          dot: 'bg-yellow-500 shadow-yellow-500/50',
          pulse: 'bg-yellow-400'
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 dark:text-emerald-300',
          dot: 'bg-emerald-500 shadow-emerald-500/50',
          pulse: 'bg-emerald-400'
        };
    }
  };

  const colors = getColors();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border  transition-all ${colors.bg} ${sizeClasses}`}
    >
      <span className="relative flex h-2 w-2">
        {(showPulse || level === 'CRITICAL') && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${colors.pulse}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`} />
      </span>
      <span>{level}</span>
      {score !== undefined && (
        <span className="opacity-75 font-mono text-[11px]">({score})</span>
      )}
    </span>
  );
};
