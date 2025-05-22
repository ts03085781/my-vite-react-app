import { useAppDispatch } from '@/hooks/redux';
import {
  setUserInfoName,
  setUserInfoEmail,
} from '@/store/slices/userInfoSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetUserInfo } from '@/store/slices/userInfoSlice';
import { Button, Input, Form } from 'antd';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = (values: { name: string; email: string }) => {
    dispatch(setUserInfoName(values.name));
    dispatch(setUserInfoEmail(values.email));
    navigate('/home');
  };

  const handleGuestLogin = () => {
    dispatch(setUserInfoName('Guest'));
    dispatch(setUserInfoEmail('Guest'));
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

        <Form
          form={form}
          onFinish={handleLogin}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="帳號"
            rules={[
              { required: true, message: '請輸入帳號' },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: '帳號只能包含英文字母或數字',
              },
            ]}
          >
            <Input
              placeholder="請輸入帳號"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="電子郵件"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入正確格式的 Email！' },
            ]}
          >
            <Input
              type="email"
              placeholder="請輸入電子郵件"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Form.Item>

          <div className="flex justify-between space-x-4 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              登入
            </Button>
            <Link
              to="/register"
              className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              註冊
            </Link>
          </div>
          <div>
            <button
              onClick={handleGuestLogin}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              訪客登入
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
