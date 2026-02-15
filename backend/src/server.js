require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const handleSensorSocket = require("./socket/sensor.socket");
const handleAlertSocket = require("./socket/alert.socket");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

/* ---------- SERVER ---------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

/* ---------- SOCKETS ---------- */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  handleSensorSocket(io, socket);
  handleAlertSocket(io, socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/* ---------- AI JOB ---------- */
require("./jobs/ai.job")(io);

/* ---------- START ---------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
