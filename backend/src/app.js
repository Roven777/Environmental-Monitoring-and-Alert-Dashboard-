const express = require("express");
const cors = require("cors");

const alertRoutes = require("./routes/alert.routes");
const sensorRoutes = require("./routes/sensor.routes");
const thresholdRoutes = require("./routes/thresholds.routes");
const anomalyRoutes = require("./routes/anomaly.routes");

const startAICron = require("./jobs/aiCron.job");

module.exports = (io) => {
  const app = express();

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

  app.use(express.json());

  // API routes
  app.use("/api/sensors", sensorRoutes);
  app.use("/api/thresholds", thresholdRoutes);
  app.use("/api/anomalies", anomalyRoutes);
  app.use("/api/alerts", alertRoutes);

  // Test endpoint
  app.get("/test-alert", (req, res) => {
    io.emit("alert", {
      sensorId: "test",
      metric: "temperature",
      severity: "CRITICAL",
      message: "Manual test alert",
      value: 999,
      timestamp: new Date()
    });

    console.log("🚨 MANUAL TEST ALERT EMITTED");
    res.send("ok");
  });

  console.log("App initialized");
  startAICron(io);

  return app;
};
