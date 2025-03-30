import { useAppDispatch } from '../hooks/redux';
import {
  setUserInfoName,
  setUserInfoEmail,
} from '../store/slices/userInfoSlice';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetUserInfo } from '../store/slices/userInfoSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    dispatch(setUserInfoName(name));
    dispatch(setUserInfoEmail(email));
    navigate('/home');
  };

  useEffect(() => {
    dispatch(resetUserInfo());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          登入
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              帳號
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              電子郵件
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            <button
              onClick={handleLogin}
              className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              登入
            </button>
            <Link
              to="/register"
              className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              註冊
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
