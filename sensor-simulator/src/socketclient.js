const { io } = require("socket.io-client");

const connectSocket = () => {
    const socket = io(process.env.BACKEND_SOCKET_URL, {
        transports: ["websocket"],
    });
    
    socket.on("connect", () => {
        console.log("Connected to backend socket:", socket.id);
    });
    
    socket.on("disconnect", () => {
        console.log("Disconnected from backend");
    });
    
    return socket;
};

module.exports = connectSocket;
