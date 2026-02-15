const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();
const client = new MongoClient(process.env.MONGO_URI || "mongodb://127.0.0.1:27017");

async function col() {
  await client.connect();
  return client.db("environmentDB").collection("thresholds");
}

/* ACTIVE THRESHOLDS (USER > DEFAULT) */
router.get("/active", async (_, res) => {
  const c = await col();
  let rule = await c.findOne({ type: "USER", enabled: true });
  if (!rule) rule = await c.findOne({ type: "DEFAULT", enabled: true });
  res.json(rule);
});


/* CREATE USER THRESHOLD */
router.post("/", async (req, res) => {
  const c = await col();
  await c.updateMany({ type: "USER" }, { $set: { enabled: false } });

  await c.insertOne({
    ...req.body,
    type: "USER",
    enabled: true,
    createdAt: new Date(),
  });

  res.json({ ok: true });
});

/* DELETE USER THRESHOLD */
router.delete("/:id", async (req, res) => {
  const c = await col();
  await c.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ ok: true });
});

module.exports = router;
