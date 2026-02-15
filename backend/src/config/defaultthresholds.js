module.exports = {
    type: "DEFAULT",
    temperature: {
        min: 5,
        max: 40,
        rapidChange: 10,
    },
    humidity: {
        min: 20,
        max: 80,
        rapidChange: 20,
    },
    airQuality: {
        warning: 150,
        critical: 300,
        rapidRise: 100,
    },
};
