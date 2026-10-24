import React from 'react';
import { Sparkles, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

export const MethodologyCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      {/* Google Blue accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Predictive AI Risk Engine Methodology
              </h3>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                Hackathon Prototype
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Dynamic multi-criteria synthetic intelligence synthesizing schedule, cost, physical progress & milestone risks.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Prototype simulation. Ready for production fine-tuning on historical OCMS data.</span>
        </div>
      </div>

      {/* 5-Stage Operational Pipeline */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          National Intelligence Pipeline
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { step: '01', title: 'MONITOR', desc: 'Real-time physical & financial telemetry ingestion', color: 'bg-blue-600' },
            { step: '02', title: 'ANALYZE', desc: 'Multi-variable variance & milestone gap audit', color: 'bg-indigo-600' },
            { step: '03', title: 'PREDICT', desc: 'Weighted 5-factor risk scoring engine', color: 'bg-amber-500' },
            { step: '04', title: 'ALERT', desc: 'Early warning triggers before critical slippage', color: 'bg-red-600' },
            { step: '05', title: 'ACT', desc: 'Targeted inter-ministerial playbooks & actions', color: 'bg-green-600' }
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-800/60 dark:hover:bg-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500">{item.step}</span>
                <div className={`h-2 w-2 rounded-full ${item.color}`} />
              </div>
              <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* From Descriptive to Predictive Architecture */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            From Descriptive Monitoring to Predictive Intelligence
          </h5>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-700 dark:text-gray-300">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-sans font-medium">Historical OCMS / PAIMANA Data</span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-sans font-medium">Feature Engineering</span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-sans font-medium">5-Factor Risk Weighting</span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-950/80 dark:border-blue-800 dark:text-blue-300 font-semibold font-sans">Predictive Score (0-100)</span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-300 font-semibold font-sans">Early Warning Dispatch</span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="px-2.5 py-1 rounded-lg bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/80 dark:border-green-800 dark:text-green-300 font-semibold font-sans">Executive Decision Support</span>
        </div>
      </div>
    </div>
  );
};
