export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type LocationAccuracy = 'EXACT_SITE' | 'CITY' | 'DISTRICT' | 'STATE';

export interface Milestone {
  id: string;
  name: string;
  target_date: string;
  actual_date?: string;
  status: 'COMPLETED' | 'ON_TRACK' | 'DELAYED' | 'PENDING';
  weight_percentage: number;
}

export interface Project {
  project_id: string;
  project_name: string;
  ministry: string;
  sector: string;
  state: string;
  district?: string;
  city?: string;
  site_address?: string;
  location_accuracy?: LocationAccuracy;
  location_source?: string;
  implementing_agency: string;

  approved_cost: number;        // In ₹ Crores
  revised_cost: number;         // In ₹ Crores
  expenditure: number;          // In ₹ Crores

  planned_start: string;        // YYYY-MM-DD
  planned_completion: string;   // YYYY-MM-DD
  expected_completion: string;  // YYYY-MM-DD

  physical_progress: number;    // 0 to 100 %
  financial_progress: number;   // 0 to 100 %

  total_milestones: number;
  completed_milestones: number;
  delayed_milestones: number;
  milestones?: Milestone[];

  cost_variance: number;        // In ₹ Crores (revised_cost - approved_cost)
  cost_variance_percentage?: number; // ((revised - approved) / approved) * 100
  time_variance: number;        // In months (expected - planned)

  risk_score: number;           // 0 to 100
  cost_overrun_probability: number; // 0 to 100 %
  delay_probability: number;        // 0 to 100 %
  implementation_risk: number;      // 0 to 100 %

  risk_factors: string[];
  alerts: string[];
  recommendations: string[];

  // Geographic coordinates for map visualization
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Historical progress simulation for analytics charts
  progress_history?: {
    month: string;
    planned: number;
    actual: number;
    expenditure: number;
  }[];
}

export interface AlertItem {
  id: string;
  project_id: string;
  project_name: string;
  ministry: string;
  sector: string;
  state: string;
  risk_score: number;
  risk_level: RiskLevel;
  type: 'CRITICAL' | 'COST' | 'SCHEDULE' | 'FINANCIAL' | 'IMPLEMENTATION';
  title: string;
  description: string;
  timestamp: string;
  recommended_action: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  acknowledged?: boolean;
}

export interface FilterState {
  searchQuery: string;
  ministry: string;
  sector: string;
  state: string;
  riskLevel: string;
  status: string; // 'ALL' | 'ON_TRACK' | 'AT_RISK' | 'CRITICAL' | 'COMPLETED'
}

export interface RiskBreakdown {
  scheduleScore: number;       // 30%
  costScore: number;           // 25%
  physicalScore: number;       // 20%
  financialScore: number;      // 15%
  milestoneScore: number;      // 10%
  totalScore: number;
  riskLevel: RiskLevel;
}
