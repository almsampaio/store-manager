const express = require('express');
const { createSales, getAllSales, getSaleById, setSale } = require('../controllers/Sales');

const router = express.Router();

router.post('/', createSales);

router.get('/', getAllSales);

router.get('/:id', getSaleById);

router.put('/:id', setSale);

module.exports = router;
