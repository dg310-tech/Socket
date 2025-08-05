// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  const interval = setInterval(() => {
    const data = {
      timestamp: new Date(),
      value: Math.floor(Math.random() * 100)
    };
    ws.send(JSON.stringify(data));
  }, 3000);

  wss.on('connection', function connection(ws) {
    console.log('Client connected');  // ✅ This logs when Flutter connects
  
    ws.on('close', () => {
      console.log('Client disconnected');  // ✅ This logs when Flutter disconnects
    });
  
    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });
  
});

console.log('WebSocket server is running on ws://localhost:8000');
