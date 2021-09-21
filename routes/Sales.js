const express = require('express');
const { createSales, getAllSales } = require('../controllers/Sales');

const router = express.Router();

router.post('/', createSales);

router.get('/', getAllSales);

module.exports = router;
