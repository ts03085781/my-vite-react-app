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
      <h1>login page</h1>
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
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
