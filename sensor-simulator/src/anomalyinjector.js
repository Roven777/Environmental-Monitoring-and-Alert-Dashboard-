exports.injectAnomaly = (data) => {
    const anomalyChance = Math.random();
    
    if (anomalyChance < 0.1) {
        return {
            ...data,
            temperature: data.temperature + 20,
            airQuality: data.airQuality + 150,
            anomalyInjected: true,
        };
    }
    
    return { ...data, anomalyInjected: false };
};
