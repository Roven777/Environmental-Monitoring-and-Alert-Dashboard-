const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.acknowledged)
    filter.acknowledged = req.query.acknowledged === "true";

  const alerts = await Alert.find(filter)
    .sort({ createdAt: -1 })
    .limit(200);

  res.json(alerts);
});

router.post("/:id/ack", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { acknowledged: true, acknowledgedAt: new Date() },
    { new: true }
  );
  res.json(alert);
});

module.exports = router;
