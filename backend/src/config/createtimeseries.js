const mongoose = require("mongoose");

const createTimeSeriesCollection = async () => {
    const db = mongoose.connection.db;
    
    if (!db) {
        throw new Error("MongoDB native connection not ready");
    }

    const collections = await db.listCollections().toArray();

    const exists = collections.some(
        (col) => col.name === "sensor_readings"
    );

    if (!exists) {
        await db.createCollection("sensor_readings", {
            timeseries: {
                timeField: "timestamp",
                metaField: "metadata",
                granularity: "seconds",
            },
        });

        await db.collection("sensor_readings").createIndex({
            "metadata.sensorId": 1,
            timestamp: -1,
        });

        console.log("Time-series collection created");
    } else {
        console.log("ℹ️ Time-series collection already exists");
    }
};

module.exports = createTimeSeriesCollection;
