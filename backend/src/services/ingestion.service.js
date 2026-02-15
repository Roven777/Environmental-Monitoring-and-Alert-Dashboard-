const { MongoClient } = require("mongodb");

/**
 * MongoDB connection
 */
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "environmentDB";
const COLLECTION_NAME = "sensordatas";

const client = new MongoClient(MONGO_URI, {
  maxPoolSize: 10,
});

let collection;

/**
 * Get MongoDB Time-Series collection (singleton)
 */
async function getCollection() {
  if (!collection) {
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    console.log("✅ Connected to MongoDB Time-Series:", COLLECTION_NAME);
  }
  return collection;
}

/**
 * Insert sensor reading into MongoDB Time-Series collection
 */
async function ingestSensorData(data) {
  const col = await getCollection();

  /**
   * ⚠️ REQUIRED time-series document shape
   */
  const doc = {
    timestamp: new Date(data.timestamp), // MUST be Date object
    metadata: {
      sensorId: data.sensorId,
      location: data.location,
    },
    temperature: Number(data.temperature),
    humidity: Number(data.humidity),
    airQuality: Number(data.airQuality),
    anomalyInjected: Boolean(data.anomalyInjected),
  };

  await col.insertOne(doc);
}

module.exports = {
  ingestSensorData,
};
