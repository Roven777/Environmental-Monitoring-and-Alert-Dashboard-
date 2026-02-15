const mongoose = require("mongoose");

const ThresholdSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["DEFAULT", "USER"],
        required: true,
    },
    sensorId: {
        type: String, // null = global
        default: null,
    },
    temperature: {
        min: Number,
        max: Number,
        rapidChange: Number, // °C
    },
    humidity: {
        min: Number,
        max: Number,
        rapidChange: Number, // %
    },
    airQuality: {
        warning: Number,
        critical: Number,
        rapidRise: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model("Threshold", ThresholdSchema);
