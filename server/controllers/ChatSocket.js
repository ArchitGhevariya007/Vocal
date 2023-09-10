const { Server } = require("socket.io");
const Room = require("../models/RoomModel");

const SocketIO=(server)=>{
    const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    
    socket.on("user_connected",(userId)=>{
        userSocketMap.set(userId, socket.id);
        // socket.join(userId);
        console.log(userSocketMap);
    })
    

    socket.on("send_msg", (data) => {
        const {sender,receiver,message}=data;
        const senderSocketId = userSocketMap.get(sender);
        const receiverSocketId = userSocketMap.get(receiver);

        if(receiverSocketId){
            io.to(senderSocketId).emit("receive_msg", {senderSocketId,message});
            console.log(`Message sent from ${senderSocketId} to ${receiverSocketId}`);
        }else {
            console.log(`Receiver not found for user ${receiver}`);
        }
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
        console.log(`User disconnected ${socket.id}`);
    });
});
}


module.exports=SocketIO;