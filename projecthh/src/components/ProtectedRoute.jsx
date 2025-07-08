
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo && userInfo.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
