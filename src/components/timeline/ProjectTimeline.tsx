import React from 'react';
import { Project, Milestone } from '../../types/project';
import { CheckCircle2, AlertCircle, Clock, Calendar, Flag } from 'lucide-react';

interface ProjectTimelineProps {
  project: Project;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ project }) => {
  const defaultMilestones: Milestone[] = (project.milestones && project.milestones.length > 0) ? project.milestones : [
    {
      id: 'M1',
      name: 'Detailed Project Report (DPR) & Approvals',
      target_date: project.planned_start,
      actual_date: project.planned_start,
      status: 'COMPLETED',
      weight_percentage: 15
    },
    {
      id: 'M2',
      name: 'Right of Way (RoW) & Land Transfer',
      target_date: '2022-06-30',
      actual_date: project.delayed_milestones > 0 ? '2023-01-15' : '2022-06-30',
      status: project.delayed_milestones > 0 ? 'DELAYED' : 'COMPLETED',
      weight_percentage: 25
    },
    {
      id: 'M3',
      name: 'Main Civil Construction & Foundations',
      target_date: '2023-12-31',
      actual_date: project.physical_progress > 60 ? '2024-02-10' : undefined,
      status: project.physical_progress > 60 ? 'COMPLETED' : 'ON_TRACK',
      weight_percentage: 30
    },
    {
      id: 'M4',
      name: 'Electro-Mechanical & Systems Integration',
      target_date: project.planned_completion,
      status: project.time_variance > 6 ? 'DELAYED' : 'PENDING',
      weight_percentage: 20
    },
    {
      id: 'M5',
      name: 'Commissioning & Handover to Operations',
      target_date: project.expected_completion,
      status: 'PENDING',
      weight_percentage: 10
    }
  ];

  return (
    <div className="space-y-6">
      {/* High-level dates banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5 text-blue-400" />
            <span>Planned Start</span>
          </div>
          <p className="text-sm font-bold font-mono text-gray-900 dark:text-gray-100">{project.planned_start}</p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>Planned Completion</span>
          </div>
          <p className="text-sm font-bold font-mono text-gray-900 dark:text-gray-100">{project.planned_completion}</p>
        </div>

        <div className={`rounded-xl border p-3.5 space-y-1 ${
          project.time_variance > 0 
            ? 'border-red-500/30 bg-red-950/20 text-red-300' 
            : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs">
              <Flag className="h-3.5 w-3.5" />
              <span>Expected Completion</span>
            </div>
            {project.time_variance > 0 && (
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                +{project.time_variance} Mo Delay
              </span>
            )}
          </div>
          <p className="text-sm font-bold font-mono text-gray-900 dark:text-gray-100">{project.expected_completion}</p>
        </div>
      </div>

      {/* Interactive Milestone Timeline Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
        {defaultMilestones.map((milestone, idx) => {
          const isCompleted = milestone.status === 'COMPLETED';
          const isDelayed = milestone.status === 'DELAYED';
          const isPending = milestone.status === 'PENDING';
          const isOnTrack = milestone.status === 'ON_TRACK';

          return (
            <div key={milestone.id || idx} className="relative group">
              {/* Dot Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : isDelayed
                    ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                    : isOnTrack
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : isDelayed ? (
                  <AlertCircle className="h-3.5 w-3.5" />
                ) : (
                  <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Milestone Card */}
              <div className={`rounded-xl border p-4 transition-all ${
                isDelayed
                  ? 'border-red-500/30 bg-white dark:bg-gray-900 shadow-sm shadow-sm'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:border-gray-700'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">
                        {milestone.id}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {milestone.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Target Date: <strong className="text-gray-700 dark:text-gray-300 font-mono">{milestone.target_date}</strong>
                      {milestone.actual_date && (
                        <> • Actual / Recorded: <strong className="text-gray-700 dark:text-gray-300 font-mono">{milestone.actual_date}</strong></>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                      Weight: {milestone.weight_percentage}%
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : isDelayed
                          ? 'border-red-500/30 bg-red-500/10 text-red-400'
                          : isOnTrack
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
