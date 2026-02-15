const { MongoClient } = require("mongodb");
const defaults = require("../config/defaultthresholds");

const client = new MongoClient(process.env.MONGO_URI);

async function getEffectiveThresholds() {
  await client.connect();
  const db = client.db("environmentDB");

  // Always pick latest active rule
  const user = await db.collection("thresholds")
    .find({ type: "USER", enabled: true })
    .sort({ updatedAt: -1 })
    .limit(1)
    .toArray();

  if (!user.length) return defaults;

  const u = user[0];

  return {
    ...defaults,
    temperature: { ...defaults.temperature, ...(u.temperature || {}) },
    humidity: { ...defaults.humidity, ...(u.humidity || {}) },
    airQuality: { ...defaults.airQuality, ...(u.airQuality || {}) },
  };
}

module.exports = { getEffectiveThresholds };
