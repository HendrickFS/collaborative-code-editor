import { useEffect, useState, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { FileData } from '../services/fileSystem.service';

/**
 * Hook to manage a shared file list across all connected users
 */
export const useSharedFileList = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const docRef = useRef<Y.Doc | null>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const filesMapRef = useRef<Y.Map<any> | null>(null);

    useEffect(() => {
        // Create shared document for file list
        const doc = new Y.Doc();
        const provider = new WebsocketProvider('ws://localhost:1234', 'shared-file-list', doc);
        const filesMap = doc.getMap('files');

        docRef.current = doc;
        providerRef.current = provider;
        filesMapRef.current = filesMap;

        // Listen for changes to the shared file list
        const updateFiles = () => {
            const fileArray: FileData[] = [];
            filesMap.forEach((fileData: any) => {
                fileArray.push(fileData);
            });
            setFiles(fileArray);
        };

        // Initial load
        provider.on('sync', () => {
            updateFiles();
        });

        // Listen for updates
        filesMap.observe(updateFiles);

        return () => {
            filesMap.unobserve(updateFiles);
            provider.destroy();
            doc.destroy();
        };
    }, []);

    const addFile = (file: FileData) => {
        if (!filesMapRef.current) return;
        
        // Use file path as key to avoid duplicates
        filesMapRef.current.set(file.path, {
            filename: file.filename,
            path: file.path,
            fileLanguage: file.fileLanguage,
            size: file.size,
            lastModified: file.lastModified?.toISOString() || new Date().toISOString(),
            content: '', // Don't store content in shared list, only metadata
        });
    };

    const updateFile = (file: FileData) => {
        if (!filesMapRef.current) return;
        
        filesMapRef.current.set(file.path, {
            filename: file.filename,
            path: file.path,
            fileLanguage: file.fileLanguage,
            size: file.size,
            lastModified: new Date().toISOString(),
            content: '', // Don't store content in shared list
        });
    };

    const removeFile = (path: string) => {
        if (!filesMapRef.current) return;
        filesMapRef.current.delete(path);
    };

    return {
        files,
        addFile,
        updateFile,
        removeFile,
    };
};
