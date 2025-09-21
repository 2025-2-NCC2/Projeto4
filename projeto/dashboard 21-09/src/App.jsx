import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './Dashboard';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' ou 'dashboard'

  return (
    <>
      {view === 'landing' && <LandingPage onAccessDashboard={() => setView('dashboard')} />}
      {view === 'dashboard' && <Dashboard onNavigateHome={() => setView('landing')} />}
    </>
  );
}