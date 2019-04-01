import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { version } from '../package.json';
import WebSocket from 'ws';

const PORT = 3001;
const app = express();

app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(
  cors({
    exposedHeaders: '*',
  }),
);

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

app.wss = new WebSocket.Server({
  server: app.server,
});

let clients = [];

app.wss.on('connection', connection => {
  console.log('New connection!');

  const userId = clients.length + 1;
  const client = {
    ws: connection,
    userId,
  };

  clients.push(client);

  connection.on('close', () => {
    console.log(`Client with ID ${userId} is disconnected`);
    clients = clients.filter(client => client.userId !== userId);
  });
});

app.get('/', (req, res) => {
  res.json({ version });
});

app.get('/all_connections', (req, res) => {
  res.json({ clients });
});

app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
