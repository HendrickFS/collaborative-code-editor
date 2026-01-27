export type FileLanguage = 
    | "plaintext" 
    | "typescript" 
    | "python" 
    | "javascript" 
    | "java" 
    | "csharp" 
    | "cpp" 
    | "ruby" 
    | "go" 
    | "php"
    | "html"
    | "css"
    | "json"
    | "markdown"
    | "xml"
    | "sql";

export interface FileData {
    filename: string;
    content: string;
    path: string;
    fileLanguage?: FileLanguage;
    size?: number;
    lastModified?: Date;
}

/**
 * Get the Monaco editor language from a filename
 */
export function getFileLanguage(filename: string): FileLanguage {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts': return 'typescript';
        case 'tsx': return 'typescript';
        case 'js': return 'javascript';
        case 'jsx': return 'javascript';
        case 'py': return 'python';
        case 'java': return 'java';
        case 'cs': return 'csharp';
        case 'cpp': case 'c': case 'h': return 'cpp';
        case 'rb': return 'ruby';
        case 'go': return 'go';
        case 'php': return 'php';
        case 'html': case 'htm': return 'html';
        case 'css': case 'scss': case 'sass': return 'css';
        case 'json': return 'json';
        case 'md': return 'markdown';
        case 'xml': return 'xml';
        case 'sql': return 'sql';
        default: return 'plaintext';
    }   
}

/**
 * Read a file from user upload
 */
export function readFileFromUpload(file: File): Promise<FileData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const fileData: FileData = {
                filename: file.name,
                content: content || '',
                path: file.name,
                fileLanguage: getFileLanguage(file.name),
                size: file.size,
                lastModified: new Date(file.lastModified),
            };
            resolve(fileData);
        };
        
        reader.onerror = () => {
            reject(new Error(`Failed to read file: ${file.name}`));
        };
        
        reader.readAsText(file);
    });
}

/**
 * Download content as a file
 */
export function downloadFile(filename: string, content: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
}

/**
 * Create a new blank file
 */
export function createNewFile(filename?: string, language?: FileLanguage): FileData {
    const defaultName = filename || `untitled.${getDefaultExtension(language || 'plaintext')}`;
    
    return {
        filename: defaultName,
        content: getFileTemplate(language || getFileLanguage(defaultName)),
        path: defaultName,
        fileLanguage: language || getFileLanguage(defaultName),
        size: 0,
        lastModified: new Date(),
    };
}

/**
 * Get default file extension for a language
 */
function getDefaultExtension(language: FileLanguage): string {
    const extensionMap: Record<FileLanguage, string> = {
        typescript: 'ts',
        javascript: 'js',
        python: 'py',
        java: 'java',
        csharp: 'cs',
        cpp: 'cpp',
        ruby: 'rb',
        go: 'go',
        php: 'php',
        html: 'html',
        css: 'css',
        json: 'json',
        markdown: 'md',
        xml: 'xml',
        sql: 'sql',
        plaintext: 'txt',
    };
    
    return extensionMap[language] || 'txt';
}

/**
 * Get a basic template for new files
 */
function getFileTemplate(language: FileLanguage): string {
    const templates: Partial<Record<FileLanguage, string>> = {
        typescript: '// TypeScript file\n',
        javascript: '// JavaScript file\n',
        python: '# Python file\n',
        java: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>',
        css: '/* Stylesheet */\n',
        json: '{\n    \n}',
        markdown: '# Document\n\n',
    };
    
    return templates[language] || '';
}

/**
 * Validate file size (return true if valid)
 */
export function validateFileSize(sizeInBytes: number, maxSizeMB: number = 10): boolean {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return sizeInBytes <= maxBytes;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Save file to localStorage for recent files
 */
export function saveToRecentFiles(fileData: FileData): void {
    const recentFiles = getRecentFiles();
    
    // Remove if already exists
    const filtered = recentFiles.filter(f => f.filename !== fileData.filename);
    
    // Add to front
    filtered.unshift({
        ...fileData,
        // Don't store content in recent files, just metadata
        content: '',
    });
    
    // Keep only last 10
    const updated = filtered.slice(0, 10);
    
    localStorage.setItem('recentFiles', JSON.stringify(updated));
}

/**
 * Get recent files from localStorage
 */
export function getRecentFiles(): FileData[] {
    const data = localStorage.getItem('recentFiles');
    if (!data) return [];
    
    try {
        const files = JSON.parse(data);
        return files.map((f: any) => ({
            ...f,
            lastModified: f.lastModified ? new Date(f.lastModified) : new Date(),
        }));
    } catch {
        return [];
    }
}

/**
 * Clear recent files
 */
export function clearRecentFiles(): void {
    localStorage.removeItem('recentFiles');
}