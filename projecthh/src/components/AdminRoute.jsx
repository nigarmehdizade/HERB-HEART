// AdminRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const isAdmin = userInfo && userInfo.role === 'admin';
  return isAdmin ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;


