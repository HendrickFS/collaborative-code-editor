import React, { useEffect, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

type Props = {
    content?: string;
    language?: string;
};

export const CodeEditor: React.FC<Props> = ({ content, language }) => {
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

        // Seed the editor with provided content (if any) once on mount
        if (content) {
            editor.getModel()?.setValue(content);
        }

        return () => {
            provider.destroy();
            binding.destroy();
        };
    }, [editor]);

    useEffect(() => {
        if (editor && content !== undefined) {
            editor.getModel()?.setValue(content);
        }
    }, [content, editor]);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        setEditor(editor);
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
