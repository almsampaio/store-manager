const express = require('express');
const Products = require('../controllers/productsController');
const validadeProduct = require('../middlewares/validateProduct');

const router = express.Router();

// cadastro de produtos
router.post('/', validadeProduct, Products.create);

module.exports = router;