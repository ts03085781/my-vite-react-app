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
    <div>
      <h1 className="text-6xl font-bold">login page</h1>
      <br />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>登入</button>
      <br />
      <Link to="/register">註冊</Link>
    </div>
  );
};
export default Login;
