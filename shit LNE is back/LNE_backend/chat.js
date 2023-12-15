const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
  const clients = {};

  // A new client connection request received
  wsServer.on('connection', function(connection) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log(`Received a new connection.`);
  
    // Store the new connection and handle messages
    clients[userId] = connection;
    console.log(`${userId} connected.`);
  });
});