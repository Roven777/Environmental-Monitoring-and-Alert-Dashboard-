const { runAIDetection } = require("../services/aiDetector.service");

module.exports = (io) => {

  setInterval(async () => {
    console.log("AI analyzing environmental patterns...");
    await runAIDetection(io);
  }, 45000); // every 45 sec
};
