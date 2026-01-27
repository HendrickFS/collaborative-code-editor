import React, { useEffect, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

type Props = {
    content?: string;
    language?: string;
    onContentChange?: (content: string) => void;
    roomName?: string;
};

export const CodeEditor: React.FC<Props> = ({ content, language, onContentChange, roomName = 'code-editor-room' }) => {
    const [editor, setEditor] = useState<any>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const bindingRef = useRef<MonacoBinding | null>(null);
    const docRef = useRef<Y.Doc | null>(null);
    const contentRef = useRef(content);

    // Keep content ref updated
    useEffect(() => {
        contentRef.current = content;
    }, [content]);

    useEffect(() => {
        if (!editor) return;
        
        bindingRef.current?.destroy();
        providerRef.current?.destroy();
        docRef.current?.destroy();

        const doc = new Y.Doc();
        const provider = new WebsocketProvider('ws://localhost:1234', roomName, doc);
        const type = doc.getText('monaco');
        const binding = new MonacoBinding(type, editor.getModel()!, new Set([editor]), provider.awareness);

        // Wait for sync before seeding
        provider.once('sync', (isSynced: boolean) => {
            if (isSynced && type.length === 0 && contentRef.current) {
                type.insert(0, contentRef.current);
            }
        });

        providerRef.current = provider;
        bindingRef.current = binding;
        docRef.current = doc;

        return () => {
            bindingRef.current?.destroy();
            providerRef.current?.destroy();
            docRef.current?.destroy();
            bindingRef.current = null;
            providerRef.current = null;
            docRef.current = null;
        };
    }, [editor, roomName]);

    // Remove the second useEffect that was causing duplicate seeding

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        setEditor(editor);
        
        // Track content changes
        editor.onDidChangeModelContent(() => {
            const currentContent = editor.getValue();
            onContentChange?.(currentContent);
        });
    };

    return (
        <Editor
            theme="vs-dark"
            width="100%"
            height="100%"
            language={language || "plaintext"}
            defaultLanguage="plaintext"
            defaultValue="// Start collaborating..."
            onMount={handleEditorDidMount}
        />
    );
};
