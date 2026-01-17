import React from 'react';
import { Editor } from '@monaco-editor/react';

export const CodeEditor: React.FC = () => {
    return (
        <Editor
            defaultLanguage="typescript"
            defaultValue="console.log('Hello World'); // Start typing"
        />
    );
};
