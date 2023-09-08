const { Server } = require("socket.io");

const SocketIO=(server)=>{
    const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        // methods: ['GET', 'POST'],
        credentials: true,
    }
});

const userSocketMap = new Map();
// var users = [];
io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    // socket.on("storeUserId", (userId) => {
    //     // Store the user's socket ID in the map along with their user ID
    //     userSocketMap.set(userId, socket.id);
    // });
    socket.on("user_connected",(UserId)=>{
        userSocketMap.set(UserId, socket.id);
        socket.emit("user_connected", UserId);
    })

    socket.on("send_msg", (data) => {
        const {sender,receiver,message}=data;
        const receiverSocketId = userSocketMap.get(receiver);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("receive_msg", {sender,message});
            console.log(`Message sent from ${sender} to ${receiver}`);
        }else {
            console.log(`Receiver not found for user ${receiver}`);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});
}


module.exports=SocketIO;