# PAIMANA AI — Infrastructure Project Monitoring & Risk Intelligence Platform

PAIMANA AI is a full-stack, enterprise-grade infrastructure monitoring and predictive risk intelligence platform designed to track, benchmark, and surveillance national capital infrastructure megaprojects across India.

![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38b2ac?logo=tailwind-css)
![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?logo=google-maps)

---

## 🌟 Key Capabilities

- **Interactive Geospatial Surveillance Map:** Genuine Google Maps JavaScript API integration via `@vis.gl/react-google-maps` with `@googlemaps/markerclusterer`, density radar clustering, accuracy badge indicators (`Verified Site`, `Corridor / District`, `City / Urban`, `Statewide`), and site address overlays.
- **Audited Project Dataset:** Tracks 33 verified major infrastructure assets across Indian ministries (MoRTH, Railways, Civil Aviation, MoHFW, Power, DAE, MoPNG, MoE) with authentic project coordinates, cost estimates, and completion milestones.
- **Predictive Risk Analytics:** Multi-factor quantitative risk scoring engine evaluating schedule slippage, cost escalation variance, physical milestone progress, and financial disbursement burn rates.
- **Interactive Simulation Sandbox:** Real-time 5-factor weighting sandbox allowing analysts to adjust priority parameters dynamically.
- **AI-Powered Mitigation Assistant:** Rule-engine and LLM-ready advisory console providing automated root-cause diagnosis and actionable mitigation playbooks.
- **Executive Reporting & Export:** Instant synthesis of executive summary reports with live PDF generation and enriched CSV export.
- **Theme-Adaptive High Contrast UI:** Fully responsive design supporting Dark and Light modes with WCAG-compliant color contrast.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS, Lucide React icons
- **Data Visualization:** Recharts, Custom SVG Gauges
- **Mapping:** `@vis.gl/react-google-maps`, `@googlemaps/markerclusterer`
- **Document Generation:** jsPDF, jspdf-autotable, CSV exporter

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- npm or pnpm

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/mayurchoudhary08-cloud/paimana-ai-.git
cd paimana-ai-
```

Install dependencies:
```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```
> **Note:** Ensure your Google Maps API key has the **Maps JavaScript API** enabled in Google Cloud Console.

### 4. Running the Development Server

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Building for Production

```bash
npm run build
```
Build output will be generated in the `dist/` directory.

---

## 📁 Project Architecture

```
paimana-ai/
├── src/
│   ├── components/         # Modular UI components
│   │   ├── charts/         # Recharts visualizers (Cost, Progress, Risk, Sector)
│   │   ├── common/         # Risk gauges, KPI cards, Filter bar, Search modal
│   │   ├── layout/         # Navbar, Sidebar, Footer, Layout wrapper
│   │   ├── map/            # IndiaMap, PaimanaClusterRenderer, custom styles
│   │   └── timeline/       # Milestone and delay trajectory visualizations
│   ├── context/            # FilterContext and ThemeContext state providers
│   ├── data/               # Audited dataset of 33 national infrastructure assets
│   ├── pages/              # Primary route pages (Dashboard, Analytics, Maps, AI)
│   ├── types/              # TypeScript schemas and data models
│   └── utils/              # Calculation engines, risk scoring, query engines, PDF/CSV
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules for node_modules, keys, and build files
├── index.html              # HTML entrypoint
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

This project is licensed under the MIT License.
