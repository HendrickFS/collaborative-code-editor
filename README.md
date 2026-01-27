# Collaborative Code Editor

> A real-time collaborative code editor built with **React**, **TypeScript**, **Monaco Editor**, and **Yjs**.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco-0066B8?logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?logo=socketdotio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## Overview

A collaborative code editor that enables multiple users to edit code files simultaneously in real-time. Built as a portfolio project to showcase expertise in **real-time communication**, **state management**, **WebSocket architecture**, and **modern React patterns**.

### Key Highlights

- **Real-time Collaboration**: Powered by Yjs CRDT (Conflict-free Replicated Data Type) for seamless multi-user editing
- **Multi-file Management**: Support for creating, uploading, and switching between multiple files with isolated collaboration "rooms"
- **Production-grade Editor**: Monaco Editor with syntax highlighting for different languages
- **Shared File System**: Synchronized file list across all connected users using distributed state management
- **Clean Architecture**: Modular component structure with custom hooks and service layers

---

## Features

### Real-time Collaboration
- **Simultaneous Editing**: Multiple users can edit the same file in real-time with automatic conflict resolution
- **Per-file Rooms**: Each file operates in its own WebSocket room for isolated collaboration
- **Shared File List**: All users see the same file structure; creating a file makes it visible to everyone instantly
- **Awareness System**: Built-in user presence and cursor tracking via Yjs awareness

### File Management
- **Create Files**: Generate new files with customizable names and extensions
- **Upload Files**: Drag-and-drop or browse to upload existing code files
- **Download/Save**: Export edited files back to your local system
- **Multi-file Support**: Work with multiple files simultaneously
- **Recent Files**: Local storage tracking of recently accessed files

---

## Technical Architecture

### Frontend Stack
- **React** with TypeScript for type-safe component development
- **Monaco Editor** for VS Code-level editing experience
- **Yjs** for CRDT-based real-time synchronization
- **Ant Design** for polished UI components
- **Custom Hooks** for shared state management (`useSharedFileList`)

### Backend Stack
- **Express.js** for lightweight HTTP server
- **WebSocket (ws)** for real-time bidirectional communication
- **y-websocket** for Yjs synchronization protocol

### Architecture Patterns
- **Component-driven**: Modular, reusable React components
- **Service Layer**: Abstracted file system operations
- **State Management**: React hooks + Yjs for distributed state
- **Real-time Sync**: Two-tier synchronization (file list + file content)

---

## How It Works

### Real-time Synchronization

1. **File List Sync**
   - Uses a dedicated Yjs Map on the `'shared-file-list'` room
   - When any user creates/uploads a file, the metadata is added to the shared map
   - All connected clients observe changes and update their file lists automatically

2. **File Content Sync**
   - Each file operates in its own WebSocket room (keyed by *file path*)
   - Monaco Editor bindings automatically sync content via Yjs Text CRDT
   - Switching files disconnects from the old room and connects to the new one

3. **Conflict Resolution**
   - Yjs CRDT ensures eventual consistency without manual conflict resolution
   - All operations are commutative and idempotent
   - Network partitions are handled gracefully with automatic reconciliation
  
<img width="838" height="212" alt="image" src="https://github.com/user-attachments/assets/e8a3a50f-4342-4b29-ac6f-efef9e2137a1" />

### Component Communication

```
MainLayout
  ├─> useSharedFileList (Yjs sync)
  ├─> FileTree (UI + file operations)
  └─> CodeEditor (Monaco + Yjs per-file sync)
```

---

## Running the Project

### Option 1: Docker (Recommended)

The easiest way to run the entire application with all dependencies pre-configured.

**Prerequisites:**
- Docker and Docker Compose installed ([Install Docker](https://www.docker.com/products/docker-desktop))

**Quick Start:**
```bash
git clone https://github.com/HendrickFS/collaborative-code-editor
cd codeEditor
docker-compose up
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:1234

### Option 2: Local Development

**Prerequisites:**
```bash
Node.js and npm
```

**Installation:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/HendrickFS/collaborative-code-editor
   cd codeEditor
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

**Running the Application:**

1. **Start the WebSocket server** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:1234`

2. **Start the React app** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```
   App will open at `http://localhost:3000`

3. **Test collaboration**
   - Open `http://localhost:3000` in multiple browser windows/tabs
   - Create or upload a file in one window
   - Watch it appear in all other windows
   - Start editing and see changes sync in real-time

---

## Technologies & Libraries

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | React + TypeScript | Type-safe UI development |
| **Code Editor** | Monaco Editor | Code editor engine |
| **Real-time Sync** | Yjs + y-websocket + y-monaco | CRDT-based collaboration |
| **UI Components** | Ant Design | Professional component library |
| **Backend Server** | Express.js | Lightweight HTTP server |
| **WebSocket** | ws + y-websocket | Real-time communication |
| **Language** | TypeScript | Type safety across the stack |

---

## Learning Outcomes

This project helped me to improve my skills in:

- **Real-time Systems**: WebSocket communication and CRDT-based synchronization
- **State Management**: Distributed state with Yjs, local state with React hooks
- **TypeScript**: Strong typing across frontend and backend
- **Component Architecture**: Modular, reusable React components
- **Custom Hooks**: Reusable logic with `useSharedFileList`
- **Service Layer**: Separation of concerns with file system services
- **Monaco Integration**: Advanced editor configuration and binding
- **WebSocket Architecture**: Room-based communication patterns
- **User Experience**: Toast notifications, loading states, error handling
- **Modern React**: Hooks, refs, effects, and performance optimization

---

## Future Enhancements

- [ ] **Authentication**: User login and room access control
- [ ] **Persistence**: Database storage for file preservation across sessions
- [ ] **User Cursors**: Visual representation of other users' cursor positions
