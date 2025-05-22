import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Switch, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { toggleTheme } from '../store/slices/themeSlice';
import { changeLanguage } from '../store/slices/languageSlice';
import {
  LanguageMenuItems,
  SidebarMenuItems,
  selectLanguage,
  selectTheme,
} from '../types';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    // 當語言改變時更新i18n
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = ({ key }: { key: string }) => {
    dispatch(changeLanguage(key as 'en' | 'zh'));
  };

  const languageItems: LanguageMenuItems = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'zh',
      label: '繁體中文',
    },
  ];

  const sidebarItems: SidebarMenuItems = [
    {
      key: '/introduction',
      icon: <HomeOutlined />,
      label: <Link to="/introduction">{t('sidebar.introduction')}</Link>,
    },
    {
      key: '/portfolio1',
      icon: <AppstoreOutlined />,
      label: <Link to="/portfolio1">{t('sidebar.portfolio')}</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white"
      >
        <div className="p-4 text-center text-xl font-bold text-gray-800 dark:text-white">
          Portfolio
        </div>
        <Menu
          theme={theme === 'dark' ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[location.pathname]}
          className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white"
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header className="p-0 flex items-center justify-between bg-blue-500 dark:bg-gray-800">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-16 h-16 text-white"
          />
          <div className="flex items-center mr-6 space-x-4">
            <div className="flex items-center mr-2 text-white gap-2">
              {theme === 'dark' ? <MoonOutlined /> : <SunOutlined />}
              <Switch checked={theme === 'dark'} onChange={handleThemeChange} />
            </div>
            <Dropdown
              menu={{ items: languageItems, onClick: handleLanguageChange }}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<GlobalOutlined />}
                className="text-white"
              >
                {language === 'en' ? 'English' : '繁體中文'}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-5 p-6 rounded-lg min-h-[280px] bg-white dark:bg-gray-700">
          <Outlet />
        </Content>
        <Footer className="text-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-white">
          ©{new Date().getFullYear()} My Portfolio - Created with React & Ant
          Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
