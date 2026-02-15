const sendSms = require("../config/twilio");

module.exports.processAlert = async (alert, io) => {

  // attach fixed timestamp
  const alertWithTime = {
    ...alert,
    timestamp: new Date().toISOString()
  };

  console.log("🚨 ALERT:", alertWithTime);

  // ONLY EMIT (do not control system state anymore)
  io.emit("alert", alertWithTime);

  // optional SMS
  try {
    await sendSms(alertWithTime);
  } catch (err) {
    console.log("SMS failed:", err.message);
  }
};
