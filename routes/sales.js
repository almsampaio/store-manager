const express = require('express');
const { salesControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.registerSales, salesControllers.registerSales);

module.exports = router;
