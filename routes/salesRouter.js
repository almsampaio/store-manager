const express = require('express');
const controller = require('../controller/salesController');

const router = express.Router();

router.post('/', controller.addNewSale);

module.exports = router;