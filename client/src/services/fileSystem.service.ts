export type FileLanguage = "plaintext" | "typescript" | "python" | "javascript" | "java" | "csharp" | "cpp" | "ruby" | "go" | "php";

export interface FileData {
    filename: string;
    content: string;
    path: string;
    fileLanguage?: FileLanguage;
}

export function getFileLanguage(filename: string): FileLanguage {
    const extension = filename.split('.').pop();
    switch (extension) {
        case 'ts': return 'typescript';
        case 'js': return 'javascript';
        case 'py': return 'python';
        case 'tsx': return 'typescript';
        case 'java': return 'java';
        case 'cs': return 'csharp';
        case 'cpp': return 'cpp';
        case 'rb': return 'ruby';
        case 'go': return 'go';
        case 'php': return 'php';
        default: return 'plaintext';
    }   
}

class FileSystemService {
  readFile(filePath: string): string {
    // Implementation to read a file from the file system
    return "File content";
    }
    writeFile(filePath: string, content: string): void {
    // Implementation to write a file to the file system
    console.log(`Writing to ${filePath}`);
    }
    deleteFile(filePath: string): void {
    // Implementation to delete a file from the file system
    console.log(`Deleting ${filePath}`);
    }  
}
export const fileSystemService = new FileSystemService();