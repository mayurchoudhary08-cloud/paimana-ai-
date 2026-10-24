import { Project } from '../types/project';
import { calculateRiskScore } from './riskScore';

/**
 * Format Indian Currency:
 * If >= 1,00,000 Cr -> ₹ X.XX Lakh Cr
 * Else -> ₹ X,XXX.XX Cr
 * Supports optional showSign for positive numbers (+₹...) and proper negative numbers (-₹...)
 */
export function formatCurrency(crores: number, options?: { showSign?: boolean }): string {
  if (isNaN(crores) || crores === null || crores === undefined) return '₹0 Cr';
  
  const sign = crores < 0 ? '-' : (options?.showSign && crores > 0 ? '+' : '');
  const absCrores = Math.abs(crores);
  
  if (absCrores >= 100000) {
    const lakhCr = (absCrores / 100000).toFixed(2);
    return `${sign}₹${lakhCr} Lakh Cr`;
  }
  
  return `${sign}₹${absCrores.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Cr`;
}

export function formatNumber(num: number): string {
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
}

export function calculateTotalProjects(projects: Project[]): number {
  return projects.length;
}

export function calculateAverageRisk(projects: Project[]): number {
  if (!projects.length) return 0;
  const sum = projects.reduce((acc, p) => acc + (p.risk_score || calculateRiskScore(p)), 0);
  return Math.round(sum / projects.length);
}

export function calculateTotalApprovedCost(projects: Project[]): number {
  return projects.reduce((acc, p) => acc + (p.approved_cost || 0), 0);
}

export function calculateTotalRevisedCost(projects: Project[]): number {
  return projects.reduce((acc, p) => acc + (p.revised_cost || p.approved_cost || 0), 0);
}

export function calculateTotalExpenditure(projects: Project[]): number {
  return projects.reduce((acc, p) => acc + (p.expenditure || 0), 0);
}

export function calculateCostVariance(projects: Project[]): {
  totalVarianceCr: number;
  averageVariancePercentage: number;
} {
  if (!projects.length) return { totalVarianceCr: 0, averageVariancePercentage: 0 };
  
  let totalApproved = 0;
  let totalRevised = 0;
  
  projects.forEach(p => {
    totalApproved += p.approved_cost || 0;
    totalRevised += (p.revised_cost || p.approved_cost || 0);
  });
  
  const totalVarianceCr = totalRevised - totalApproved;
  const averageVariancePercentage = totalApproved > 0 ? (totalVarianceCr / totalApproved) * 100 : 0;
  
  return {
    totalVarianceCr,
    averageVariancePercentage: Number(averageVariancePercentage.toFixed(1))
  };
}

export function calculateDelayMonths(projects: Project[]): {
  averageDelay: number;
  maxDelay: number;
  delayedProjectsCount: number;
} {
  if (!projects.length) return { averageDelay: 0, maxDelay: 0, delayedProjectsCount: 0 };
  
  let totalDelay = 0;
  let maxDelay = 0;
  let delayedCount = 0;
  
  projects.forEach(p => {
    const delay = Math.max(0, p.time_variance || 0);
    totalDelay += delay;
    if (delay > maxDelay) maxDelay = delay;
    if (delay > 0) delayedCount++;
  });
  
  return {
    averageDelay: Number((totalDelay / projects.length).toFixed(1)),
    maxDelay,
    delayedProjectsCount: delayedCount
  };
}

export function getCriticalProjects(projects: Project[]): Project[] {
  return projects.filter(p => (p.risk_score || calculateRiskScore(p)) > 75);
}

export function getHighRiskProjects(projects: Project[]): Project[] {
  return projects.filter(p => {
    const score = p.risk_score || calculateRiskScore(p);
    return score > 50 && score <= 75;
  });
}

export function getModerateRiskProjects(projects: Project[]): Project[] {
  return projects.filter(p => {
    const score = p.risk_score || calculateRiskScore(p);
    return score > 25 && score <= 50;
  });
}

export function getLowRiskProjects(projects: Project[]): Project[] {
  return projects.filter(p => (p.risk_score || calculateRiskScore(p)) <= 25);
}

