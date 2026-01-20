import React from 'react';
import { Layout } from 'antd';
import { CodeEditor } from '../features/editor/components/CodeEditor';
import { FileTree } from '../features/file-tree/FileTree';

const { Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={250} theme="dark" style={{ borderRight: '1px solid #333' }}>
                <FileTree />
            </Sider>
            <Content style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <CodeEditor />
            </Content>
        </Layout>
    );
};