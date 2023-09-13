const { Server } = require("socket.io");

const SocketIO=(server)=>{
    const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    

    socket.on("send_msg", (data,callback) => {
        const {from,to,message}=data;
        const recipientSocket  = onlineUsers.get(data.to);

        if(recipientSocket){
            socket.to(recipientSocket).emit("receive_msg", {from,message});
            console.log("Sender: "+from+" Receiver: "+to+" message: "+message);
            callback({ message: 'Message sent successfully' });
        }else{
            callback({ error: 'User not found' });
        }
    });

    socket.on("disconnect", () => {
        const userIdToRemove = Array.from(onlineUsers.entries()).find(([_, socketId]) => socketId === socket.id);
        if (userIdToRemove) {
            onlineUsers.delete(userIdToRemove[0]);
            console.log(`User disconnected ${socket.id}`);
        }
    });
});
}


module.exports=SocketIO;