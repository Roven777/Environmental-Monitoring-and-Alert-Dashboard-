const OpenAI = require("openai");
const SensorData = require("../models/sensordata");
const { processAlert } = require("./alert.service");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function runAIDetection(io) {

  const sensors = await SensorData.distinct("metadata.sensorId");

  for (const sensorId of sensors) {

    const history = await SensorData.find({
      "metadata.sensorId": sensorId
    })
    .sort({ timestamp: -1 })
    .limit(25)
    .lean();

    if (history.length < 15) continue;

    const pattern = history.reverse().map(d => ({
      t: d.temperature,
      h: d.humidity,
      a: d.airQuality
    }));

    try {

      const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `
You are an environmental monitoring anomaly detection AI.

Analyze this time-series data and determine if behavior is abnormal.

Abnormal examples:
- sudden spikes
- unstable oscillations
- unrealistic combinations
- unusual trend deviation

Return ONLY JSON:
{ "anomaly": true/false, "confidence": 0-1, "reason": "short reason" }

DATA:
${JSON.stringify(pattern)}
`
      });

      const result = JSON.parse(response.output_text);

      if (!result.anomaly || result.confidence < 0.65) continue;

      await processAlert({
        sensorId,
        severity: "ANOMALY",
        message: `AI anomaly detected (${Math.round(result.confidence*100)}%): ${result.reason}`,
        timestamp: new Date()
      }, io);

    } catch (err) {
      console.log("AI skipped:", err.message);
    }
  }
}

module.exports = { runAIDetection };
