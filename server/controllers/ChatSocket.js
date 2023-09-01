const express = require('express');
const http = require("http");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // we can add http://localhost:3000
        // Can also specify methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
});

module.exports=io;