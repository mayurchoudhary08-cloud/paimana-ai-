import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  accentColor?: 'cyan' | 'amber' | 'red' | 'purple' | 'emerald' | 'blue';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'blue',
  onClick
}) => {
  const getAccentStyles = () => {
    switch (accentColor) {
      case 'red':
        return {
          iconBg: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800',
          topLine: 'bg-red-600',
          badgeBg: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800',
          topLine: 'bg-amber-500',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300'
        };
      case 'emerald':
        return {
          iconBg: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800',
          topLine: 'bg-green-600',
          badgeBg: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300'
        };
      case 'purple':
        return {
          iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800',
          topLine: 'bg-indigo-600',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300'
        };
      case 'cyan':
      case 'blue':
      default:
        return {
          iconBg: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800',
          topLine: 'bg-blue-600',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300'
        };
    }
  };

  const styles = getAccentStyles();

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-400' : ''
      }`}
    >
      {/* Google accent top border line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.topLine}`} />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 font-mono tracking-tight">
              {value}
            </h3>
          </div>
        </div>

        <div className={`rounded-lg border p-2.5 ${styles.iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between text-xs border-t border-gray-100 dark:border-gray-800 pt-3">
          {subtitle && (
            <span className="text-gray-600 dark:text-gray-400 font-medium truncate max-w-[70%]">
              {subtitle}
            </span>
          )}
          {trend && (
            <span
              className={`inline-flex items-center font-semibold px-2 py-0.5 rounded-full border text-[11px] ${
                trend.isPositive
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300'
                  : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
