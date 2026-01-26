# CodeEditor

Collaborative code editor playground powered by Monaco, Yjs, and a lightweight WebSocket server. The frontend is a Create React App with Ant Design for layout; the backend is an Express + y-websocket bridge for real-time sync.

## Features
- Live collaborative editing via Yjs + y-websocket and `MonacoBinding` (room: `code-editor-room` on `ws://localhost:1234`)
- Monaco editor with VS Code-style dark theme and language auto-detection from uploaded file extensions (ts/js/py/tsx/java/cs/cpp/rb/go/php, otherwise plaintext)
- Upload a single local file to seed the editor (Ant Design Upload in the left sidebar); a Save button stub is present for future wiring
- Split-pane layout using Ant Design `Layout` (dark sider + full-height editor area)
- Minimal Express + ws bridge configured for y-websocket

## Prerequisites
- Node.js 18+ (recommended) and npm

## Quick start
1) Install dependencies
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

2) Run the collaboration server (port 1234)
- From the `backend/` folder: `npm run dev`

3) Run the React app (port 3000)
- In another terminal, from the `frontend/` folder: `npm start`
- Open http://localhost:3000 and start typing; peers connected to the same WebSocket room will see edits in real time.

## Configuration
- WebSocket endpoint: the editor connects to `ws://localhost:1234` in `frontend/src/features/editor/components/CodeEditor.tsx`. Adjust host/port as needed for deployment.
- Room name: hard-coded to `code-editor-room`; change in `CodeEditor.tsx` if you want multiple rooms.

## Project structure (high level)
```
.
├── backend/             # Express + y-websocket bridge (CORS enabled)
│   ├── src/app/server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── node_modules/
├── frontend/            # Create React App frontend (Ant Design + Monaco)
│   ├── src/layout/MainLayout.tsx       # Sider + editor layout
│   ├── src/features/editor/components/CodeEditor.tsx
│   ├── src/features/file-tree/FileTree.tsx   # Upload-to-editor stub
│   ├── src/services/fileSystem.service.ts    # File metadata helpers
│   ├── package.json
│   ├── tsconfig.json
│   └── node_modules/
├── README.md
└── .gitignore
```

## How it works
- Editor collaboration: [frontend/src/features/editor/components/CodeEditor.tsx](frontend/src/features/editor/components/CodeEditor.tsx) creates a Yjs doc, connects to the websocket provider, and binds to Monaco. Clean-up tears down the provider/binding on unmount.
- File loading: [frontend/src/features/file-tree/FileTree.tsx](frontend/src/features/file-tree/FileTree.tsx) uses Ant Design Upload to read a single local file into memory, derive the language via [frontend/src/services/fileSystem.service.ts](frontend/src/services/fileSystem.service.ts), and pass it to the editor. The Save button is a placeholder.
- Layout/theme: [frontend/src/layout/MainLayout.tsx](frontend/src/layout/MainLayout.tsx) wires the sider + content split; [frontend/src/theme/themeConfig.tsx](frontend/src/theme/themeConfig.tsx) applies Ant Design dark tokens aligned to Monaco.
- Server: [backend/src/app/server.ts](backend/src/app/server.ts) is a small Express server that hosts a WebSocketServer and delegates collaboration to `setupWSConnection` from y-websocket.

## Scripts
- Backend: `npm run dev` – run the y-websocket server in watch mode via tsx
- Frontend: `npm start` – start CRA dev server
- Frontend: `npm test` – run CRA tests (watch mode)

## Notes and limitations
- In-memory only: documents are not persisted; restarting the server clears state.
- File tree is static demo data; wire it to real project data as needed.
- Security/auth is not implemented; use behind trusted networks or add auth before deployment.

## Deployment tips
- Serve the backend over HTTPS/WSS when deploying behind a reverse proxy (configure `WebsocketProvider` URL accordingly).
- Consider persistence (e.g., y-leveldb) if you need durable documents.
- For production builds, run `cd frontend && npm run build` and host the static assets; keep the WebSocket server running alongside.
