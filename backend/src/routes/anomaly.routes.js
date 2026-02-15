const express = require("express");
const router = express.Router();
const controller = require("../controllers/anomaly.controller");

router.get("/", controller.getAnomalies);

module.exports = router;
