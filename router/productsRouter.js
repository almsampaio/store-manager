const express = require('express');
const Products = require('../controllers/productsController');
const validadeProduct = require('../middlewares/validateProduct');

const router = express.Router();

// cadastro de produtos
router.get('/:id', Products.getById);
router.put('/:id', validadeProduct, Products.update);
router.get('/', Products.getAll);
router.post('/', validadeProduct, Products.create);

module.exports = router;