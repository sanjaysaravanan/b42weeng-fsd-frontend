// Layout that will do the outlet
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import backendInstance from '../axiosInstances/backendInstance';

const healthCheck = async () => {
  const response = await backendInstance.get('/auth/health');
  console.log(response);
}

const Layout = () => {

  // Mounting
  useEffect(() => {
    healthCheck();
  }, []);

  return (
    // Header
    <div style={{
      border: "2px solid"
    }} >
      <Outlet />
    </div>
    // Footer
  )
}

export default Layout;