const express = require('express');

const { createProduct } = require('../controllers/productsController');

const router = express.Router();

router.post('/', createProduct);

module.exports = router;
