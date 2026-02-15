let systemState = "NORMAL";

function calculateState(reading) {

  let next = "NORMAL";

  if (reading.temperature >= 40 || reading.airQuality >= 300) {
    next = "CRITICAL";
  }
  else if (
    reading.temperature >= 35 ||
    reading.humidity >= 75 ||
    reading.airQuality >= 150
  ) {
    next = "WARNING";
  }

  systemState = next;
  return systemState;
}

function getState() {
  return systemState;
}

module.exports = { calculateState, getState };
