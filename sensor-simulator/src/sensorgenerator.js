const random = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

exports.generateNormalData = () => ({
  temperature: random(20, 30),   // °C
  humidity: random(40, 60),      // %
  airQuality: random(50, 100),   // AQI
});
