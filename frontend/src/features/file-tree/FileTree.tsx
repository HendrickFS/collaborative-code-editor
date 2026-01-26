import { Upload, Button } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import React from 'react';
import { FileData, getFileLanguage } from '../../services/fileSystem.service';

type Props = {
    onFileLoad: (file: FileData) => void;
};

export const FileTree: React.FC<Props> = ({ onFileLoad }) => {
    return (
        <div style={{ padding: '10px' }}>
            <Upload
                accept=".ts,.js,.py,.tsx,.java,.cs,.cpp,.rb,.go,.php,.txt"
                maxCount={1}
                style={{ width: '100%' }}
                beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const content = (event.target?.result as string) || '';
                        const fileData: FileData = {
                            filename: file.name,
                            content,
                            path: file.name,
                            fileLanguage: getFileLanguage(file.name),
                        };
                        onFileLoad(fileData);
                    };
                    reader.readAsText(file);
                    return false; // Prevent upload
                }}
            >
                <Button icon={<UploadOutlined />} style={{ marginBottom: 16, width: '100%' }}>
                    Load File
                </Button>
            </Upload>
            <Button icon={<SaveOutlined />} style={{ width: '100%', marginTop: 16 }}>Save File</Button>
        </div>
    );
};