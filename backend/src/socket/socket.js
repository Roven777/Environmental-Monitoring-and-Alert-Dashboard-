import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);
});

socket.on("sensor-data", (data) => {
  console.log("📡 SENSOR EVENT:", data);
});

socket.on("alert", (alert) => {
  console.log("🚨 ALERT RECEIVED:", alert);
});

export default socket;
