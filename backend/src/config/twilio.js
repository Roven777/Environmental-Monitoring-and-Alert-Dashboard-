const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSms = async (alert) => {

  const message = `
CRITICAL ENVIRONMENT ALERT

Sensor: ${alert.sensorId || "Unknown"}
Severity: ${alert.severity || "WARNING"}

${alert.message || `${alert.metric} = ${alert.value}`}

Time: ${new Date().toLocaleString()}
`;

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to: process.env.ALERT_PHONE
  });
};

module.exports = sendSms;
