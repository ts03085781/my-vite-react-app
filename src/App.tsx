import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { AppRoutes } from './routes/AppRoutes';
import { selectTheme } from './types';

function App() {
  const theme = useSelector(selectTheme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
