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
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />

    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    <Route path="/about" element={<ProtectedRoute element={<About />} />} />
  </Routes>
);
