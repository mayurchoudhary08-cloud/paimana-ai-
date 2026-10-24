import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { RiskAnalytics } from './pages/RiskAnalytics';
import { CostAnalytics } from './pages/CostAnalytics';
import { TimeAnalytics } from './pages/TimeAnalytics';
import { EarlyWarnings } from './pages/EarlyWarnings';
import { Benchmarking } from './pages/Benchmarking';
import { GeographicAnalytics } from './pages/GeographicAnalytics';
import { AIAssistant } from './pages/AIAssistant';
import { Reports } from './pages/Reports';
import { APIProvider } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex">
        {/* Responsive Collapsible Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/risk-analytics" element={<RiskAnalytics />} />
              <Route path="/cost-analytics" element={<CostAnalytics />} />
              <Route path="/time-analytics" element={<TimeAnalytics />} />
              <Route path="/early-warnings" element={<EarlyWarnings />} />
              <Route path="/benchmarking" element={<Benchmarking />} />
              <Route path="/geographic-analytics" element={<GeographicAnalytics />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Router>
            <AppContent />
          </Router>
        </APIProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
