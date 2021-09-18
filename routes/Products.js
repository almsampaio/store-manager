const express = require('express');
const { createProduct } = require('../controllers/Products');

const router = express.Router();

router.post('/', createProduct);

module.exports = router;
