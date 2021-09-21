const express = require('express');
const { createSales, getAllSales, getSaleById } = require('../controllers/Sales');

const router = express.Router();

router.post('/', createSales);

router.get('/', getAllSales);

router.get('/:id', getSaleById);

module.exports = router;
