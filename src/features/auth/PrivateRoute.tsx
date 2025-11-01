import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;
