const mongoose = require("mongoose");

const AIAnomalySchema = new mongoose.Schema(
  {
    sensorId: { type: String, required: true },
    metric: { type: String, required: true }, // temperature | humidity | airQuality
    value: { type: Number, required: true },
    mean: Number,
    deviation: Number,
    score: Number,
    detectedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIAnomaly", AIAnomalySchema);
