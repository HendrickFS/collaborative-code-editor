import { ThemeConfig, theme } from 'antd';

export const appTheme: ThemeConfig = {
    algorithm: theme.darkAlgorithm, // Implementation of Dark Mode
    token: {
        colorPrimary: '#007ACC', // VS Code Blue-ish
        borderRadius: 4,
        colorBgContainer: '#1e1e1e', // Editor background match
    },
};