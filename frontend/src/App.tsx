import React from 'react';
import { ConfigProvider } from 'antd';
import { appTheme } from './theme/themeConfig';
import { MainLayout } from './layout/MainLayout';

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
