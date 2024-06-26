
const express = require('express');
const router = express.Router();
const predictFeelingController = require('../controller/predictFeeling');

router.post('/', predictFeelingController.predictFeeling);

module.exports = router;