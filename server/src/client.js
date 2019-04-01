const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
  console.log('Connected to the server!');
});
