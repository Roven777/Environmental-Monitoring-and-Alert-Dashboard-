const thresholds = require("../config/defaultthresholds");

/*
Rule engine handles only deterministic threshold violations
AI handles anomaly detection
*/

function checkCritical(current) {

  if (current.temperature >= thresholds.temperature.max)
    return {
      severity: "CRITICAL",
      message: `Temperature exceeded (${current.temperature.toFixed(1)}°C > ${thresholds.temperature.max}°C)`
    };

  if (current.humidity >= thresholds.humidity.max)
    return {
      severity: "CRITICAL",
      message: `Humidity exceeded (${current.humidity.toFixed(1)}% > ${thresholds.humidity.max}%)`
    };

  if (current.airQuality >= thresholds.airQuality.critical)
    return {
      severity: "CRITICAL",
      message: `Air quality hazardous (${current.airQuality.toFixed(1)} > ${thresholds.airQuality.critical})`
    };

  return null;
}

function checkWarning(current) {

  if (current.temperature >= thresholds.temperature.max * 0.9)
    return { severity: "WARNING", message: `Temperature near limit (${current.temperature.toFixed(1)}°C)` };

  if (current.humidity >= thresholds.humidity.max * 0.9)
    return { severity: "WARNING", message: `Humidity near limit (${current.humidity.toFixed(1)}%)` };

  if (current.airQuality >= thresholds.airQuality.warning)
    return { severity: "WARNING", message: `Air quality degrading (${current.airQuality.toFixed(1)})` };

  return null;
}

async function evaluateRules(current) {

  const critical = checkCritical(current);
  if (critical) return [critical];

  const warning = checkWarning(current);
  if (warning) return [warning];

  return [];
}

module.exports = { evaluateRules };
