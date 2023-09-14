const { Server } = require("socket.io");

const SocketIO = (server) => {

    const io = new Server(server, {
        cors: {
        origin: "http://localhost:3000",
        credentials: true,
        },
    });

    global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    global.chatSocket = socket;

        // Adding users
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    //Receving messages from client
    socket.on("send_msg", (data, callback) => {
        const { from, to, message } = data;
        const recipientSocket = onlineUsers.get(data.to);

            //sending message to client
        if (recipientSocket) {
            socket.to(recipientSocket).emit("receive_msg", { from, message });
            console.log("Sender: " + from + " Receiver: " + to + " message: " + message);
            callback({ message: "Message sent successfully" });
        } else {
            callback({ error: "User not found" });
        }
    });

    // Disconnecting user
    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});
};

module.exports = SocketIO;
