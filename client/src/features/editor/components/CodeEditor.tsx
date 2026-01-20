import React, { useEffect, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

export const CodeEditor: React.FC = () => {
    const [editor, setEditor] = useState<any>(null);

    useEffect(() => {
        if (!editor) return;
        // Initialize YJS document
        const doc = new Y.Doc();
        // Connect to the WebSocket server
        const provider = new WebsocketProvider('ws://localhost:1234', 'code-editor-room', doc);
        const type = doc.getText('monaco');

        // Bind YJS to Monaco Editor
        const binding = new MonacoBinding(type, editor.getModel()!, new Set([editor]), provider.awareness);

        return () => {
            provider.destroy();
            binding.destroy();
        };
    }, [editor]);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        setEditor(editor);
    };

    return (
        <Editor
            theme="vs-dark"
            width="100%"
            height="100%"
            defaultLanguage="typescript"
            defaultValue="// Start collaborating..."
            onMount={handleEditorDidMount}
        />
    );
};
