// Layout that will do the outlet
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import backendInstance from '../axiosInstances/backendInstance';

const healthCheck = async () => {
  const response = await backendInstance.get('/auth/health');
  console.log(response);
}

const Layout = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Mounting
  useEffect(() => {
    healthCheck();
  }, []);

  if (user.accessToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return (
    // Header
    <div style={{
      border: "2px solid yellow"
    }} >
      <Outlet />
    </div>
    // Footer
  )
}

export default Layout;