export function calculateSectorRisk(projects: Project[]): {
  sector: string;
  projectCount: number;
  averageRisk: number;
  totalCostCr: number;
  totalVarianceCr: number;
  averageDelayMonths: number;
}[] {
  const map: Record<string, { count: number; totalRisk: number; totalCost: number; totalVariance: number; totalDelay: number }> = {};

  projects.forEach(p => {
    const sector = p.sector || 'Other';
    if (!map[sector]) {
      map[sector] = { count: 0, totalRisk: 0, totalCost: 0, totalVariance: 0, totalDelay: 0 };
    }
    const score = p.risk_score || calculateRiskScore(p);
    map[sector].count++;
    map[sector].totalRisk += score;
    map[sector].totalCost += (p.revised_cost || p.approved_cost || 0);
    map[sector].totalVariance += ((p.revised_cost || p.approved_cost) - p.approved_cost);
    map[sector].totalDelay += Math.max(0, p.time_variance || 0);
  });

  return Object.entries(map).map(([sector, data]) => ({
    sector,
    projectCount: data.count,
    averageRisk: Math.round(data.totalRisk / data.count),
    totalCostCr: data.totalCost,
    totalVarianceCr: data.totalVariance,
    averageDelayMonths: Number((data.totalDelay / data.count).toFixed(1))
  })).sort((a, b) => b.averageRisk - a.averageRisk);
}

export function calculateMinistryRisk(projects: Project[]): {
  ministry: string;
  projectCount: number;
  averageRisk: number;
  totalCostCr: number;
  totalVarianceCr: number;
  averageDelayMonths: number;
}[] {
  const map: Record<string, { count: number; totalRisk: number; totalCost: number; totalVariance: number; totalDelay: number }> = {};

  projects.forEach(p => {
    const ministry = p.ministry || 'Other';
    if (!map[ministry]) {
      map[ministry] = { count: 0, totalRisk: 0, totalCost: 0, totalVariance: 0, totalDelay: 0 };
    }
    const score = p.risk_score || calculateRiskScore(p);
    map[ministry].count++;
    map[ministry].totalRisk += score;
    map[ministry].totalCost += (p.revised_cost || p.approved_cost || 0);
    map[ministry].totalVariance += ((p.revised_cost || p.approved_cost) - p.approved_cost);
    map[ministry].totalDelay += Math.max(0, p.time_variance || 0);
  });

  return Object.entries(map).map(([ministry, data]) => ({
    ministry,
    projectCount: data.count,
    averageRisk: Math.round(data.totalRisk / data.count),
    totalCostCr: data.totalCost,
    totalVarianceCr: data.totalVariance,
    averageDelayMonths: Number((data.totalDelay / data.count).toFixed(1))
  })).sort((a, b) => b.averageRisk - a.averageRisk);
}

export function calculateStateRisk(projects: Project[]): {
  state: string;
  projectCount: number;
  averageRisk: number;
  totalCostCr: number;
  totalVarianceCr: number;
  averageDelayMonths: number;
  criticalCount: number;
}[] {
  const map: Record<string, { count: number; totalRisk: number; totalCost: number; totalVariance: number; totalDelay: number; criticalCount: number }> = {};

  projects.forEach(p => {
    const state = p.state || 'National';
    if (!map[state]) {
      map[state] = { count: 0, totalRisk: 0, totalCost: 0, totalVariance: 0, totalDelay: 0, criticalCount: 0 };
    }
    const score = p.risk_score || calculateRiskScore(p);
    map[state].count++;
    map[state].totalRisk += score;
    map[state].totalCost += (p.revised_cost || p.approved_cost || 0);
    map[state].totalVariance += ((p.revised_cost || p.approved_cost || 0) - (p.approved_cost || 0));
    map[state].totalDelay += Math.max(0, p.time_variance || 0);
    if (score > 75) map[state].criticalCount++;
  });

  return Object.entries(map).map(([state, data]) => ({
    state,
    projectCount: data.count,
    averageRisk: Math.round(data.totalRisk / data.count),
    totalCostCr: data.totalCost,
    totalVarianceCr: data.totalVariance,
    averageDelayMonths: Number((data.totalDelay / data.count).toFixed(1)),
    criticalCount: data.criticalCount
  })).sort((a, b) => b.averageRisk - a.averageRisk);
}
