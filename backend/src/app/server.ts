import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { setupWSConnection } from 'y-websocket/bin/utils';

const app = express();
app.use(cors());
    
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (conn, req) => {   
    setupWSConnection(conn, req);
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


