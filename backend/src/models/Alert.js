const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  sensorId: String,
  severity: String,
  message: String,
  value: Number,
  threshold: Number,
  source: {
    type: String,
    enum: ["RULE", "AI"],
    default: "RULE"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Alert", alertSchema);
