import { Project } from '../types/project';

/**
 * DEMO / SIMULATED DATA FOR HACKATHON PROTOTYPE
 * Note: These values are simulated for demonstration purposes representing 
 * typical PAIMANA / OCMS infrastructure parameters across Indian ministries.
 */
export const MOCK_PROJECTS: Project[] = [
  {
    project_id: "IN-TR-1001",
    project_name: "Western Dedicated Freight Corridor (WDFC Phase II)",
    ministry: "Ministry of Railways",
    sector: "Transport & Logistics",
    state: "Maharashtra",
    district: "Raigad",
    city: "Navi Mumbai / Uran",
    site_address: "JNPT Terminal Port Spur & DFCCIL Freight Marshalling Yard, Nhava Sheva, Raigad, Maharashtra 400707",
    location_accuracy: "EXACT_SITE",
    location_source: "DFCCIL Western Corridor DPR & JNPT Port Connectivity Survey",
    implementing_agency: "Dedicated Freight Corridor Corporation of India (DFCCIL)",
    approved_cost: 51100,
    revised_cost: 62450,
    expenditure: 44200,
    planned_start: "2018-04-15",
    planned_completion: "2023-12-31",
    expected_completion: "2025-06-30",
    physical_progress: 78.5,
    financial_progress: 86.4,
    total_milestones: 24,
    completed_milestones: 17,
    delayed_milestones: 5,
    cost_variance: 11350,
    time_variance: 18,
    risk_score: 68,
    cost_overrun_probability: 82,
    delay_probability: 76,
    implementation_risk: 64,
    risk_factors: [
      "Land acquisition hurdles along JNPT port connectivity spur",
      "Utility shifting delays in urban Thane district",
      "Cost escalation in imported electric locomotive signalling gear"
    ],
    alerts: [
      "Critical delay alert: JNPT section handover delayed by 7 months",
      "Cost revision approved: 22.2% escalation over initial estimates"
    ],
    recommendations: [
      "Initiate fast-track inter-departmental taskforce with Maharashtra State Revenue Dept",
      "Expedite sectional commissioning of already completed 380km stretch to realize partial freight revenue",
      "Conduct dynamic supplier review for signalling contractors"
    ],
    coordinates: { lat: 18.9482, lng: 72.9463 },
    progress_history: [
      { month: "Jan 24", planned: 70, actual: 64, expenditure: 38000 },
      { month: "Apr 24", planned: 76, actual: 68, expenditure: 40100 },
      { month: "Jul 24", planned: 82, actual: 73, expenditure: 42300 },
      { month: "Oct 24", planned: 88, actual: 78.5, expenditure: 44200 }
    ],
    milestones: [
      { id: "M1", name: "Land Acquisition & RoW Clearance", target_date: "2019-12-01", actual_date: "2021-03-15", status: "DELAYED", weight_percentage: 20 },
      { id: "M2", name: "Earthwork and Formation", target_date: "2021-06-30", actual_date: "2021-09-10", status: "COMPLETED", weight_percentage: 25 },
      { id: "M3", name: "Track Laying & Electrification", target_date: "2023-08-31", actual_date: "2024-04-10", status: "COMPLETED", weight_percentage: 30 },
      { id: "M4", name: "Signalling & Telecom Integration", target_date: "2023-12-31", status: "DELAYED", weight_percentage: 15 },
      { id: "M5", name: "Commissioning & Commercial Run", target_date: "2024-06-30", status: "PENDING", weight_percentage: 10 }
    ]
  },
  {
    project_id: "IN-TR-1002",
    project_name: "Mumbai-Ahmedabad High-Speed Rail Corridor (MAHSR)",
    ministry: "Ministry of Railways",
    sector: "Transport & Logistics",
    state: "Gujarat",
    district: "Surat",
    city: "Surat",
    site_address: "MAHSR High-Speed Rail Surat Station & Viaduct Casting Yard, Antroli, Surat, Gujarat 394325",
    location_accuracy: "EXACT_SITE",
    location_source: "NHSRCL Bullet Train Alignment Survey & Surat Terminal Construction Records",
    implementing_agency: "National High Speed Rail Corporation Ltd (NHSRCL)",
    approved_cost: 108000,
    revised_cost: 165000,
    expenditure: 74200,
    planned_start: "2017-09-14",
    planned_completion: "2023-08-15",
    expected_completion: "2027-12-31",
    physical_progress: 54.2,
    financial_progress: 68.7,
    total_milestones: 32,
    completed_milestones: 16,
    delayed_milestones: 11,
    cost_variance: 57000,
    time_variance: 52,
    risk_score: 84,
    cost_overrun_probability: 91,
    delay_probability: 88,
    implementation_risk: 79,
    risk_factors: [
      "Undersea tunnel specialized boring package redesign",
      "Currency exchange fluctuations (JPY to INR contract valuation)",
      "Maharashtra stretch RoW clearance legacy backlog"
    ],
    alerts: [
      "CRITICAL: Overall project cost variance exceeded 52.7%",
      "Schedule slippage: Rolling stock procurement timeline extended by 14 months"
    ],
    recommendations: [
      "Activate high-level joint coordination committee with JICA and Ministry of Finance",
      "Phase 1 early operationalization of Surat-Bilimora 50km section to demonstrate viability",
      "Deploy real-time automated ultrasonic inspection on viaduct segments"
    ],
    coordinates: { lat: 21.1458, lng: 72.9152 },
    progress_history: [
      { month: "Jan 24", planned: 60, actual: 44, expenditure: 58000 },
      { month: "Apr 24", planned: 66, actual: 48, expenditure: 64000 },
      { month: "Jul 24", planned: 72, actual: 51, expenditure: 69000 },
      { month: "Oct 24", planned: 78, actual: 54.2, expenditure: 74200 }
    ],
    milestones: [
      { id: "M1", name: "100% Land Acquisition (Gujarat)", target_date: "2020-03-31", actual_date: "2020-12-15", status: "COMPLETED", weight_percentage: 15 },
      { id: "M2", name: "Undersea Tunnel C-2 Package Award", target_date: "2021-08-31", actual_date: "2023-06-20", status: "DELAYED", weight_percentage: 20 },
      { id: "M3", name: "Viaduct Girder Launching (250km)", target_date: "2023-04-30", actual_date: "2024-02-12", status: "COMPLETED", weight_percentage: 25 },
      { id: "M4", name: "Track Bed Installation (J-Slab)", target_date: "2024-06-30", status: "DELAYED", weight_percentage: 20 },
      { id: "M5", name: "High Speed Shinkansen Trial Run", target_date: "2026-08-15", status: "PENDING", weight_percentage: 20 }
    ]
  },
  {
    project_id: "IN-EN-2001",
    project_name: "Khavda Ultra Mega Renewable Energy Park (30 GW)",
    ministry: "Ministry of New and Renewable Energy",
    sector: "Energy",
    state: "Gujarat",
    district: "Kutch",
    city: "Khavda",
    site_address: "Khavda Renewable Energy Park, Rann of Kutch Border Zone, Kutch District, Gujarat 370510",
    location_accuracy: "EXACT_SITE",
    location_source: "MNRE Ultra Mega Solar & Wind Park Notification & Adani Green Site Survey",
    implementing_agency: "Gujarat State Electricity Corp & Adani Green / NTPC",
    approved_cost: 150000,
    revised_cost: 154500,
    expenditure: 58000,
    planned_start: "2021-01-10",
    planned_completion: "2026-12-31",
    expected_completion: "2027-03-31",
    physical_progress: 46.0,
    financial_progress: 38.6,
    total_milestones: 20,
    completed_milestones: 11,
    delayed_milestones: 2,
    cost_variance: 4500,
    time_variance: 3,
    risk_score: 22,
    cost_overrun_probability: 18,
    delay_probability: 24,
    implementation_risk: 25,
    risk_factors: [
      "Grid transmission evacuation line readiness by PGCIL",
      "Harsh desert climate impacting high-voltage substation assembly"
    ],
    alerts: [
      "Notice: 500 MW solar cluster connected ahead of revised quarterly milestone"
    ],
    recommendations: [
      "Maintain active synchronization with ISTS (Inter-State Transmission System) substation Phase 2",
      "Deploy automated robotic dry-cleaning for solar PV arrays"
    ],
    coordinates: { lat: 23.9056, lng: 69.7825 },
    progress_history: [
      { month: "Jan 24", planned: 30, actual: 31, expenditure: 39000 },
      { month: "Apr 24", planned: 36, actual: 36.5, expenditure: 45000 },
      { month: "Jul 24", planned: 42, actual: 41.5, expenditure: 51000 },
      { month: "Oct 24", planned: 48, actual: 46.0, expenditure: 58000 }
    ]
  },
  {
    project_id: "IN-RD-3001",
    project_name: "Delhi-Dehradun Economic Corridor Expressway (NH-72A)",
    ministry: "Ministry of Road Transport and Highways",
    sector: "Transport & Logistics",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Dehradun",
    site_address: "Dat Kali Elevated Wildlife Corridor, Rajaji National Park Entry, Dehradun, Uttarakhand 248002",
    location_accuracy: "EXACT_SITE",
    location_source: "NHAI NH-72A Elevated Wildlife Corridor Construction Site Survey",
    implementing_agency: "National Highways Authority of India (NHAI)",
    approved_cost: 12300,
    revised_cost: 13900,
    expenditure: 9800,
    planned_start: "2021-03-01",
    planned_completion: "2024-06-30",
    expected_completion: "2025-04-30",
    physical_progress: 81.0,
    financial_progress: 79.5,
    total_milestones: 16,
    completed_milestones: 12,
    delayed_milestones: 3,
    cost_variance: 1600,
    time_variance: 10,
    risk_score: 44,
    cost_overrun_probability: 38,
    delay_probability: 52,
    implementation_risk: 42,
    risk_factors: [
      "Rajaji National Park wildlife elevated corridor environmental compliance",
      "Monsoon-induced landslides on section 4 tunnel portal"
    ],
    alerts: [
      "Wildlife mitigation audit pending for 12km elevated eco-span"
    ],
    recommendations: [
      "Coordinate with National Board for Wildlife for expedited eco-structure inspection",
      "Reinforce slope stabilization on tunnel approaches prior to monsoons"
    ],
    coordinates: { lat: 30.2315, lng: 77.9621 },
    progress_history: [
      { month: "Jan 24", planned: 72, actual: 68, expenditure: 7800 },
      { month: "Apr 24", planned: 80, actual: 73, expenditure: 8500 },
      { month: "Jul 24", planned: 88, actual: 77, expenditure: 9100 },
      { month: "Oct 24", planned: 95, actual: 81, expenditure: 9800 }
    ]
  },
  {
    project_id: "IN-WT-4001",
    project_name: "Ken-Betwa River Interlinking National Project",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    state: "Madhya Pradesh",
    district: "Chhatarpur",
    city: "Daudhan",
    site_address: "Daudhan Dam & Link Canal Reservoir Site, Chhatarpur-Panna Border, Madhya Pradesh 471311",
    location_accuracy: "EXACT_SITE",
    location_source: "National Water Development Agency (NWDA) Ken-Betwa DPR & Daudhan Dam Axis",
    implementing_agency: "Ken-Betwa Link Project Authority (KBLPA)",
    approved_cost: 44605,
    revised_cost: 53200,
    expenditure: 14200,
    planned_start: "2022-04-01",
    planned_completion: "2030-03-31",
    expected_completion: "2031-09-30",
    physical_progress: 24.5,
    financial_progress: 26.7,
    total_milestones: 28,
    completed_milestones: 7,
    delayed_milestones: 6,
    cost_variance: 8595,
    time_variance: 18,
    risk_score: 72,
    cost_overrun_probability: 78,
    delay_probability: 84,
    implementation_risk: 76,
    risk_factors: [
      "Panna Tiger Reserve compensatory afforestation and land handover disputes",
      "Submergence area R&R package rehabilitation resistance in 14 villages",
      "Daudhan Dam heavy rock excavation geological deviations"
    ],
    alerts: [
      "CRITICAL: Stage-II environmental clearance compliance query issued",
      "R&R disbursement delay causing local site blockade"
    ],
    recommendations: [
      "Empower District Magistrate led grievance redressal unit for village rehabilitation",
      "Establish 3D geological seismic monitoring around Daudhan dam foundation",
      "Review inter-state water sharing metering mechanism with UP government"
    ],
    coordinates: { lat: 24.6083, lng: 79.8653 },
    progress_history: [
      { month: "Jan 24", planned: 20, actual: 16, expenditure: 8900 },
      { month: "Apr 24", planned: 24, actual: 19, expenditure: 10800 },
      { month: "Jul 24", planned: 28, actual: 21.5, expenditure: 12400 },
      { month: "Oct 24", planned: 32, actual: 24.5, expenditure: 14200 }
    ]
  },
  {
    project_id: "IN-CM-5001",
    project_name: "BharatNet Phase III - Rural Optical Fiber Connectivity",
    ministry: "Ministry of Communications",
    sector: "Communication",
    state: "Bihar",
    district: "Patna",
    city: "Patna",
    site_address: "BBNL State Network Operations Center (NOC), Sanchar Sadan, Budh Marg, Patna, Bihar 800001",
    location_accuracy: "STATE",
    location_source: "USOF / BBNL State Optical Fiber Network Operations Center (Statewide rural rollout)",
    implementing_agency: "Bharat Broadband Network Limited (BBNL / BSNL)",
    approved_cost: 65000,
    revised_cost: 72800,
    expenditure: 39500,
    planned_start: "2020-10-01",
    planned_completion: "2024-12-31",
    expected_completion: "2025-10-31",
    physical_progress: 62.0,
    financial_progress: 54.2,
    total_milestones: 18,
    completed_milestones: 10,
    delayed_milestones: 4,
    cost_variance: 7800,
    time_variance: 10,
    risk_score: 55,
    cost_overrun_probability: 58,
    delay_probability: 69,
    implementation_risk: 59,
    risk_factors: [
      "Gram Panchayat RoW approvals pending in 28 remote flood-prone blocks",
      "Optical line terminal (OLT) hardware vendor supply chain bottlenecks"
    ],
    alerts: [
      "Warning: Fiber cut incidents in North Bihar exceeding SLA thresholds"
    ],
    recommendations: [
      "Transition from aerial cabling to underground ducting in high flood-risk belts",
      "Incentivize local Village Level Entrepreneurs (VLEs) for rapid fiber maintenance"
    ],
    coordinates: { lat: 25.612, lng: 85.1325 },
    progress_history: [
      { month: "Jan 24", planned: 55, actual: 48, expenditure: 31000 },
      { month: "Apr 24", planned: 62, actual: 52, expenditure: 34000 },
      { month: "Jul 24", planned: 70, actual: 57, expenditure: 36800 },
      { month: "Oct 24", planned: 78, actual: 62, expenditure: 39500 }
    ]
  },
  {
    project_id: "IN-CL-6001",
    project_name: "Talcher Coal Gasification & Urea Fertilizer Complex",
    ministry: "Ministry of Coal",
    sector: "Coal",
    state: "Odisha",
    district: "Angul",
    city: "Talcher",
    site_address: "TFL Complex Site, Vikrampur, Talcher Coalfields, Angul District, Odisha 759106",
    location_accuracy: "EXACT_SITE",
    location_source: "TFL Industrial Complex Siting & Ministry of Chemicals & Fertilizers Review",
    implementing_agency: "Talcher Fertilizers Limited (TFL - GAIL/CIL/RCF/FCIL)",
    approved_cost: 13277,
    revised_cost: 17800,
    expenditure: 11400,
    planned_start: "2019-09-17",
    planned_completion: "2023-09-30",
    expected_completion: "2025-08-31",
    physical_progress: 69.4,
    financial_progress: 64.0,
    total_milestones: 22,
    completed_milestones: 13,
    delayed_milestones: 6,
    cost_variance: 4523,
    time_variance: 23,
    risk_score: 79,
    cost_overrun_probability: 88,
    delay_probability: 85,
    implementation_risk: 81,
    risk_factors: [
      "Pioneering high-ash Indian coal gasification technology integration issues",
      "Specialized cryogenic Air Separation Unit (ASU) global supply delays",
      "EPC contractor cashflow constraints"
    ],
    alerts: [
      "CRITICAL: Gasifier vessel installation delayed by 180 days",
      "Capex escalation request pending with Cabinet Committee on Economic Affairs"
    ],
    recommendations: [
      "Station on-site senior technical taskforce from CSIR-CIMFR for gasification parameters",
      "Expedite advance vendor mobilization payments under escrow oversight",
      "Daily telemetry tracking of ASU compressor alignment"
    ],
    coordinates: { lat: 20.9531, lng: 85.2286 },
    progress_history: [
      { month: "Jan 24", planned: 75, actual: 58, expenditure: 9500 },
      { month: "Apr 24", planned: 82, actual: 62, expenditure: 10100 },
      { month: "Jul 24", planned: 89, actual: 65, expenditure: 10800 },
      { month: "Oct 24", planned: 96, actual: 69.4, expenditure: 11400 }
    ]
  },
  {
    project_id: "IN-ST-7001",
    project_name: "SAIL Bokaro Steel Plant Cold Rolling Mill Modernization",
    ministry: "Ministry of Steel",
    sector: "Steel",
    state: "Jharkhand",
    district: "Bokaro",
    city: "Bokaro Steel City",
    site_address: "SAIL Bokaro Steel Plant CRM-3 Complex, Sector 4, Bokaro Steel City, Jharkhand 827001",
    location_accuracy: "EXACT_SITE",
    location_source: "SAIL Bokaro Steel Plant Technical Expansion Milestone Blueprint",
    implementing_agency: "Steel Authority of India Limited (SAIL)",
    approved_cost: 8400,
    revised_cost: 9250,
    expenditure: 6800,
    planned_start: "2020-02-15",
    planned_completion: "2024-03-31",
    expected_completion: "2024-11-30",
    physical_progress: 88.0,
    financial_progress: 73.5,
    total_milestones: 15,
    completed_milestones: 12,
    delayed_milestones: 2,
    cost_variance: 850,
    time_variance: 8,
    risk_score: 36,
    cost_overrun_probability: 32,
    delay_probability: 45,
    implementation_risk: 31,
    risk_factors: [
      "Shutdown coordination with operational plant hot metal feed",
      "Imported automation sensors calibration delays"
    ],
    alerts: [
      "Notice: Tandem Cold Mill test rolling scheduled for next month"
    ],
    recommendations: [
      "Plan synchronized plant shutdown during low power tariff window",
      "Pre-commission auxiliary roll coolant systems"
    ],
    coordinates: { lat: 23.6705, lng: 86.1528 },
    progress_history: [
      { month: "Jan 24", planned: 80, actual: 76, expenditure: 5600 },
      { month: "Apr 24", planned: 87, actual: 81, expenditure: 6000 },
      { month: "Jul 24", planned: 93, actual: 85, expenditure: 6400 },
      { month: "Oct 24", planned: 98, actual: 88, expenditure: 6800 }
    ]
  },
  {
    project_id: "IN-MN-8001",
    project_name: "NMDC Bailadila Iron Ore Deposit 13 Mining Complex Expansion",
    ministry: "Ministry of Mines",
    sector: "Mining",
    state: "Chhattisgarh",
    district: "Dantewada",
    city: "Kirandul",
    site_address: "Deposit-13 Extraction Pit, Bailadila Hill Range, Kirandul, Dantewada District, Chhattisgarh 494556",
    location_accuracy: "EXACT_SITE",
    location_source: "NMDC Mining Lease Coordinates & IBM Approved Mine Plan",
    implementing_agency: "National Mineral Development Corporation (NMDC)",
    approved_cost: 4850,
    revised_cost: 5600,
    expenditure: 3200,
    planned_start: "2021-08-01",
    planned_completion: "2025-06-30",
    expected_completion: "2026-03-31",
    physical_progress: 58.0,
    financial_progress: 57.1,
    total_milestones: 14,
    completed_milestones: 8,
    delayed_milestones: 3,
    cost_variance: 750,
    time_variance: 9,
    risk_score: 48,
    cost_overrun_probability: 44,
    delay_probability: 58,
    implementation_risk: 46,
    risk_factors: [
      "Forest advisory committee mitigation compliance",
      "Slurry pipeline right-of-use land compensation settlements"
    ],
    alerts: [
      "Warning: Downhill conveyor erection equipment delivery delayed"
    ],
    recommendations: [
      "Direct village development committee CSR funds to surrounding Gram Panchayats",
      "Deploy drone lidar survey for conveyor corridor clearance verification"
    ],
    coordinates: { lat: 18.7295, lng: 81.2468 },
    progress_history: [
      { month: "Jan 24", planned: 45, actual: 40, expenditure: 2200 },
      { month: "Apr 24", planned: 52, actual: 46, expenditure: 2550 },
      { month: "Jul 24", planned: 60, actual: 52, expenditure: 2890 },
      { month: "Oct 24", planned: 68, actual: 58, expenditure: 3200 }
    ]
  },
  {
    project_id: "IN-SO-9001",
    project_name: "AIIMS Gorakhpur 750-Bed Super Specialty Hospital & Medical College",
    ministry: "Ministry of Health and Family Welfare",
    sector: "Social Infrastructure",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    site_address: "AIIMS Gorakhpur Campus, Kunraghat, Gorakhpur, Uttar Pradesh 273008",
    location_accuracy: "EXACT_SITE",
    location_source: "MoHFW PMSSY Project Repository & Survey of India Cadastral Map",
    implementing_agency: "Central Public Works Department (CPWD)",
    approved_cost: 1011,
    revised_cost: 1180,
    expenditure: 1050,
    planned_start: "2019-01-15",
    planned_completion: "2022-12-31",
    expected_completion: "2024-10-31",
    physical_progress: 96.0,
    financial_progress: 88.9,
    total_milestones: 12,
    completed_milestones: 11,
    delayed_milestones: 1,
    cost_variance: 169,
    time_variance: 22,
    risk_score: 28,
    cost_overrun_probability: 20,
    delay_probability: 15,
    implementation_risk: 18,
    risk_factors: [
      "Specialized MRI/Oncology medical gas line final licensing",
      "Fire safety NOC final inspection clearances"
    ],
    alerts: [
      "Notice: Final commissioning trials underway"
    ],
    recommendations: [
      "Expedite joint CPWD and State Fire Service compliance review",
      "Begin phased patient intake in outpatient wing"
    ],
    coordinates: { lat: 26.7441, lng: 83.4389 },
    progress_history: [
      { month: "Jan 24", planned: 92, actual: 90, expenditure: 950 },
      { month: "Apr 24", planned: 95, actual: 92, expenditure: 980 },
      { month: "Jul 24", planned: 98, actual: 94, expenditure: 1010 },
      { month: "Oct 24", planned: 100, actual: 96, expenditure: 1050 }
    ]
  },
  {
    project_id: "IN-TR-1003",
    project_name: "Eastern Dedicated Freight Corridor (Sonnagar - Dankuni PPP Spur)",
    ministry: "Ministry of Railways",
    sector: "Transport & Logistics",
    state: "West Bengal",
    district: "Hooghly",
    city: "Dankuni",
    site_address: "Dankuni DFCCIL Freight Terminal Junction, Dankuni, Hooghly District, West Bengal 712311",
    location_accuracy: "EXACT_SITE",
    location_source: "DFCCIL Eastern Corridor Sonnagar-Dankuni Section Masterplan",
    implementing_agency: "Dedicated Freight Corridor Corporation of India (DFCCIL)",
    approved_cost: 18500,
    revised_cost: 24800,
    expenditure: 8200,
    planned_start: "2019-06-01",
    planned_completion: "2024-03-31",
    expected_completion: "2027-03-31",
    physical_progress: 32.0,
    financial_progress: 33.1,
    total_milestones: 26,
    completed_milestones: 7,
    delayed_milestones: 10,
    cost_variance: 6300,
    time_variance: 36,
    risk_score: 89,
    cost_overrun_probability: 94,
    delay_probability: 92,
    implementation_risk: 86,
    risk_factors: [
      "PPP model concessionaire re-bidding and equity infusion dispute",
      "Dense coal corridor land parcels acquisition resistance",
      "Major river bridge foundation design review over Hooghly basin"
    ],
    alerts: [
      "CRITICAL: Concessionaire financial closure milestone defaulted",
      "Land acquisition stuck at 42% for over 18 months"
    ],
    recommendations: [
      "Restructure project model from Design-Build-Finance to EPC hybrid annuity model",
      "Convene Chief Secretary level taskforce with Government of West Bengal",
      "Re-package 538km stretch into smaller 100km construction lots"
    ],
    coordinates: { lat: 22.6865, lng: 88.3 },
    progress_history: [
      { month: "Jan 24", planned: 45, actual: 26, expenditure: 6500 },
      { month: "Apr 24", planned: 52, actual: 28, expenditure: 7100 },
      { month: "Jul 24", planned: 59, actual: 30, expenditure: 7650 },
      { month: "Oct 24", planned: 66, actual: 32, expenditure: 8200 }
    ]
  },
  {
    project_id: "IN-TR-1004",
    project_name: "Zojila Tunnel Project (NH-1 Strategic All-Weather Link)",
    ministry: "Ministry of Road Transport and Highways",
    sector: "Transport & Logistics",
    state: "Jammu and Kashmir",
    district: "Ganderbal",
    city: "Baltal / Sonamarg",
    site_address: "Zojila Tunnel West Portal, Baltal-Sonamarg Axis, Ganderbal District, Jammu & Kashmir 191203",
    location_accuracy: "EXACT_SITE",
    location_source: "NHIDCL Strategic Tunnel Engineering Division & Survey of India Geodetic Coordinates",
    implementing_agency: "National Highways & Infrastructure Development Corp (NHIDCL)",
    approved_cost: 6800,
    revised_cost: 8100,
    expenditure: 4900,
    planned_start: "2020-10-15",
    planned_completion: "2026-10-31",
    expected_completion: "2027-08-31",
    physical_progress: 64.0,
    financial_progress: 60.5,
    total_milestones: 18,
    completed_milestones: 10,
    delayed_milestones: 3,
    cost_variance: 1300,
    time_variance: 10,
    risk_score: 52,
    cost_overrun_probability: 60,
    delay_probability: 65,
    implementation_risk: 54,
    risk_factors: [
      "Severe winter sub-zero work window constraints (November to April)",
      "Unforeseen geological shear zone water ingress at 11,500 ft altitude"
    ],
    alerts: [
      "Warning: Heavy avalanche damaged temporary approach portal"
    ],
    recommendations: [
      "Deploy automated heating shotcrete machines for sub-zero operations",
      "Install real-time seismic radar and continuous water drainage bores"
    ],
    coordinates: { lat: 34.2986, lng: 75.3942 },
    progress_history: [
      { month: "Jan 24", planned: 55, actual: 50, expenditure: 3800 },
      { month: "Apr 24", planned: 60, actual: 54, expenditure: 4200 },
      { month: "Jul 24", planned: 66, actual: 60, expenditure: 4600 },
      { month: "Oct 24", planned: 72, actual: 64, expenditure: 4900 }
    ]
  },
  {
    project_id: "IN-EN-2002",
    project_name: "Kudankulam Nuclear Power Plant Units 3 & 4 (2 x 1000 MW)",
    ministry: "Department of Atomic Energy",
    sector: "Energy",
    state: "Tamil Nadu",
    district: "Tirunelveli",
    city: "Kudankulam",
    site_address: "KKNPP Reactor Complex Site, Radhapuram Taluk, Tirunelveli District, Tamil Nadu 627106",
    location_accuracy: "EXACT_SITE",
    location_source: "AERB Geodetic Coordinates & NPCIL Reactor Siting Report",
    implementing_agency: "Nuclear Power Corporation of India Limited (NPCIL)",
    approved_cost: 39849,
    revised_cost: 49600,
    expenditure: 36200,
    planned_start: "2016-02-17",
    planned_completion: "2023-11-30",
    expected_completion: "2025-12-31",
    physical_progress: 74.0,
    financial_progress: 73.0,
    total_milestones: 30,
    completed_milestones: 20,
    delayed_milestones: 7,
    cost_variance: 9751,
    time_variance: 25,
    risk_score: 75,
    cost_overrun_probability: 80,
    delay_probability: 82,
    implementation_risk: 68,
    risk_factors: [
      "Specialized reactor coolant pump component shipment logistics from Russia",
      "Stringent AERB safety regulatory validation checkpoints",
      "Civil containment prestressing wire-bundle tension verification"
    ],
    alerts: [
      "CRITICAL: Reactor pressure vessel hydrostatic test schedule delayed by 90 days"
    ],
    recommendations: [
      "Establish direct liaison cell with Rosatom for equipment consignment clearance",
      "Deploy parallel piping pre-fabrication at off-site yard to compress integration timeline"
    ],
    coordinates: { lat: 8.1722, lng: 77.7118 },
    progress_history: [
      { month: "Jan 24", planned: 76, actual: 66, expenditure: 32000 },
      { month: "Apr 24", planned: 80, actual: 69, expenditure: 33500 },
      { month: "Jul 24", planned: 85, actual: 71.5, expenditure: 34900 },
      { month: "Oct 24", planned: 90, actual: 74.0, expenditure: 36200 }
    ]
  },
  {
    project_id: "IN-TR-1005",
    project_name: "Navi Mumbai International Airport (NMIA Phase 1)",
    ministry: "Ministry of Civil Aviation",
    sector: "Transport & Logistics",
    state: "Maharashtra",
    district: "Raigad",
    city: "Navi Mumbai",
    site_address: "NMIA Terminal Complex Site, Ulwe-Panvel Green Belt, Raigad District, Maharashtra 410206",
    location_accuracy: "EXACT_SITE",
    location_source: "CIDCO Airport Project Masterplan & AAI Aerodrome Coordinates",
    implementing_agency: "CIDCO / Adani Airport Holdings Limited (NMIAL)",
    approved_cost: 16700,
    revised_cost: 19600,
    expenditure: 14800,
    planned_start: "2018-08-01",
    planned_completion: "2024-03-31",
    expected_completion: "2025-03-31",
    physical_progress: 86.5,
    financial_progress: 75.5,
    total_milestones: 22,
    completed_milestones: 18,
    delayed_milestones: 3,
    cost_variance: 2900,
    time_variance: 12,
    risk_score: 42,
    cost_overrun_probability: 45,
    delay_probability: 50,
    implementation_risk: 38,
    risk_factors: [
      "Ulwe river course diversion slope stabilization",
      "Air Traffic Control (ATC) communication radar flight calibration testing"
    ],
    alerts: [
      "Notice: Runway 08/26 lighting calibration trials initiated"
    ],
    recommendations: [
      "Coordinate with DGCA for fast-tracked aerodrome licensing inspection",
      "Complete multi-modal road connectivity links from Mumbai Trans Harbour Link (MTHL)"
    ],
    coordinates: { lat: 18.9902, lng: 73.0694 },
    progress_history: [
      { month: "Jan 24", planned: 78, actual: 74, expenditure: 12100 },
      { month: "Apr 24", planned: 84, actual: 79, expenditure: 13000 },
      { month: "Jul 24", planned: 90, actual: 83, expenditure: 13900 },
      { month: "Oct 24", planned: 96, actual: 86.5, expenditure: 14800 }
    ]
  },
  {
    project_id: "IN-WT-4002",
    project_name: "Polavaram Multipurpose National Irrigation Project",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    state: "Andhra Pradesh",
    district: "Eluru",
    city: "Polavaram",
    site_address: "Polavaram Spillway & Earth-cum-Rock Fill Dam, Ramayyapet, Eluru District, Andhra Pradesh 534315",
    location_accuracy: "EXACT_SITE",
    location_source: "Central Water Commission (CWC) National Project Dossier & PPA Dam Coordinates",
    implementing_agency: "Polavaram Project Authority (PPA) / AP Water Resources",
    approved_cost: 55548,
    revised_cost: 65900,
    expenditure: 23100,
    planned_start: "2014-05-01",
    planned_completion: "2021-12-31",
    expected_completion: "2026-06-30",
    physical_progress: 49.0,
    financial_progress: 35.0,
    total_milestones: 34,
    completed_milestones: 15,
    delayed_milestones: 12,
    cost_variance: 10352,
    time_variance: 54,
    risk_score: 87,
    cost_overrun_probability: 92,
    delay_probability: 95,
    implementation_risk: 84,
    risk_factors: [
      "Diaphragm wall damage due to unprecedented Godavari flash floods",
      "Earth-cum-Rock Fill (ECRF) dam gap 1 and gap 2 design modifications",
      "Rehabilitation and Resettlement (R&R) cost estimation deadlock"
    ],
    alerts: [
      "CRITICAL: Central Water Commission vibro-compaction test review ongoing",
      "Flood discharge capacity expansion requirement mandated by CWC"
    ],
    recommendations: [
      "Implement international dam safety expert recommendations for D-wall reconstruction",
      "Set up dedicated Central escrow account for R&R phase 1 (up to +41.15m contour)",
      "Establish round-the-clock hydrologic telemetry warning stations upstream"
    ],
    coordinates: { lat: 17.2589, lng: 81.6583 },
    progress_history: [
      { month: "Jan 24", planned: 55, actual: 44, expenditure: 19500 },
      { month: "Apr 24", planned: 60, actual: 46, expenditure: 20800 },
      { month: "Jul 24", planned: 65, actual: 47.5, expenditure: 21900 },
      { month: "Oct 24", planned: 70, actual: 49.0, expenditure: 23100 }
    ]
  },
  {
    project_id: "IN-EN-2003",
    project_name: "Tehri Pumped Storage Hydroelectric Plant (1000 MW)",
    ministry: "Ministry of Power",
    sector: "Energy",
    state: "Uttarakhand",
    district: "Tehri Garhwal",
    city: "New Tehri",
    site_address: "THDC Underground Powerhouse Complex, Bhagirathi River Gorge, Tehri Garhwal, Uttarakhand 249001",
    location_accuracy: "EXACT_SITE",
    location_source: "Central Electricity Authority (CEA) Hydro Project Siting & THDC Technical Division",
    implementing_agency: "THDC India Limited",
    approved_cost: 2978,
    revised_cost: 5980,
    expenditure: 4900,
    planned_start: "2011-05-01",
    planned_completion: "2018-05-31",
    expected_completion: "2024-12-31",
    physical_progress: 91.0,
    financial_progress: 81.9,
    total_milestones: 24,
    completed_milestones: 20,
    delayed_milestones: 4,
    cost_variance: 3002,
    time_variance: 79,
    risk_score: 58,
    cost_overrun_probability: 72,
    delay_probability: 60,
    implementation_risk: 45,
    risk_factors: [
      "Complex head race tunnel rock burst and geological ingress history",
      "Reversible Francis turbine runner dynamic balancing testing"
    ],
    alerts: [
      "Notice: Unit 1 synchronizing trials scheduled with Northern Regional Load Dispatch Centre"
    ],
    recommendations: [
      "Complete final tailrace tunnel dry-run inspection",
      "Coordinate with PGCIL for grid ancillary service operational protocol"
    ],
    coordinates: { lat: 30.3783, lng: 78.4808 },
    progress_history: [
      { month: "Jan 24", planned: 88, actual: 84, expenditure: 4200 },
      { month: "Apr 24", planned: 92, actual: 87, expenditure: 4450 },
      { month: "Jul 24", planned: 96, actual: 89, expenditure: 4700 },
      { month: "Oct 24", planned: 100, actual: 91, expenditure: 4900 }
    ]
  },
  {
    project_id: "IN-TR-1006",
    project_name: "Bengaluru Metro Rail Phase 2 (Pink & Blue Airport Line)",
    ministry: "Ministry of Housing and Urban Affairs",
    sector: "Transport & Logistics",
    state: "Karnataka",
    district: "Bengaluru Urban",
    city: "Bengaluru",
    site_address: "BMRCL Phase 2 Airport Line Junction, Hebbal Interchange, Bengaluru, Karnataka 560024",
    location_accuracy: "CITY",
    location_source: "BMRCL Alignment Alignment Engineering Maps & Metro Route Survey",
    implementing_agency: "Bangalore Metro Rail Corporation Limited (BMRCL)",
    approved_cost: 30695,
    revised_cost: 36400,
    expenditure: 21500,
    planned_start: "2017-06-01",
    planned_completion: "2023-06-30",
    expected_completion: "2026-06-30",
    physical_progress: 68.0,
    financial_progress: 59.1,
    total_milestones: 28,
    completed_milestones: 17,
    delayed_milestones: 6,
    cost_variance: 5705,
    time_variance: 36,
    risk_score: 64,
    cost_overrun_probability: 75,
    delay_probability: 78,
    implementation_risk: 62,
    risk_factors: [
      "Underground tunneling through hard granite formations beneath MG Road/Shivajinagar",
      "Outer Ring Road elevated pier utility cable shifting delays"
    ],
    alerts: [
      "Warning: TBM 'Bhadra' breakthrough delayed by 45 days due to hard strata cutter wear"
    ],
    recommendations: [
      "Deploy heavy-duty tungsten carbide cutter heads for remaining 1.8km tunnel drive",
      "Authorize nighttime traffic diversions on ORR in coordination with Bengaluru City Traffic Police"
    ],
    coordinates: { lat: 13.0358, lng: 77.597 },
    progress_history: [
      { month: "Jan 24", planned: 65, actual: 56, expenditure: 17200 },
      { month: "Apr 24", planned: 71, actual: 60, expenditure: 18600 },
      { month: "Jul 24", planned: 77, actual: 64, expenditure: 20100 },
      { month: "Oct 24", planned: 83, actual: 68, expenditure: 21500 }
    ]
  },
  {
    project_id: "IN-RD-3002",
    project_name: "Bharatmala Pariyojana - Raipur-Visakhapatnam Economic Corridor (NH-130CD)",
    ministry: "Ministry of Road Transport and Highways",
    sector: "Transport & Logistics",
    state: "Odisha",
    district: "Koraput",
    city: "Koraput / Jeypore",
    site_address: "NH-130CD Green Expressway Section, Koraput-Jeypore Ghat Corridor, Koraput District, Odisha 764020",
    location_accuracy: "DISTRICT",
    location_source: "NHAI Bharatmala Project Alignment Sheet & MoRTH Milestone Tracking",
    implementing_agency: "National Highways Authority of India (NHAI)",
    approved_cost: 15390,
    revised_cost: 16800,
    expenditure: 11200,
    planned_start: "2021-04-01",
    planned_completion: "2025-03-31",
    expected_completion: "2025-11-30",
    physical_progress: 72.0,
    financial_progress: 66.7,
    total_milestones: 20,
    completed_milestones: 14,
    delayed_milestones: 3,
    cost_variance: 1410,
    time_variance: 8,
    risk_score: 38,
    cost_overrun_probability: 35,
    delay_probability: 48,
    implementation_risk: 36,
    risk_factors: [
      "Sunabeda wildlife sanctuary bypass bridge approvals",
      "Quarry lease licensing delays in Koraput district"
    ],
    alerts: [
      "Notice: Section 2 (85km) bituminous base course completed"
    ],
    recommendations: [
      "Expedite aggregate sourcing agreements with local district mining offices",
      "Deploy automated GPS paver compactors to accelerate wearing coat layer"
    ],
    coordinates: { lat: 18.8135, lng: 82.7118 },
    progress_history: [
      { month: "Jan 24", planned: 60, actual: 56, expenditure: 8800 },
      { month: "Apr 24", planned: 68, actual: 62, expenditure: 9600 },
      { month: "Jul 24", planned: 75, actual: 67, expenditure: 10400 },
      { month: "Oct 24", planned: 82, actual: 72, expenditure: 11200 }
    ]
  },
  {
    project_id: "IN-EN-2004",
    project_name: "Green Hydrogen / Ammonia Mega Production Hub Vizag",
    ministry: "Ministry of New and Renewable Energy",
    sector: "Energy",
    state: "Andhra Pradesh",
    district: "Anakapalli",
    city: "Visakhapatnam / Pudimadaka",
    site_address: "Pudimadaka Industrial Estate Green Hydrogen Park, Atchutapuram Mandal, Anakapalli District, Andhra Pradesh 531011",
    location_accuracy: "EXACT_SITE",
    location_source: "NTPC Green Energy Pudimadaka Project Land Allotment Survey",
    implementing_agency: "NTPC Green Energy Limited (NGEL)",
    approved_cost: 85000,
    revised_cost: 86200,
    expenditure: 12500,
    planned_start: "2023-01-15",
    planned_completion: "2028-12-31",
    expected_completion: "2029-03-31",
    physical_progress: 18.0,
    financial_progress: 14.5,
    total_milestones: 22,
    completed_milestones: 4,
    delayed_milestones: 1,
    cost_variance: 1200,
    time_variance: 3,
    risk_score: 24,
    cost_overrun_probability: 22,
    delay_probability: 20,
    implementation_risk: 26,
    risk_factors: [
      "Global electrolyzer stack technology licensing lead times",
      "Desalination plant seawater intake environmental baseline studies"
    ],
    alerts: [
      "Notice: 1200-acre land lease registered at Pudimadaka Industrial Park"
    ],
    recommendations: [
      "Finalize long-term green ammonia export offtake agreements with East Asian utilities",
      "Fast-track coastal regulation zone (CRZ) clearance dossier"
    ],
    coordinates: { lat: 17.495, lng: 83.0033 },
    progress_history: [
      { month: "Jan 24", planned: 8, actual: 7, expenditure: 4200 },
      { month: "Apr 24", planned: 12, actual: 11, expenditure: 6800 },
      { month: "Jul 24", planned: 16, actual: 14.5, expenditure: 9500 },
      { month: "Oct 24", planned: 20, actual: 18, expenditure: 12500 }
    ]
  },
  {
    project_id: "IN-TR-1007",
    project_name: "Great Nicobar International Transshipment Terminal (Galathea Bay)",
    ministry: "Ministry of Ports, Shipping and Waterways",
    sector: "Transport & Logistics",
    state: "Andaman and Nicobar Islands",
    district: "Nicobars",
    city: "Campbell Bay / Galathea",
    site_address: "Galathea Bay Deep-Water Transshipment Port Site, Great Nicobar Island, Nicobar District 744302",
    location_accuracy: "EXACT_SITE",
    location_source: "Ministry of Ports, Shipping and Waterways Port Siting Blueprint & NITI Aayog Great Nicobar DPR",
    implementing_agency: "Andaman and Nicobar Islands Integrated Development Corp (ANIIDCO)",
    approved_cost: 72000,
    revised_cost: 78500,
    expenditure: 6200,
    planned_start: "2022-11-01",
    planned_completion: "2029-12-31",
    expected_completion: "2031-06-30",
    physical_progress: 12.0,
    financial_progress: 7.9,
    total_milestones: 26,
    completed_milestones: 3,
    delayed_milestones: 4,
    cost_variance: 6500,
    time_variance: 18,
    risk_score: 74,
    cost_overrun_probability: 80,
    delay_probability: 86,
    implementation_risk: 78,
    risk_factors: [
      "Island endemic biodiversity mitigation & Shompen tribal buffer zones",
      "Logistics mobilisation of deep-sea breakwater heavy marine equipment",
      "NGT court challenges regarding coral reef trans-location"
    ],
    alerts: [
      "CRITICAL: High-powered committee review required on environmental mitigation plan"
    ],
    recommendations: [
      "Execute state-of-the-art geo-tagged coral trans-location under Zoological Survey of India guidance",
      "Establish naval maritime security base coordination for construction vessel convoy safety"
    ],
    coordinates: { lat: 6.8333, lng: 93.85 },
    progress_history: [
      { month: "Jan 24", planned: 8, actual: 5, expenditure: 2100 },
      { month: "Apr 24", planned: 12, actual: 7, expenditure: 3400 },
      { month: "Jul 24", planned: 16, actual: 9.5, expenditure: 4800 },
      { month: "Oct 24", planned: 20, actual: 12, expenditure: 6200 }
    ]
  },
  {
    project_id: "IN-WT-4003",
    project_name: "Jal Jeevan Mission - Bundelkhand Surface Water Rural Supply Project",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    state: "Uttar Pradesh",
    district: "Jhansi",
    city: "Jhansi / Babina",
    site_address: "Bundelkhand Regional Water Treatment Plant & Intake Well, Betwa River Basin, Jhansi, UP 284401",
    location_accuracy: "DISTRICT",
    location_source: "State Water & Sanitation Mission (SWSM) Uttar Pradesh Jal Jeevan Mission Engineering Division",
    implementing_agency: "State Water & Sanitation Mission (SWSM UP)",
    approved_cost: 15640,
    revised_cost: 16900,
    expenditure: 14100,
    planned_start: "2020-02-01",
    planned_completion: "2023-12-31",
    expected_completion: "2024-12-31",
    physical_progress: 89.5,
    financial_progress: 83.4,
    total_milestones: 20,
    completed_milestones: 17,
    delayed_milestones: 2,
    cost_variance: 1260,
    time_variance: 12,
    risk_score: 32,
    cost_overrun_probability: 28,
    delay_probability: 40,
    implementation_risk: 30,
    risk_factors: [
      "Hard rocky terrain pipeline trenching in Jhansi & Lalitpur districts",
      "Village water and sanitation committee (VWSC) operations handover"
    ],
    alerts: [
      "Notice: 3,400 rural habitations achieved 100% functional household tap connections"
    ],
    recommendations: [
      "Integrate IoT automated flowmeter telemetry for real-time village tap pressure monitoring",
      "Train local women 'Jal Sakhis' for daily water quality field test kit sampling"
    ],
    coordinates: { lat: 25.4484, lng: 78.5685 },
    progress_history: [
      { month: "Jan 24", planned: 80, actual: 78, expenditure: 11800 },
      { month: "Apr 24", planned: 86, actual: 82, expenditure: 12500 },
      { month: "Jul 24", planned: 92, actual: 86, expenditure: 13300 },
      { month: "Oct 24", planned: 98, actual: 89.5, expenditure: 14100 }
    ]
  },
  {
    project_id: "IN-CM-5002",
    project_name: "National Tier-IV Government Cloud Data Center Greater Noida",
    ministry: "Ministry of Electronics and Information Technology",
    sector: "Communication",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    city: "Greater Noida",
    site_address: "Knowledge Park V, Tech Zone, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306",
    location_accuracy: "EXACT_SITE",
    location_source: "MeitY National Cloud Data Center Site Allocation Notification",
    implementing_agency: "National Informatics Centre Services Inc (NICSI)",
    approved_cost: 3200,
    revised_cost: 3450,
    expenditure: 2650,
    planned_start: "2021-06-01",
    planned_completion: "2024-06-30",
    expected_completion: "2024-12-31",
    physical_progress: 92.0,
    financial_progress: 76.8,
    total_milestones: 16,
    completed_milestones: 14,
    delayed_milestones: 1,
    cost_variance: 250,
    time_variance: 6,
    risk_score: 21,
    cost_overrun_probability: 15,
    delay_probability: 25,
    implementation_risk: 19,
    risk_factors: [
      "High-density server rack HVAC cooling chillers factory acceptance testing"
    ],
    alerts: [
      "Notice: Dual 220kV captive power substation energized successfully"
    ],
    recommendations: [
      "Conduct ISO 27001 & Uptime Institute Tier IV reliability stress tests",
      "Deploy AI thermal sensor balancing for energy efficiency"
    ],
    coordinates: { lat: 28.5912, lng: 77.4682 },
    progress_history: [
      { month: "Jan 24", planned: 82, actual: 80, expenditure: 2100 },
      { month: "Apr 24", planned: 88, actual: 85, expenditure: 2300 },
      { month: "Jul 24", planned: 94, actual: 89, expenditure: 2500 },
      { month: "Oct 24", planned: 100, actual: 92, expenditure: 2650 }
    ]
  },
  {
    project_id: "IN-SO-9002",
    project_name: "PM-MITRA Mega Integrated Textile Region & Apparel Park (Dhar)",
    ministry: "Ministry of Textiles",
    sector: "Social Infrastructure",
    state: "Madhya Pradesh",
    district: "Dhar",
    city: "Badnawar",
    site_address: "PM-MITRA Industrial Park, Bhaisol Village, Badnawar Tehsil, Dhar District, Madhya Pradesh 454660",
    location_accuracy: "EXACT_SITE",
    location_source: "Ministry of Textiles PM-MITRA Site Notification & MPIDC Industrial Boundary Map",
    implementing_agency: "MP Industrial Development Corporation (MPIDC)",
    approved_cost: 4445,
    revised_cost: 4700,
    expenditure: 1900,
    planned_start: "2022-09-01",
    planned_completion: "2026-03-31",
    expected_completion: "2026-08-31",
    physical_progress: 44.0,
    financial_progress: 40.4,
    total_milestones: 16,
    completed_milestones: 8,
    delayed_milestones: 2,
    cost_variance: 255,
    time_variance: 5,
    risk_score: 30,
    cost_overrun_probability: 25,
    delay_probability: 35,
    implementation_risk: 28,
    risk_factors: [
      "Common effluent treatment plant (CETP) zero liquid discharge pipeline approvals"
    ],
    alerts: [
      "Notice: 18 anchor investor industrial plots allocated"
    ],
    recommendations: [
      "Fast-track high-tension dedicated power feeder installation",
      "Establish on-site technical skill training center with NIFT"
    ],
    coordinates: { lat: 22.9542, lng: 75.2514 },
    progress_history: [
      { month: "Jan 24", planned: 30, actual: 28, expenditure: 1100 },
      { month: "Apr 24", planned: 38, actual: 34, expenditure: 1400 },
      { month: "Jul 24", planned: 45, actual: 39, expenditure: 1650 },
      { month: "Oct 24", planned: 52, actual: 44, expenditure: 1900 }
    ]
  },
  {
    project_id: "IN-TR-1008",
    project_name: "Noida International Airport (Jewar Phase 1)",
    ministry: "Ministry of Civil Aviation",
    sector: "Transport & Logistics",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    city: "Jewar",
    site_address: "Jewar Airport Site, Yamuna Expressway Industrial Area, Gautam Buddha Nagar, Uttar Pradesh 203135",
    location_accuracy: "EXACT_SITE",
    location_source: "DGCA Aerodrome Reference Point & YIAPL Airport Blueprint",
    implementing_agency: "Yamuna International Airport Private Limited (YIAPL)",
    approved_cost: 10056,
    revised_cost: 12200,
    expenditure: 9600,
    planned_start: "2020-10-01",
    planned_completion: "2024-09-30",
    expected_completion: "2025-04-30",
    physical_progress: 87.0,
    financial_progress: 78.7,
    total_milestones: 20,
    completed_milestones: 16,
    delayed_milestones: 2,
    cost_variance: 2144,
    time_variance: 7,
    risk_score: 39,
    cost_overrun_probability: 42,
    delay_probability: 46,
    implementation_risk: 35,
    risk_factors: [
      "Baggage handling system (BHS) and passenger boarding bridge international testing",
      "DGCA instrument landing system (ILS CAT III-B) calibration"
    ],
    alerts: [
      "Notice: Successful calibration flight completed by Airport Authority of India aircraft"
    ],
    recommendations: [
      "Complete final commercial concessionaire retail fitouts",
      "Synchronize multi-modal Yamuna Expressway cloverleaf interchange opening"
    ],
    coordinates: { lat: 28.163, lng: 77.585 },
    progress_history: [
      { month: "Jan 24", planned: 78, actual: 72, expenditure: 7800 },
      { month: "Apr 24", planned: 85, actual: 78, expenditure: 8400 },
      { month: "Jul 24", planned: 92, actual: 83, expenditure: 9000 },
      { month: "Oct 24", planned: 98, actual: 87, expenditure: 9600 }
    ]
  },
  {
    project_id: "IN-CL-6002",
    project_name: "Coal India Gevra Mega Open Cast Mine Expansion (70 MTPA)",
    ministry: "Ministry of Coal",
    sector: "Coal",
    state: "Chhattisgarh",
    district: "Korba",
    city: "Gevra",
    site_address: "Gevra OC Mine Complex, SECL Gevra Area, Korba District, Chhattisgarh 495452",
    location_accuracy: "EXACT_SITE",
    location_source: "SECL Mining Coordinates & MoEFCC Environmental Clearance",
    implementing_agency: "South Eastern Coalfields Limited (SECL / CIL)",
    approved_cost: 11800,
    revised_cost: 13200,
    expenditure: 8400,
    planned_start: "2021-01-01",
    planned_completion: "2025-12-31",
    expected_completion: "2026-09-30",
    physical_progress: 67.0,
    financial_progress: 63.6,
    total_milestones: 18,
    completed_milestones: 11,
    delayed_milestones: 3,
    cost_variance: 1400,
    time_variance: 9,
    risk_score: 46,
    cost_overrun_probability: 45,
    delay_probability: 54,
    implementation_risk: 47,
    risk_factors: [
      "Heavy Earth Moving Machinery (HEMM) 240-tonne dumper delivery timeline",
      "Continuous ambient air quality monitor dust suppression compliance"
    ],
    alerts: [
      "Notice: First cut overburden removal initiated in Sector C"
    ],
    recommendations: [
      "Deploy automated in-pit crushing and continuous overland conveying system",
      "Expand dense afforestation green belt on mined-out dumps"
    ],
    coordinates: { lat: 22.3486, lng: 82.5932 },
    progress_history: [
      { month: "Jan 24", planned: 55, actual: 51, expenditure: 6500 },
      { month: "Apr 24", planned: 63, actual: 57, expenditure: 7200 },
      { month: "Jul 24", planned: 70, actual: 62, expenditure: 7800 },
      { month: "Oct 24", planned: 78, actual: 67, expenditure: 8400 }
    ]
  },
  {
    project_id: "IN-ST-7002",
    project_name: "SAIL Bhilai Steel Plant Blast Furnace 8 Capacity Augmentation",
    ministry: "Ministry of Steel",
    sector: "Steel",
    state: "Chhattisgarh",
    district: "Durg",
    city: "Bhilai",
    site_address: "SAIL Bhilai Steel Plant Complex, Blast Furnace 8 Area, Bhilai, Durg District, Chhattisgarh 490001",
    location_accuracy: "EXACT_SITE",
    location_source: "SAIL Bhilai Steel Plant Modernization Technical Specifications",
    implementing_agency: "Steel Authority of India Limited (SAIL)",
    approved_cost: 6200,
    revised_cost: 7100,
    expenditure: 5100,
    planned_start: "2020-07-01",
    planned_completion: "2024-06-30",
    expected_completion: "2025-01-31",
    physical_progress: 83.0,
    financial_progress: 71.8,
    total_milestones: 15,
    completed_milestones: 11,
    delayed_milestones: 2,
    cost_variance: 900,
    time_variance: 7,
    risk_score: 39,
    cost_overrun_probability: 36,
    delay_probability: 44,
    implementation_risk: 35,
    risk_factors: [
      "Hot blast stove refractory brick lining installation precision",
      "Coke dry quenching plant steam tie-in scheduling"
    ],
    alerts: [
      "Notice: Top gas recovery turbine assembly completed"
    ],
    recommendations: [
      "Maintain continuous thermal imaging on stove shells during pre-heating",
      "Finalize pulverized coal injection (PCI) safety interlocks"
    ],
    coordinates: { lat: 21.1895, lng: 81.385 },
    progress_history: [
      { month: "Jan 24", planned: 74, actual: 70, expenditure: 4200 },
      { month: "Apr 24", planned: 81, actual: 75, expenditure: 4500 },
      { month: "Jul 24", planned: 87, actual: 79, expenditure: 4800 },
      { month: "Oct 24", planned: 93, actual: 83, expenditure: 5100 }
    ]
  },
  {
    project_id: "IN-TR-1009",
    project_name: "Chennai-Bengaluru Industrial Corridor Expressway (NE-7)",
    ministry: "Ministry of Road Transport and Highways",
    sector: "Transport & Logistics",
    state: "Tamil Nadu",
    district: "Kanchipuram",
    city: "Sriperumbudur",
    site_address: "NE-7 Expressway Construction Camp & Toll Plaza Zone, Sriperumbudur, Kanchipuram, Tamil Nadu 602105",
    location_accuracy: "DISTRICT",
    location_source: "NHAI National Expressway 7 Package Engineering Survey",
    implementing_agency: "National Highways Authority of India (NHAI)",
    approved_cost: 17930,
    revised_cost: 19800,
    expenditure: 15400,
    planned_start: "2020-01-15",
    planned_completion: "2024-03-31",
    expected_completion: "2024-12-31",
    physical_progress: 89.0,
    financial_progress: 77.8,
    total_milestones: 22,
    completed_milestones: 18,
    delayed_milestones: 2,
    cost_variance: 1870,
    time_variance: 9,
    risk_score: 35,
    cost_overrun_probability: 30,
    delay_probability: 42,
    implementation_risk: 32,
    risk_factors: [
      "Sriperumbudur industrial belt RoW structures demolition",
      "Monsoon drainage culverts reinforcement in Palmaner section"
    ],
    alerts: [
      "Notice: 195km of total 260km expressway opened for trial vehicular traffic"
    ],
    recommendations: [
      "Complete automated toll plaza smart FASTag gantry installations",
      "Finalize wayside amenity concession agreements"
    ],
    coordinates: { lat: 12.9733, lng: 79.9458 },
    progress_history: [
      { month: "Jan 24", planned: 82, actual: 78, expenditure: 13200 },
      { month: "Apr 24", planned: 88, actual: 82, expenditure: 14000 },
      { month: "Jul 24", planned: 94, actual: 86, expenditure: 14700 },
      { month: "Oct 24", planned: 100, actual: 89, expenditure: 15400 }
    ]
  },
  {
    project_id: "IN-EN-2005",
    project_name: "Singrauli Super Thermal Power Station Stage-III (2 x 660 MW Supercritical)",
    ministry: "Ministry of Power",
    sector: "Energy",
    state: "Uttar Pradesh",
    district: "Sonbhadra",
    city: "Shaktinagar",
    site_address: "NTPC Singrauli Thermal Power Plant, Shaktinagar, Sonbhadra District, Uttar Pradesh 231222",
    location_accuracy: "EXACT_SITE",
    location_source: "Central Electricity Authority (CEA) Power Station Database & NTPC Singrauli Coordinates",
    implementing_agency: "NTPC Limited",
    approved_cost: 17100,
    revised_cost: 18900,
    expenditure: 8200,
    planned_start: "2022-03-01",
    planned_completion: "2027-06-30",
    expected_completion: "2027-12-31",
    physical_progress: 47.0,
    financial_progress: 43.4,
    total_milestones: 24,
    completed_milestones: 12,
    delayed_milestones: 2,
    cost_variance: 1800,
    time_variance: 6,
    risk_score: 31,
    cost_overrun_probability: 28,
    delay_probability: 35,
    implementation_risk: 30,
    risk_factors: [
      "Boiler drum lifting structural crane availability",
      "Ash dyke environmental clearance boundary dispute"
    ],
    alerts: [
      "Notice: Chimney shell slip-form concrete casting reached 220m height"
    ],
    recommendations: [
      "Ensure flue gas desulphurization (FGD) equipment vendor follows timeline",
      "Coordinate dedicated coal merry-go-round (MGR) railway track spur"
    ],
    coordinates: { lat: 24.1025, lng: 82.6842 },
    progress_history: [
      { month: "Jan 24", planned: 32, actual: 30, expenditure: 5200 },
      { month: "Apr 24", planned: 39, actual: 36, expenditure: 6200 },
      { month: "Jul 24", planned: 46, actual: 42, expenditure: 7200 },
      { month: "Oct 24", planned: 53, actual: 47, expenditure: 8200 }
    ]
  },
  {
    project_id: "IN-MN-8002",
    project_name: "Hindustan Copper Malanjkhand Underground Mine Expansion",
    ministry: "Ministry of Mines",
    sector: "Mining",
    state: "Madhya Pradesh",
    district: "Balaghat",
    city: "Malanjkhand",
    site_address: "Malanjkhand Copper Project (MCP) Shaft Complex, Birsa Tehsil, Balaghat District, MP 481116",
    location_accuracy: "EXACT_SITE",
    location_source: "Indian Bureau of Mines (IBM) Approved Mining Plan & HCL Technical Division",
    implementing_agency: "Hindustan Copper Limited (HCL)",
    approved_cost: 2900,
    revised_cost: 3850,
    expenditure: 2750,
    planned_start: "2018-06-01",
    planned_completion: "2022-12-31",
    expected_completion: "2025-06-30",
    physical_progress: 76.0,
    financial_progress: 71.4,
    total_milestones: 18,
    completed_milestones: 12,
    delayed_milestones: 4,
    cost_variance: 950,
    time_variance: 30,
    risk_score: 66,
    cost_overrun_probability: 74,
    delay_probability: 78,
    implementation_risk: 65,
    risk_factors: [
      "Shaft sinking through heavily fractured water-bearing granite zone",
      "Underground mine ventilation fan vendor insolvency"
    ],
    alerts: [
      "Warning: North decline development running 4 months behind schedule"
    ],
    recommendations: [
      "Apply high-pressure chemical grouting to seal underground aquifer leaks",
      "Re-tender remaining ventilation and hoisting package on urgent basis"
    ],
    coordinates: { lat: 22.0289, lng: 80.7167 },
    progress_history: [
      { month: "Jan 24", planned: 78, actual: 66, expenditure: 2300 },
      { month: "Apr 24", planned: 84, actual: 70, expenditure: 2450 },
      { month: "Jul 24", planned: 90, actual: 73, expenditure: 2600 },
      { month: "Oct 24", planned: 96, actual: 76, expenditure: 2750 }
    ]
  },
  {
    project_id: "IN-SO-9003",
    project_name: "Varanasi Multi-Modal Logistics Freight Village & Inland Water Terminal",
    ministry: "Ministry of Ports, Shipping and Waterways",
    sector: "Social Infrastructure",
    state: "Uttar Pradesh",
    district: "Varanasi",
    city: "Ramnagar",
    site_address: "NW-1 Multimodal Terminal, Ramnagar Ganga Riverfront, Varanasi, Uttar Pradesh 221008",
    location_accuracy: "EXACT_SITE",
    location_source: "Inland Waterways Authority of India (IWAI) NW-1 Project Dossier & Jal Marg Vikas GIS",
    implementing_agency: "Inland Waterways Authority of India (IWAI)",
    approved_cost: 1850,
    revised_cost: 2100,
    expenditure: 1680,
    planned_start: "2020-11-01",
    planned_completion: "2024-03-31",
    expected_completion: "2024-11-30",
    physical_progress: 93.0,
    financial_progress: 80.0,
    total_milestones: 14,
    completed_milestones: 12,
    delayed_milestones: 1,
    cost_variance: 250,
    time_variance: 8,
    risk_score: 25,
    cost_overrun_probability: 20,
    delay_probability: 28,
    implementation_risk: 22,
    risk_factors: [
      "Ganga river low draft during dry winter months dredging schedule"
    ],
    alerts: [
      "Notice: Ro-Ro vessel berthing pontoon trial completed"
    ],
    recommendations: [
      "Maintain continuous acoustic doppler bathymetric survey in navigation channel",
      "Finalize warehouse cold chain leasing contracts"
    ],
    coordinates: { lat: 25.2635, lng: 83.0298 },
    progress_history: [
      { month: "Jan 24", planned: 85, actual: 83, expenditure: 1400 },
      { month: "Apr 24", planned: 90, actual: 87, expenditure: 1500 },
      { month: "Jul 24", planned: 95, actual: 90, expenditure: 1600 },
      { month: "Oct 24", planned: 100, actual: 93, expenditure: 1680 }
    ]
  },
  {
    project_id: "IN-EN-2006",
    project_name: "PowerGrid Inter-Regional Green Energy Corridor Phase-II",
    ministry: "Ministry of Power",
    sector: "Energy",
    state: "Rajasthan",
    district: "Jaisalmer",
    city: "Fatehgarh",
    site_address: "765/400 kV Fatehgarh-II Substation, Renewable Energy Pooling Station, Jaisalmer District, Rajasthan 345027",
    location_accuracy: "EXACT_SITE",
    location_source: "POWERGRID Western/Northern Region Pooling Station Geographic Registry",
    implementing_agency: "Power Grid Corporation of India Limited (POWERGRID)",
    approved_cost: 12000,
    revised_cost: 12900,
    expenditure: 9800,
    planned_start: "2021-05-01",
    planned_completion: "2025-03-31",
    expected_completion: "2025-06-30",
    physical_progress: 84.0,
    financial_progress: 76.0,
    total_milestones: 20,
    completed_milestones: 16,
    delayed_milestones: 2,
    cost_variance: 900,
    time_variance: 3,
    risk_score: 29,
    cost_overrun_probability: 24,
    delay_probability: 32,
    implementation_risk: 27,
    risk_factors: [
      "Great Indian Bustard (GIB) priority area underground cable bird-diverter installation"
    ],
    alerts: [
      "Notice: 765kV double-circuit Fatehgarh-Bhadla line charged"
    ],
    recommendations: [
      "Complete installation of supreme-court mandated luminous bird diverters",
      "Commission STATCOM dynamic reactive power compensation units"
    ],
    coordinates: { lat: 26.5417, lng: 71.2158 },
    progress_history: [
      { month: "Jan 24", planned: 72, actual: 70, expenditure: 7800 },
      { month: "Apr 24", planned: 80, actual: 76, expenditure: 8500 },
      { month: "Jul 24", planned: 87, actual: 80, expenditure: 9100 },
      { month: "Oct 24", planned: 94, actual: 84, expenditure: 9800 }
    ]
  },
  {
    project_id: "IN-WT-4004",
    project_name: "Namami Gange STPs & Sewerage Network Infrastructure Phase II",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    state: "West Bengal",
    district: "Howrah",
    city: "Howrah / Bally",
    site_address: "Bally Sewage Treatment Plant & Pumping Complex, Grand Trunk Road, Howrah District, West Bengal 711205",
    location_accuracy: "EXACT_SITE",
    location_source: "NMCG West Bengal River Basin Water Treatment Project Register",
    implementing_agency: "National Mission for Clean Ganga (NMCG) / WBPHE",
    approved_cost: 8900,
    revised_cost: 10400,
    expenditure: 6700,
    planned_start: "2019-12-01",
    planned_completion: "2023-12-31",
    expected_completion: "2025-03-31",
    physical_progress: 71.0,
    financial_progress: 64.4,
    total_milestones: 22,
    completed_milestones: 14,
    delayed_milestones: 5,
    cost_variance: 1500,
    time_variance: 15,
    risk_score: 61,
    cost_overrun_probability: 68,
    delay_probability: 72,
    implementation_risk: 58,
    risk_factors: [
      "High groundwater table and densely populated urban slum sewer trenching in Howrah",
      "Power tariff subsidy dispute for operating STPs"
    ],
    alerts: [
      "Warning: Howrah 180 MLD sewage treatment plant commissioning delayed by 5 months"
    ],
    recommendations: [
      "Deploy trenchless micro-tunneling technology in congested Kolkata municipal corridors",
      "Adopt Hybrid Annuity Model (HAM) performance-linked operational disbursements"
    ],
    coordinates: { lat: 22.6515, lng: 88.3412 },
    progress_history: [
      { month: "Jan 24", planned: 74, actual: 60, expenditure: 5200 },
      { month: "Apr 24", planned: 81, actual: 64, expenditure: 5700 },
      { month: "Jul 24", planned: 88, actual: 68, expenditure: 6200 },
      { month: "Oct 24", planned: 95, actual: 71, expenditure: 6700 }
    ]
  },
  {
    project_id: "IN-TR-1010",
    project_name: "Delhi-Meerut Regional Rapid Transit System (RRTS Corridor)",
    ministry: "Ministry of Housing and Urban Affairs",
    sector: "Transport & Logistics",
    state: "Delhi",
    district: "East Delhi",
    city: "New Delhi / Anand Vihar",
    site_address: "NCRTC Multi-Modal RRTS Hub, Anand Vihar Transit Center, Delhi 110092",
    location_accuracy: "EXACT_SITE",
    location_source: "NCRTC Alignment Masterplan & Anand Vihar Multi-Modal Transport Hub Coordinates",
    implementing_agency: "National Capital Region Transport Corporation (NCRTC)",
    approved_cost: 30274,
    revised_cost: 31800,
    expenditure: 24500,
    planned_start: "2019-03-08",
    planned_completion: "2025-06-30",
    expected_completion: "2025-08-31",
    physical_progress: 89.0,
    financial_progress: 77.0,
    total_milestones: 24,
    completed_milestones: 20,
    delayed_milestones: 1,
    cost_variance: 1526,
    time_variance: 2,
    risk_score: 23,
    cost_overrun_probability: 19,
    delay_probability: 22,
    implementation_risk: 24,
    risk_factors: [
      "Sarai Kale Khan multi-modal transit hub pedestrian connection integration"
    ],
    alerts: [
      "Notice: 42km Namo Bharat priority and secondary section operational"
    ],
    recommendations: [
      "Complete final testing of European Train Control System (ETCS Level 2) signalling in Meerut South",
      "Integrate unified QR ticketing with Delhi Metro and UP State Roadways"
    ],
    coordinates: { lat: 28.6475, lng: 77.315 },
    progress_history: [
      { month: "Jan 24", planned: 78, actual: 76, expenditure: 19800 },
      { month: "Apr 24", planned: 84, actual: 81, expenditure: 21400 },
      { month: "Jul 24", planned: 90, actual: 85, expenditure: 23000 },
      { month: "Oct 24", planned: 95, actual: 89, expenditure: 24500 }
    ]
  }
];

export const REFERENCE_STATS = {
  totalOngoingProjects: 1981,
  ministriesCount: 17,
  sectorsCount: 22,
  originalCostLakhCr: 37.13,
  revisedCostLakhCr: 42.78,
  expenditureLakhCr: 20.36,
  costOverrunLakhCr: 5.65,
  averageDelayMonths: 18.4,
  criticalProjectsCount: 428,
  disclaimer: "Reference figures based on the national infrastructure problem statement; dashboard analytics dynamically calculate from the simulated project dataset."
};
