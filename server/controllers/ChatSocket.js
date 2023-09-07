const express = require('express');
const http = require("http");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

io.attach(server);

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    // socket.on("joinRoom", (roomId) => {
    //     console.log(`User ${socket.id} is joining room ${roomId}`);
    //     socket.join(roomId);
    // });
    
    socket.on("privateMessage", (data) => {
        const {sender,receiver,message}=data;
        console.log(`Sender is ${sender} and receiver ${receiver} and message ${message}`)
        socket.to(receiver).emit("privateMessage", {sender,message});
        // socket.broadcast.emit("privateMessage", {sender,message});

    });


    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});

module.exports=io;