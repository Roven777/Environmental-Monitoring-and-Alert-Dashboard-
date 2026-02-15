const AIAnomaly = require("../models/AIAnomaly");

exports.getAnomalies = async (req, res) => {
  const anomalies = await AIAnomaly.find()
    .sort({ detectedAt: -1 })
    .limit(200);

  res.json(anomalies);
};
