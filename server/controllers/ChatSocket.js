const express = require('express');
const http = require("http");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

io.attach(server);

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
        console.log(`User ${socket.id} is joining room ${roomId}`);
        socket.join(roomId);
    });
    
    socket.on("send_message", (data) => {
        console.log(`Received message from ${socket.id}: ${data.msg} and ${data.room}`);
        io.to(data.room).emit("receive_message", data.msg);
        // socket.broadcast.emit("receive_message", data.msg);
    });

    socket.on("receive_message", (data) => {
        console.log(`Received message in room: ${data.msg}`);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});

module.exports=io;