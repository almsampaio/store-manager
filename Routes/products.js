const express = require('express');
const productController = require('../controllers/products');

const router = express.Router();

router.post('/', productController.addNew);

module.exports = router;
