const SensorData = require("../models/sensordata");

exports.getHistoricalData = async (req, res) => {
    const { sensorId, hours = 1 } = req.query;
    
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const query = {
        timestamp: { $gte: since },
    };
    
    if (sensorId) {
        query["metadata.sensorId"] = sensorId;
    }

    const data = await SensorData.find(query)
        .sort({ timestamp: -1 })
        .limit(1000);

    res.json(data);
};
