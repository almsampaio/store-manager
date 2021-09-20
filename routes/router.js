const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const router = express.Router();

router.use('/products', productsController);
router.use('/sales', salesController);

module.exports = router;
