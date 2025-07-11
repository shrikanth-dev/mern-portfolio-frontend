import React from 'react';
import { Navigate } from 'react-router-dom';
import type { PrivateRouteProps } from '../../src/types/types'

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
