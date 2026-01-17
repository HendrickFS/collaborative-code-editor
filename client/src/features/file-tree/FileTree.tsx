import { Tree } from 'antd';
import { FolderOpenOutlined, FileOutlined } from '@ant-design/icons';

export const FileTree = () => {
    return (
        <div style={{ padding: '10px' }}>
            <Tree
                defaultExpandAll
                showIcon
                treeData={[
                    {
                        title: 'src',
                        key: '0-0',
                        icon: <FolderOpenOutlined />,
                        children: [
                            { title: 'App.tsx', key: '0-0-1', icon: <FileOutlined /> },
                            { title: 'index.tsx', key: '0-0-2', icon: <FileOutlined /> },
                        ],
                    },
                ]}
            />
        </div>
    );
};