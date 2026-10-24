import { Project, RiskLevel, RiskBreakdown } from '../types/project';

/**
 * Weights for the 5-factor PAIMANA Risk-Scoring Engine:
 * 1. Schedule Performance = 30%
 * 2. Cost Variance = 25%
 * 3. Physical Progress = 20%
 * 4. Financial Progress = 15%
 * 5. Milestone Performance = 10%
 */
export const RISK_WEIGHTS = {
  SCHEDULE: 0.30,
  COST: 0.25,
  PHYSICAL: 0.20,
  FINANCIAL: 0.15,
  MILESTONE: 0.10,
};

/**
 * Map numerical score (0-100) to standard Government/Enterprise Risk Levels
 */
export function getRiskLevel(score: number): RiskLevel {
  const rounded = Math.round(score);
  if (rounded <= 25) return 'LOW';
  if (rounded <= 50) return 'MODERATE';
  if (rounded <= 75) return 'HIGH';
  return 'CRITICAL';
}

/**
 * Calculate delay / schedule component risk (0 - 100)
 */
export function calculateDelayRisk(project: Partial<Project>): number {
  const timeVarianceMonths = project.time_variance ?? 0;
  // If time variance is negative or zero, risk is minimal
  if (timeVarianceMonths <= 0) return Math.min(20, Math.max(5, (100 - (project.physical_progress ?? 100)) * 0.2));
  
  // Exponential scaling based on months delayed (e.g. 0-6mo: low-med, 6-18mo: high, >18mo: critical)
  let score = (timeVarianceMonths / 24) * 100;
  if (project.delayed_milestones && project.total_milestones) {
    const delayRatio = project.delayed_milestones / Math.max(1, project.total_milestones);
    score = score * 0.7 + delayRatio * 100 * 0.3;
  }
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Calculate cost variance component risk (0 - 100)
 */
export function calculateCostRisk(project: Partial<Project>): number {
  const approved = project.approved_cost ?? 1;
  const revised = project.revised_cost ?? approved;
  const varianceRatio = (revised - approved) / Math.max(1, approved);
  
  if (varianceRatio <= 0) return 10;
  
  // Cost overrun scaling: 10% overrun -> ~40 score, 30% overrun -> ~80 score, >40% overrun -> ~100
  const score = Math.min(100, varianceRatio * 250);
  return Math.round(score);
}

/**
 * Calculate implementation / execution risk (0 - 100)
 */
export function calculateImplementationRisk(project: Partial<Project>): number {
  const physical = project.physical_progress ?? 0;
  const financial = project.financial_progress ?? 0;
  const gap = Math.abs(financial - physical); // Financial ahead of physical indicates risk
  
  const milestoneDelayRatio = (project.delayed_milestones ?? 0) / Math.max(1, project.total_milestones ?? 1);
  
  let risk = (gap * 1.2) + (milestoneDelayRatio * 60) + (physical < 30 ? 25 : physical < 60 ? 15 : 5);
  return Math.min(100, Math.max(5, Math.round(risk)));
}

/**
 * Full breakdown of risk components based on the standard 5-factor model
 */
export function getRiskBreakdown(project: Partial<Project>): RiskBreakdown {
  // 1. Schedule Performance (30%): Delay in months and schedule adherence
  const delayMonths = Math.max(0, project.time_variance ?? 0);
  const scheduleFactor = Math.min(100, (delayMonths / 20) * 100);

  // 2. Cost Variance (25%): Revised vs Approved ratio
  const approved = project.approved_cost ?? 1;
  const revised = project.revised_cost ?? approved;
  const costRatio = Math.max(0, (revised - approved) / Math.max(1, approved));
  const costFactor = Math.min(100, costRatio * 220);

  // 3. Physical Progress (20%): Slower physical progress gives higher risk weight
  const physical = Math.min(100, Math.max(0, project.physical_progress ?? 0));
  const physicalFactor = Math.max(0, 100 - physical);

  // 4. Financial Progress (15%): Financial expenditure vs physical delivery gap
  const financial = Math.min(100, Math.max(0, project.financial_progress ?? 0));
  // If financial expenditure is much higher than physical progress, high risk indicator
  const financialDiscrepancy = Math.max(0, financial - physical);
  const financialFactor = Math.min(100, (financialDiscrepancy * 2.5) + (100 - financial) * 0.3);

  // 5. Milestone Performance (10%): Ratio of delayed milestones
  const totalMs = Math.max(1, project.total_milestones ?? 1);
  const delayedMs = project.delayed_milestones ?? 0;
  const milestoneFactor = Math.min(100, (delayedMs / totalMs) * 100);

  const totalScore = Math.round(
    scheduleFactor * RISK_WEIGHTS.SCHEDULE +
    costFactor * RISK_WEIGHTS.COST +
    physicalFactor * RISK_WEIGHTS.PHYSICAL +
    financialFactor * RISK_WEIGHTS.FINANCIAL +
    milestoneFactor * RISK_WEIGHTS.MILESTONE
  );

  const clampedTotal = Math.min(100, Math.max(5, totalScore));

  return {
    scheduleScore: Math.round(scheduleFactor),
    costScore: Math.round(costFactor),
    physicalScore: Math.round(physicalFactor),
    financialScore: Math.round(financialFactor),
    milestoneScore: Math.round(milestoneFactor),
    totalScore: clampedTotal,
    riskLevel: getRiskLevel(clampedTotal)
  };
}

/**
 * Calculates overall dynamic risk score (0-100)
 */
export function calculateRiskScore(project: Partial<Project>): number {
  return getRiskBreakdown(project).totalScore;
}
