const { Server } = require("socket.io");

const SocketIO = (server) => {

    const io = new Server(server, {
        cors: {
        origin: "http://localhost:3000",
        credentials: true,
        },
    });

    // global.onlineUsers = new Map();
    const userSockets = new Map();

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    // global.chatSocket = socket;

    // Adding users
    socket.on("add-user", (userId) => {
        userSockets.set(userId, socket.id);
    });

    //Receving messages from client
    socket.on("send_msg", (data, callback) => {
        const { from, to, message } = data;
        const recipientSocket = userSockets.get(data.to);

            //sending message to client
        if (recipientSocket) {
            socket.to(recipientSocket).emit("receive_msg", { from, message });;
            console.log("Sender: " + from + " Receiver: " + to + " message: " + message);
            callback({ message: "Message sent successfully" });
        } else {
            callback({ error: "User not found" });
        }
    });

    // Disconnecting user
    socket.on("disconnect", () => {
    for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
            userSockets.delete(userId);
            break;
        }
    }
    socket.disconnect();
        console.log(`User disconnected ${socket.id}`);
    });
});
};

module.exports = SocketIO;
