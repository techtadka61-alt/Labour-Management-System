import React from 'react';
import Dashboard from '../components/Dashboard';

function DashboardPage({ selectedSite, setSelectedSite }) {
  return (
    <Dashboard selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
  );
}

export default DashboardPage;
