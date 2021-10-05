const express = require('express');
const controller = require('../controller/salesController');

const router = express.Router();

router.post('/', controller.addNewSale);
router.get('/', controller.getAllSales);

module.exports = router;