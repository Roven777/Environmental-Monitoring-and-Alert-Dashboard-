const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function saveThreshold(req, res) {
  try {
    const { temperature, humidity, airQuality } = req.body;

    if (!temperature && !humidity && !airQuality) {
      return res.status(400).json({ message: "No threshold data provided" });
    }

    await client.connect();
    const db = client.db("environmentDB");
    const collection = db.collection("thresholds");

    // STEP 1 — Disable all previous user rules
    await collection.updateMany(
      { type: "USER", enabled: true },
      { $set: { enabled: false } }
    );

    // STEP 2 — Insert new active rule
    const newRule = {
      type: "USER",
      enabled: true,
      temperature: temperature || {},
      humidity: humidity || {},
      airQuality: airQuality || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newRule);

    res.status(200).json({
      message: "Threshold updated successfully",
      id: result.insertedId
    });

  } catch (err) {
    console.error("Threshold Save Error:", err);
    res.status(500).json({ message: "Failed to update threshold" });
  }
}



async function getThreshold(req, res) {
  try {
    await client.connect();
    const db = client.db("environmentDB");
    const collection = db.collection("thresholds");

    // Always fetch latest active rule
    const rule = await collection
      .find({ type: "USER", enabled: true })
      .sort({ updatedAt: -1 })
      .limit(1)
      .toArray();

    if (!rule.length) {
      return res.status(200).json({ message: "Using default thresholds" });
    }

    res.status(200).json(rule[0]);

  } catch (err) {
    console.error("Get Threshold Error:", err);
    res.status(500).json({ message: "Failed to fetch thresholds" });
  }
}



async function resetThreshold(req, res) {
  try {
    await client.connect();
    const db = client.db("environmentDB");
    const collection = db.collection("thresholds");

    // Disable user rules → system falls back to defaults
    await collection.updateMany(
      { type: "USER" },
      { $set: { enabled: false } }
    );

    res.status(200).json({
      message: "Threshold reset to default"
    });

  } catch (err) {
    console.error("Reset Threshold Error:", err);
    res.status(500).json({ message: "Failed to reset thresholds" });
  }
}


module.exports = {
  saveThreshold,
  getThreshold,
  resetThreshold
};
