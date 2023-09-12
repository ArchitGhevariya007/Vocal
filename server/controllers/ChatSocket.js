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
        const sendUserSocket = onlineUsers.get(data.to);

        if(sendUserSocket){
            socket.to(sendUserSocket).emit("receive_msg", {message});
            console.log("Sender: "+from+" Receiver: "+to+" message: "+message);
            callback({ message: 'Message sent successfully' });
        }else{
            callback({ error: 'User not found' });
        }
    });
});
}


module.exports=SocketIO;