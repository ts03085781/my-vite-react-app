// ProtectedRoute.tsx
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const userName = useAppSelector((state) => state.userInfo.name);
  const userEmail = useAppSelector((state) => state.userInfo.email);
  const isAuthenticated = userName && userEmail;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
