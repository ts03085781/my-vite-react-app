import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

export const AppRoutes = () => (
  <Routes>
    {/* 公開路由 */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* 受保護的路由 */}
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Route>

    {/* 404 頁面 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
