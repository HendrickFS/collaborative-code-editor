import { Upload, Button, message, List } from 'antd';
import { UploadOutlined, SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import React from 'react';
import { 
    FileData, 
    readFileFromUpload, 
    downloadFile,
    createNewFile,
    saveToRecentFiles 
} from '../../services/fileSystem.service';

type Props = {
    onFileLoad: (file: FileData) => void;
    activeFile: FileData | null;
    currentContent: string;
    files: FileData[];
    onSelectFile: (file: FileData) => void;
};

export const FileTree: React.FC<Props> = ({ onFileLoad, activeFile, currentContent, files, onSelectFile }) => {
    
    const handleUpload = async (file: File) => {
        try {
            const fileData = await readFileFromUpload(file);
            saveToRecentFiles(fileData);
            onFileLoad(fileData);
            message.success(`Loaded ${file.name}`);
        } catch (error) {
            message.error('Failed to load file');
            console.error(error);
        }
        return false; // Prevent upload
    };

    const handleSave = () => {
        if (!activeFile) {
            message.warning('No file to save');
            return;
        }
        
        try {
            downloadFile(activeFile.filename, currentContent);
            message.success(`Saved ${activeFile.filename}`);
        } catch (error) {
            message.error('Failed to save file');
            console.error(error);
        }
    };

    const handleNewFile = () => {
        const name = window.prompt('Enter file name (with extension)', 'untitled.ts')?.trim();

        if (!name) {
            message.info('File creation cancelled');
            return;
        }

        const newFile = createNewFile(name);
        onFileLoad(newFile);
        message.success(`Created ${newFile.filename}`);
    };

    return (
        <div style={{ padding: '10px' }}>
            <Button 
                icon={<FileAddOutlined />} 
                style={{ marginBottom: 8, width: '100%' }}
                onClick={handleNewFile}
                type="default"
            >
                New File
            </Button>
            
            <Upload
                accept=".ts,.js,.py,.tsx,.jsx,.java,.cs,.cpp,.c,.h,.rb,.go,.php,.html,.css,.json,.md,.xml,.sql,.txt"
                maxCount={1}
                showUploadList={false}
                beforeUpload={handleUpload}
                style={{ width: '100%' }}
            >
                <Button 
                    icon={<UploadOutlined />} 
                    style={{ marginBottom: 8, width: '100%' }}
                    type="default"
                >
                    Upload File
                </Button>
            </Upload>
            
            <Button 
                icon={<SaveOutlined />} 
                style={{ width: '100%' }}
                onClick={handleSave}
                disabled={!activeFile}
                type="primary"
            >
                Save File
            </Button>

            <List
                style={{ marginTop: 12, maxHeight: '50vh', overflowY: 'auto' }}
                bordered
                size="small"
                dataSource={files}
                locale={{ emptyText: 'No files yet' }}
                renderItem={(item) => {
                    const isActive = activeFile?.path === item.path;
                    return (
                        <List.Item
                            style={{
                                cursor: 'pointer',
                                background: isActive ? '#2d2d30' : 'transparent',
                                borderColor: isActive ? '#3a3d41' : undefined,
                            }}
                            onClick={() => onSelectFile(item)}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <span style={{ color: '#e0e0e0' }}>{item.filename}</span>
                                <span style={{ color: '#8c8c8c', fontSize: 11 }}>{item.fileLanguage}</span>
                            </div>
                        </List.Item>
                    );
                }}
            />
 
            {activeFile && (
                <div style={{ marginTop: 16, padding: 8, background: '#252526', borderRadius: 4 }}>
                    <div style={{ fontSize: 12, color: '#858585', marginBottom: 4 }}>Current File:</div>
                    <div style={{ fontSize: 13, color: '#cccccc', wordBreak: 'break-all' }}>
                        {activeFile.filename}
                    </div>
                    <div style={{ fontSize: 11, color: '#858585', marginTop: 4 }}>
                        {activeFile.fileLanguage}
                    </div>
                </div>
            )}
        </div>
    );
};