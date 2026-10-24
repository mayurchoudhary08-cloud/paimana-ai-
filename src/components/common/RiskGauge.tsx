import React from 'react';
import { getRiskLevel } from '../../utils/riskScore';

interface RiskGaugeProps {
  score: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  subtext?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  label = 'Risk Score',
  size = 180,
  strokeWidth = 14,
  subtext
}) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  const level = getRiskLevel(clampedScore);
  
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // We use a 260-degree arc for speedometer look
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (clampedScore / 100) * arcLength;

  const getColor = () => {
    if (clampedScore > 75) return { stroke: '#ef4444', text: 'text-red-500', glow: 'rgba(239, 68, 68, 0.3)' };
    if (clampedScore > 50) return { stroke: '#f59e0b', text: 'text-amber-500', glow: 'rgba(245, 158, 11, 0.3)' };
    if (clampedScore > 25) return { stroke: '#eab308', text: 'text-yellow-500', glow: 'rgba(234, 179, 8, 0.3)' };
    return { stroke: '#10b981', text: 'text-emerald-500', glow: 'rgba(16, 185, 129, 0.3)' };
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[135deg] transition-all duration-700"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-slate-800"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color.glow})`,
              transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease'
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 font-mono">
            {clampedScore}
          </span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
            / 100
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 border ${
              level === 'CRITICAL'
                ? 'border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                : level === 'HIGH'
                ? 'border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : level === 'MODERATE'
                ? 'border-yellow-200 dark:border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                : 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {level}
          </span>
        </div>
      </div>

      <div className="text-center mt-1">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</h4>
        {subtext && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
};
