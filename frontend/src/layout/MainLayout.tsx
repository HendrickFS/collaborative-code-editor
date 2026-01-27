import React from 'react';
import { Layout } from 'antd';
import { CodeEditor } from '../features/editor/components/CodeEditor';
import { FileTree } from '../features/file-tree/FileTree';
import { FileData } from '../services/fileSystem.service';
import { useSharedFileList } from '../hooks/useSharedFileList';

const { Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    const [activeFile, setActiveFile] = React.useState<FileData | null>(null);
    const [currentContent, setCurrentContent] = React.useState<string>('');
    const { files, addFile, updateFile } = useSharedFileList();
    const [fileContents, setFileContents] = React.useState<Map<string, string>>(new Map());

    const handleFileLoad = (file: FileData) => {
        // Add to shared file list (synced across users)
        addFile(file);
        
        // Store content locally (not synced in file list)
        setFileContents((prev) => {
            const updated = new Map(prev);
            updated.set(file.path, file.content);
            return updated;
        });

        setActiveFile(file);
        setCurrentContent(file.content);
    };

    const handleSelectFile = (file: FileData) => {
        // Load content from local storage if available
        const storedContent = fileContents.get(file.path) || file.content || '';
        
        setActiveFile({ ...file, content: storedContent });
        setCurrentContent(storedContent);
    };

    const handleContentChange = (content: string) => {
        setCurrentContent(content);

        if (!activeFile) return;

        // Update local content storage
        setFileContents((prev) => {
            const updated = new Map(prev);
            updated.set(activeFile.path, content);
            return updated;
        });

        setActiveFile((prev) => (prev ? { ...prev, content } : prev));
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={250} theme="dark" style={{ borderRight: '1px solid #333', backgroundColor: '#1e1e1e' }}>
                <FileTree 
                    onFileLoad={handleFileLoad} 
                    activeFile={activeFile}
                    currentContent={currentContent}
                    files={files}
                    onSelectFile={handleSelectFile}
                />
            </Sider>
            <Content style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <CodeEditor 
                    content={activeFile?.content} 
                    language={activeFile?.fileLanguage}
                    onContentChange={handleContentChange}
                    roomName={activeFile?.path || 'code-editor-room'}
                />
            </Content>
        </Layout>
    );
};