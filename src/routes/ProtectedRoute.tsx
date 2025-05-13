// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const ProtectedRoute = () => {
  const userName = useAppSelector((state) => state.userInfo.name);
  const userEmail = useAppSelector((state) => state.userInfo.email);
  const isAuthenticated = userName && userEmail;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
