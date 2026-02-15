const { io } = require("socket.io-client");

const socket = io("http://backend:5000", {

  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Simulator connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Simulator disconnected");
});

/* baseline environment */
let baseTemp = 27;
let baseHum = 45;
let baseAQI = 70;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

setInterval(() => {

  /* environmental drift */
  baseTemp += randomRange(-0.5, 0.5);
  baseHum  += randomRange(-0.7, 0.7);
  baseAQI  += randomRange(-2, 2);

  let probability = Math.random();

  let temp = baseTemp;
  let hum  = baseHum;
  let aqi  = baseAQI;
  let anomalyInjected = false;

  /* ---------- STATE GENERATION ---------- */

  // 10% ANOMALY (sudden jump)
  if (probability < 0.02) {
    temp += randomRange(10, 18);
    hum  += randomRange(25, 40);
    aqi  += randomRange(120, 180);
    anomalyInjected = true;
  }

  // 10% CRITICAL
  else if (probability < 0.02) {
    temp = randomRange(42, 48);
    hum  = randomRange(85, 98);
    aqi  = randomRange(280, 380);
  }

  // 20% WARNING
  else if (probability < 0.05) {
    temp = randomRange(35, 39);
    hum  = randomRange(70, 79);
    aqi  = randomRange(150, 220);
  }

  // 60% NORMAL
  else {
    temp = randomRange(24, 30);
    hum  = randomRange(40, 60);
    aqi  = randomRange(50, 90);
  }

  const payload = {
    sensorId: "sensor-001",
    timestamp: new Date().toISOString(),
    temperature: Number(temp.toFixed(2)),
    humidity: Number(hum.toFixed(2)),
    airQuality: Number(aqi.toFixed(2)),
    anomalyInjected
  };

  console.log("📡 sending:", payload);

  socket.emit("sensor-data", payload);

}, 2000);
