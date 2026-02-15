const { MongoClient } = require("mongodb");
const defaults = require("./defaultthresholds");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

async function seedDefaultThresholds() {
  const client = new MongoClient(uri);
  await client.connect();

  const col = client.db("environmentDB").collection("thresholds");

  const exists = await col.findOne({ type: "DEFAULT" });
  if (!exists) {
    await col.insertOne({ ...defaults, createdAt: new Date() });
    console.log("✅ Default thresholds seeded");
  }

  await client.close();
}

module.exports = seedDefaultThresholds;
