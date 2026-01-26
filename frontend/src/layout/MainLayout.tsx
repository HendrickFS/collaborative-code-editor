import React from 'react';
import { Layout } from 'antd';
import { CodeEditor } from '../features/editor/components/CodeEditor';
import { FileTree } from '../features/file-tree/FileTree';
import { FileData } from '../services/fileSystem.service';

const { Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    const [activeFile, setActiveFile] = React.useState<FileData | null>(null);

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={250} theme="dark" style={{ borderRight: '1px solid #333', backgroundColor: '#1e1e1e' }}>
                <FileTree onFileLoad={setActiveFile} />
            </Sider>
            <Content style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <CodeEditor content={activeFile?.content} language={activeFile?.fileLanguage} />
            </Content>
        </Layout>
    );
};