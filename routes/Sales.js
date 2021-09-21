const express = require('express');
const { createSales } = require('../controllers/Sales');

const router = express.Router();

router.post('/', createSales);

module.exports = router;
