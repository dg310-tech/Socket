// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 8000;
// Serve static files from 'public' folder
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send dummy data every 3 seconds
  const intervalId = setInterval(() => {
    const dummyData = {
      timestamp: new Date(),
      value: Math.floor(Math.random() * 100),
    };
    socket.emit('dummy-data', dummyData);
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

server.listen(PORT, () => {
  console.log('Server running on http://localhost:8000');
});
