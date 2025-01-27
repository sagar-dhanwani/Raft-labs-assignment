const io = require('socket.io-client');
const jwt = require('jsonwebtoken');

// Replace with your JWT secret and user details
const JWT_SECRET = 'testingapi'; 
const token = jwt.sign({ id: 'user_id', email: 'user@example.com' }, JWT_SECRET, { expiresIn: '1h' });

const socket = io('http://localhost:4000', {
  auth: {
    token,
  },
  transports: ['websocket'], // Ensure WebSocket transport is used
});

socket.on('connect', () => {
  console.log('Connected to server');

  // Join a room
  socket.emit('joinRoom', 'testRoom');

  // Send a message to the room
  socket.emit('message', { room: 'testRoom', message: 'Hello, World!' });

  // Listen for messages from the room
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });

  // Leave the room
  setTimeout(() => {
    socket.emit('leaveRoom', 'testRoom');
    socket.disconnect();
  }, 5000);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});