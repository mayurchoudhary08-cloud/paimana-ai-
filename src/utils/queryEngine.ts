import { Project } from '../types/project';
import { MOCK_PROJECTS } from '../data/projects';
import { calculateRiskScore, getRiskLevel } from './riskScore';
import { formatCurrency } from './calculations';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  sourceNote?: string;
  matchedProjects?: Project[];
  metrics?: { label: string; value: string; color?: string }[];
  suggestedActions?: { label: string; query: string }[];
}

/**
 * Natural language query parser for PAIMANA AI Assistant
 */
export function queryProjectDataset(query: string, projects: Project[] = MOCK_PROJECTS): {
  text: string;
  matchedProjects?: Project[];
  metrics?: { label: string; value: string; color?: string }[];
  suggestedActions?: { label: string; query: string }[];
} {
  const q = query.toLowerCase().trim();

  // 1. Direct Project ID or specific Project Name lookup
  const exactProject = projects.find(p => 
    q.includes(p.project_id.toLowerCase()) || 
    q.includes(p.project_name.toLowerCase()) ||
    (p.project_id.toLowerCase().replace(/[^a-z0-9]/g, '') === q.replace(/[^a-z0-9]/g, ''))
  );

  if (exactProject) {
    const score = exactProject.risk_score || calculateRiskScore(exactProject);
    const level = getRiskLevel(score);
    return {
      text: `### Intelligence Dossier: ${exactProject.project_name}\n\n**Risk Profile:** **${level} Risk** (Composite Score: **${score}/100**)\n**Implementing Agency:** ${exactProject.implementing_agency}\n**Ministry:** ${exactProject.ministry}\n\n#### Key Findings:\n- **Cost Escalation:** Revised to ${formatCurrency(exactProject.revised_cost)} vs Approved ${formatCurrency(exactProject.approved_cost)} (+${formatCurrency(exactProject.cost_variance)})\n- **Schedule Delay:** Estimated ${exactProject.time_variance} months delay. Expected completion: **${exactProject.expected_completion}**\n- **Physical vs Financial:** Physical progress at **${exactProject.physical_progress}%** against financial burn of **${exactProject.financial_progress}%**\n\n#### Primary Risk Drivers:\n${exactProject.risk_factors.map(f => `- ${f}`).join('\n')}\n\n#### AI Recommended Mitigation Strategy:\n${exactProject.recommendations.map(r => `1. ${r}`).join('\n')}`,
      matchedProjects: [exactProject],
      metrics: [
        { label: 'Risk Score', value: `${score}/100`, color: level === 'CRITICAL' ? 'text-red-400' : 'text-amber-400' },
        { label: 'Cost Variance', value: formatCurrency(exactProject.cost_variance), color: 'text-amber-400' },
        { label: 'Delay', value: `${exactProject.time_variance} mos`, color: 'text-rose-400' },
        { label: 'Physical Progress', value: `${exactProject.physical_progress}%`, color: 'text-blue-600 dark:text-blue-400' }
      ],
      suggestedActions: [
        { label: 'View Project Details Page', query: `view ${exactProject.project_id}` },
        { label: 'Compare with Ministry Portfolio', query: `Show ${exactProject.ministry} projects` }
      ]
    };
  }

  // 2. High Risk / Critical Projects query
  if (q.includes('high risk') || q.includes('critical') || q.includes('most at risk') || q.includes('top risk')) {
    const highRisk = projects
      .map(p => ({ ...p, score: p.risk_score || calculateRiskScore(p) }))
      .filter(p => p.score > 50)
      .sort((a, b) => b.score - a.score);

    const criticalCount = highRisk.filter(p => p.score > 75).length;
    const highCount = highRisk.filter(p => p.score <= 75).length;

    return {
      text: `### High & Critical Risk Assets Identified\n\nFound **${highRisk.length} projects** exceeding the high-risk threshold (Risk Score > 50) across the national portfolio:\n- **Critical Risk (Score > 75):** ${criticalCount} projects requiring immediate inter-ministerial intervention.\n- **High Risk (Score 51-75):** ${highCount} projects exhibiting substantial milestone slippage or cost overruns.\n\nHere are the highest risk assets ranked by composite predictive score:`,
      matchedProjects: highRisk.slice(0, 5),
      metrics: [
        { label: 'Critical Projects', value: `${criticalCount}`, color: 'text-red-400' },
        { label: 'High Risk Projects', value: `${highCount}`, color: 'text-amber-400' },
        { label: 'Total High/Crit', value: `${highRisk.length}`, color: 'text-purple-400' }
      ],
      suggestedActions: [
        { label: 'Early Warnings Command Centre', query: 'show early warnings' },
        { label: 'View Cost Overrun Analytics', query: 'which projects have cost overrun' }
      ]
    };
  }

  // 3. Cost Overrun / Escalation queries
  if (q.includes('cost') || q.includes('budget') || q.includes('escalation') || q.includes('overrun') || q.includes('expenditure')) {
    const costEscalated = projects
      .map(p => ({
        ...p,
        overrunCr: (p.revised_cost || p.approved_cost) - p.approved_cost,
        overrunPct: (((p.revised_cost || p.approved_cost) - p.approved_cost) / Math.max(1, p.approved_cost)) * 100
      }))
      .filter(p => p.overrunCr > 0)
      .sort((a, b) => b.overrunCr - a.overrunCr);

    const totalOverrun = costEscalated.reduce((acc, p) => acc + p.overrunCr, 0);

    return {
      text: `### Cost Escalation & Overrun Analysis\n\nAnalysis of the active infrastructure portfolio reveals **${costEscalated.length} projects** experiencing cost escalation, accumulating a cumulative budget variance of **${formatCurrency(totalOverrun)}**.\n\n#### Key Escalation Drivers:\n- **Raw Material Volatility:** Steel and cement price adjustments in multi-year EPC contracts.\n- **Land Acquisition & R&R:** Additional compensation payouts and rehabilitation packages.\n- **Scope Modifications:** Engineering realignment during detailed execution stages.\n\nTop projects experiencing highest absolute cost escalation:`,
      matchedProjects: costEscalated.slice(0, 5),
      metrics: [
        { label: 'Projects with Cost Risk', value: `${costEscalated.length}`, color: 'text-amber-400' },
        { label: 'Total Cumulative Overrun', value: formatCurrency(totalOverrun), color: 'text-red-400' },
        { label: 'Avg Overrun', value: `${(costEscalated.reduce((a,b)=>a+b.overrunPct,0)/costEscalated.length).toFixed(1)}%`, color: 'text-blue-600 dark:text-blue-400' }
      ],
      suggestedActions: [
        { label: 'Explore Cost Analytics', query: 'cost escalation drivers' },
        { label: 'Show Railway Cost Escalations', query: 'Ministry of Railways cost' }
      ]
    };
  }

  // 4. Delay / Schedule / Milestone queries
  if (q.includes('delay') || q.includes('schedule') || q.includes('time') || q.includes('slippage') || q.includes('milestone')) {
    const delayed = projects
      .filter(p => (p.time_variance || 0) > 0)
      .sort((a, b) => (b.time_variance || 0) - (a.time_variance || 0));

    const avgDelay = delayed.reduce((acc, p) => acc + p.time_variance, 0) / Math.max(1, delayed.length);

    return {
      text: `### Schedule Slippage & Timeline Risk Analysis\n\n**${delayed.length} out of ${projects.length} projects** are currently tracking behind original scheduled completion dates, with an average delay of **${avgDelay.toFixed(1)} months**.\n\n#### Critical Milestone Bottlenecks:\n- **Right of Way & Forest Approvals:** Delays in initial 20% project phase cascading down the timeline.\n- **Contractor Cashflow Constraints:** Delays in critical path procurement for specialized equipment.\n- **Monsoon & Geological Impediments:** Tunneling shear zones and river bridge foundation works.\n\nProjects facing greatest schedule delays:`,
      matchedProjects: delayed.slice(0, 5),
      metrics: [
        { label: 'Delayed Projects', value: `${delayed.length}`, color: 'text-amber-400' },
        { label: 'Average Delay', value: `${avgDelay.toFixed(1)} mo`, color: 'text-red-400' },
        { label: 'Max Delay', value: `${delayed[0]?.time_variance || 0} mo`, color: 'text-rose-400' }
      ],
      suggestedActions: [
        { label: 'Explore Time Analytics', query: 'time analytics' },
        { label: 'Show Water & Sanitation Delays', query: 'Water & Sanitation delays' }
      ]
    };
  }

  // 5. State specific queries
  const indianStates = [
    'Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Uttarakhand', 'Madhya Pradesh',
    'Bihar', 'Odisha', 'Jharkhand', 'Chhattisgarh', 'Tamil Nadu',
    'Andhra Pradesh', 'Karnataka', 'West Bengal', 'Jammu and Kashmir',
    'Rajasthan', 'Delhi', 'Andaman and Nicobar Islands'
  ];

  const matchedState = indianStates.find(st => q.includes(st.toLowerCase()));
  if (matchedState) {
    const stateProjects = projects.filter(p => p.state.toLowerCase() === matchedState.toLowerCase());
    const avgStateRisk = Math.round(stateProjects.reduce((acc, p) => acc + (p.risk_score || calculateRiskScore(p)), 0) / Math.max(1, stateProjects.length));
    const totalStateVal = stateProjects.reduce((acc, p) => acc + (p.revised_cost || p.approved_cost), 0);

    return {
      text: `### State Infrastructure Dossier: ${matchedState}\n\nFound **${stateProjects.length} major infrastructure projects** under execution in **${matchedState}** with a cumulative revised value of **${formatCurrency(totalStateVal)}**.\n\n- **State Average Risk Score:** **${avgStateRisk}/100** (${getRiskLevel(avgStateRisk)})\n- **Sector Coverage:** ${Array.from(new Set(stateProjects.map(p => p.sector))).join(', ')}\n\nProjects located in ${matchedState}:`,
      matchedProjects: stateProjects,
      metrics: [
        { label: 'Total Projects', value: `${stateProjects.length}`, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Average Risk', value: `${avgStateRisk}/100`, color: avgStateRisk > 50 ? 'text-amber-400' : 'text-emerald-400' },
        { label: 'Total Investment', value: formatCurrency(totalStateVal), color: 'text-purple-400' }
      ],
      suggestedActions: [
        { label: 'View on Geographic Map', query: 'geographic analytics' },
        { label: 'Show High Risk Projects in ' + matchedState, query: `high risk projects in ${matchedState}` }
      ]
    };
  }

  // 6. Sector specific queries
  const sectors = [
    'Transport & Logistics', 'Energy', 'Water & Sanitation', 'Communication',
    'Coal', 'Steel', 'Mining', 'Social Infrastructure'
  ];

  const matchedSector = sectors.find(sec => q.includes(sec.toLowerCase()) || 
    (sec.toLowerCase().includes('transport') && (q.includes('rail') || q.includes('road') || q.includes('port') || q.includes('airport') || q.includes('transport'))) ||
    (sec.toLowerCase().includes('water') && (q.includes('water') || q.includes('irrigation') || q.includes('river') || q.includes('jal'))) ||
    (sec.toLowerCase().includes('energy') && (q.includes('energy') || q.includes('solar') || q.includes('power') || q.includes('nuclear')))
  );

  if (matchedSector) {
    const sectorProjects = projects.filter(p => p.sector.toLowerCase().includes(matchedSector.toLowerCase()) || matchedSector.toLowerCase().includes(p.sector.toLowerCase()));
    const avgSecRisk = Math.round(sectorProjects.reduce((acc, p) => acc + (p.risk_score || calculateRiskScore(p)), 0) / Math.max(1, sectorProjects.length));
    const totalSecCost = sectorProjects.reduce((acc, p) => acc + (p.revised_cost || p.approved_cost), 0);

    return {
      text: `### Sector Risk & Progress Overview: ${matchedSector}\n\n**${sectorProjects.length} infrastructure projects** are being tracked in the **${matchedSector}** sector.\n- **Sector Average Risk Score:** **${avgSecRisk}/100** (${getRiskLevel(avgSecRisk)})\n- **Sector Total Capital Outlay:** **${formatCurrency(totalSecCost)}**\n- **Average Physical Progress:** **${(sectorProjects.reduce((a, b) => a + b.physical_progress, 0) / Math.max(1, sectorProjects.length)).toFixed(1)}%**\n\nKey ongoing projects in ${matchedSector}:`,
      matchedProjects: sectorProjects,
      metrics: [
        { label: 'Projects', value: `${sectorProjects.length}`, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Sector Risk', value: `${avgSecRisk}/100`, color: avgSecRisk > 50 ? 'text-amber-400' : 'text-emerald-400' },
        { label: 'Sector Capex', value: formatCurrency(totalSecCost), color: 'text-purple-400' }
      ]
    };
  }

  // 7. Ministry specific queries
  const allMinistries = Array.from(new Set(projects.map(p => p.ministry)));
  const matchedMinistry = allMinistries.find(m => {
    const mLower = m.toLowerCase();
    const shortName = mLower.replace('ministry of ', '').replace('department of ', '').trim();
    return q.includes(mLower) || q.includes(shortName);
  });

  if (matchedMinistry) {
    const ministryProjects = projects.filter(p => p.ministry === matchedMinistry);
    const avgMinRisk = Math.round(ministryProjects.reduce((acc, p) => acc + (p.risk_score || calculateRiskScore(p)), 0) / Math.max(1, ministryProjects.length));
    const totalMinCost = ministryProjects.reduce((acc, p) => acc + (p.revised_cost || p.approved_cost), 0);
    const totalApproved = ministryProjects.reduce((acc, p) => acc + p.approved_cost, 0);
    const costVariance = totalMinCost - totalApproved;

    return {
      text: `### Ministry Intelligence Dossier: ${matchedMinistry}\n\nTracking **${ministryProjects.length} mega projects** executed under the purview of **${matchedMinistry}**.\n\n- **Ministry Risk Index:** **${avgMinRisk}/100** (${getRiskLevel(avgMinRisk)})\n- **Total Capital Sanctioned:** ${formatCurrency(totalApproved)}\n- **Current Revised Outlay:** ${formatCurrency(totalMinCost)} (${formatCurrency(costVariance, { showSign: true })} variance)\n- **Average Physical Delivery:** ${(ministryProjects.reduce((a, b) => a + b.physical_progress, 0) / Math.max(1, ministryProjects.length)).toFixed(1)}%\n\nKey portfolio assets under ${matchedMinistry}:`,
      matchedProjects: ministryProjects,
      metrics: [
        { label: 'Active Projects', value: `${ministryProjects.length}`, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Portfolio Risk', value: `${avgMinRisk}/100`, color: avgMinRisk > 50 ? 'text-amber-400' : 'text-emerald-400' },
        { label: 'Total Outlay', value: formatCurrency(totalMinCost), color: 'text-purple-400' },
        { label: 'Cost Variance', value: formatCurrency(costVariance, { showSign: true }), color: costVariance > 0 ? 'text-rose-400' : 'text-emerald-400' }
      ],
      suggestedActions: [
        { label: `View ${matchedMinistry} in Projects`, query: matchedMinistry },
        { label: 'National Dashboard', query: 'show dashboard' }
      ]
    };
  }

  // 8. General / Summary Portfolio query
  return {
    text: `### PAIMANA AI Portfolio Intelligence\n\nI analyzed the **${projects.length} monitored infrastructure projects** in the active dataset.\n\n**Summary Highlights:**\n- **National Average Risk Score:** **${Math.round(projects.reduce((a, b) => a + (b.risk_score || calculateRiskScore(b)), 0) / projects.length)}/100**\n- **Portfolio Value:** Total revised cost of **${formatCurrency(projects.reduce((a, b) => a + (b.revised_cost || b.approved_cost), 0))}**\n- **Key Insight:** ${projects.filter(p => (p.risk_score || calculateRiskScore(p)) > 75).length} projects require immediate escalation review due to combined milestone delays (>18 months) and cost revisions.\n\nTry asking specific questions or click on one of the recommended prompts below:`,
    matchedProjects: projects.slice(0, 4),
    metrics: [
      { label: 'Total Tracked', value: `${projects.length}`, color: 'text-blue-600 dark:text-blue-400' },
      { label: 'Critical Assets', value: `${projects.filter(p => (p.risk_score || calculateRiskScore(p)) > 75).length}`, color: 'text-red-400' },
      { label: 'Sectors Monitored', value: '8 Sectors', color: 'text-emerald-400' }
    ],
    suggestedActions: [
      { label: 'What projects have highest risk?', query: 'What projects have the highest risk scores?' },
      { label: 'Show projects with cost escalation', query: 'Which projects show cost escalation risk?' },
      { label: 'Show high-risk projects in Maharashtra', query: 'Show high-risk projects in Maharashtra' },
      { label: 'Which sectors have highest average delay?', query: 'Which sectors have the highest average delay?' }
    ]
  };
}
