import React from 'react';
import { Layout } from 'antd';
import { CodeEditor } from '../features/editor/components/CodeEditor';

const { Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={250} theme="dark" style={{ borderRight: '1px solid #333' }}>

            </Sider>
            <Content>
                <CodeEditor />
            </Content>
        </Layout>
    );
};