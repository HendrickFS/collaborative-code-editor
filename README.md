# CodeEditor

Collaborative code editor playground powered by Monaco, Yjs, and a lightweight WebSocket server. The frontend is a Create React App with Ant Design for layout; the backend is an Express + y-websocket bridge for real-time sync.

## Features
- Live collaborative editing via Yjs + y-websocket and MonacoBinding
- VS Code-style dark theme with Monaco TypeScript defaults
- Simple file tree sidebar scaffold (static sample data, ready to extend)
- Minimal Express + ws server configured for y-websocket

## Prerequisites
- Node.js 18+ (recommended) and npm

## Quick start
1) Install dependencies
- Backend (root): `npm install`
- Frontend: `cd client && npm install`

2) Run the collaboration server (port 1234)
- From the repo root: `npm run dev`

3) Run the React app (port 3000)
- In another terminal: `cd client && npm start`
- Open http://localhost:3000 and start typing; peers connected to the same WebSocket room will see edits in real time.

## Configuration
- WebSocket endpoint: the editor connects to `ws://localhost:1234` in `client/src/features/editor/components/CodeEditor.tsx`. Adjust host/port as needed for deployment.
- Room name: hard-coded to `code-editor-room`; change in `CodeEditor.tsx` if you want multiple rooms.

## Project structure (high level)
```
.
├── server/              # Express + y-websocket bridge
│   └── src/app/server.ts
├── client/              # Create React App frontend
│   ├── src/layout/MainLayout.tsx
│   ├── src/features/editor/components/CodeEditor.tsx
│   └── src/features/file-tree/FileTree.tsx
├── package.json         # Backend scripts/deps (npm run dev)
└── README.md
```

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
- For production builds, run `cd client && npm run build` and host the static assets; keep the WebSocket server running alongside.
