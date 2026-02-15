const SensorData = require("../models/sensordata");
const { evaluateRules } = require("../services/ruleEngine.service");
const { processAlert } = require("../services/alert.service");

const previousReadings = new Map();

// ⭐ IMPORTANT — store last live value
let lastSensorPayload = null;

/* -------- realtime status calculation -------- */
function calculateSystemStatus(t, h, aq) {
  if (t >= 40 || aq >= 300) return "CRITICAL";
  if (t >= 35 || h >= 75 || aq >= 150) return "WARNING";
  return "NORMAL";
}

const handleSensorSocket = (io, socket) => {

  // ⭐ SEND LAST VALUE TO NEWLY CONNECTED CLIENT
  if (lastSensorPayload) {
    socket.emit("sensor-data", lastSensorPayload);
  }

  socket.on("sensor-data", async (data) => {
    try {
      console.log("SENSOR EVENT:", data);

      if (!data.sensorId) return;

      const location = data.location || "Lab-1";
      const timestamp = new Date().toISOString();

      // Save to MongoDB
      const record = await SensorData.create({
        timestamp: new Date(timestamp),
        metadata: {
          sensorId: data.sensorId,
          location
        },
        temperature: Number(data.temperature),
        humidity: Number(data.humidity),
        airQuality: Number(data.airQuality),
        anomalyInjected: data.anomalyInjected ?? false
      });

      // Previous reading
      const previous = previousReadings.get(data.sensorId);

      // Rule alerts
      const alerts = await evaluateRules(record, previous);

      let anomaly = data.anomalyInjected === true;

      if (alerts?.length) {
        for (const alert of alerts) {
          if (alert.severity === "ANOMALY") anomaly = true;
          await processAlert(alert, io);
        }
      }

      previousReadings.set(data.sensorId, record);

      // System state
      const systemStatus = calculateSystemStatus(
        Number(data.temperature),
        Number(data.humidity),
        Number(data.airQuality)
      );

      // ⭐ FINAL PAYLOAD
      lastSensorPayload = {
        sensorId: data.sensorId,
        location,
        timestamp,
        temperature: Number(data.temperature),
        humidity: Number(data.humidity),
        airQuality: Number(data.airQuality),
        anomaly,
        systemStatus
      };

      // Broadcast to all clients
      io.emit("sensor-data", lastSensorPayload);

    } catch (err) {
      console.error("Sensor socket error:", err.message);
    }
  });
};

module.exports = handleSensorSocket;
