// Layout that will do the outlet
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import backendInstance from '../axiosInstances/backendInstance';
import { useDispatch, useSelector } from 'react-redux';

const healthCheck = async () => {
  const response = await backendInstance.get('/auth/health');
  console.log(response);
}

const Layout = () => {

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.profileReducer);

  const { items = [], totalAmount } = useSelector(state => state.cartReducer);


  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  }

  // Mounting
  useEffect(() => {
    healthCheck();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    // Header
    <div style={{
      padding: '32px'
    }} >
      <Outlet />
      <button style={{
        position: 'absolute',
        top: '10px',
        right: '100px'
      }}>
        Cart ( {items.length} ) ${totalAmount}
      </button>
      <button style={{
        position: 'absolute',
        top: '10px',
        right: '10px'
      }} onClick={handleLogout} >Logout</button>
    </div>
    // Footer
  )
}

export default Layout;