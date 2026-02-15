const { Server } = require("socket.io");
const handleSensorSocket = require("../socketa/sensor.socket");
const handleAlertSocket = require("../socketa/alert.socket");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // 🔹 Sensor data
    handleSensorSocket(io, socket);

    // 🔹 Alerts
    handleAlertSocket(io, socket);
  });

  return io;
};
