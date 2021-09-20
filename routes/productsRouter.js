const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/Products');

router.post('/', ProductsController.create);

module.exports = router;
