import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardPage from '../pages/DashboardPage';
import AddLabourPage from '../pages/AddLabourPage';
import AttendancePage from '../pages/AttendancePage';
import ShowLabourPage from '../pages/ShowLabourPage';
import ViewAttendancePage from '../pages/ViewAttendancePage';

function AppRoutes({ selectedSite, setSelectedSite }) {
  const ProtectedRoute = ({ element, ...props }) => {
    if (!selectedSite || !selectedSite._id) {
      toast.error('Please select a site first');
      return <Navigate to="/" />;
    }
    return React.cloneElement(element, {
      ...props,
      siteId: selectedSite._id,
      siteName: selectedSite.name,
    });
  };

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
          />
        }
      />
      <Route
        path="/add-labour"
        element={<ProtectedRoute element={<AddLabourPage />} />}
      />
      <Route
        path="/mark-attendance"
        element={<ProtectedRoute element={<AttendancePage />} />}
      />
      <Route
        path="/show-labour"
        element={<ProtectedRoute element={<ShowLabourPage />} />}
      />
      <Route
        path="/view-attendance"
        element={<ProtectedRoute element={<ViewAttendancePage />} />}
      />
    </Routes>
  );
}

export default AppRoutes;
