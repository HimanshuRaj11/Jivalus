const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors")
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        pingTimeout: 60000,
        origin: "http://localhost:3000", // Allow requests from any origin
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connection onn");

    // socket.on("disconnect", () => {
    //     console.log("A user disconnected");
    // });

    socket.on("message", (message) => {
        console.log("Message received:", message);
        socket.broadcast.emit("message", message); // Broadcast message to all other clients
    });
    socket.on("LogedInUser", (UserData) => {
        socket.join(UserData._id)
        socket.emit("User Connected")
    })
    socket.on("JoinChat", (Chat) => {
        socket.join(Chat);
        console.log('user Join The Chat : ' + Chat);

    })
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
