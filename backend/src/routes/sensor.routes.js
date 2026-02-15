const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensor.controller');

router.get('/history', controller.getHistoricalData);

module.exports = router;
