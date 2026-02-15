const mongoose = require("mongoose");

const collectionName = "sensordatas";

const SensorDataSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },

    metadata: {
      sensorId: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },

    temperature: Number,
    humidity: Number,
    airQuality: Number,
    anomalyInjected: Boolean,
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "seconds",
    },
  }
);

module.exports = mongoose.model(
  "SensorData",
  SensorDataSchema,
  collectionName
);