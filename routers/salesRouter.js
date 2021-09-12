const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controller = require('../controllers');

router.post('/', rescue(controller.salesController.createSales));

module.exports = router;
