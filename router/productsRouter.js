const express = require('express');
const Products = require('../controllers/productsController');
const validadeProduct = require('../middlewares/validateProduct');
const validateId = require('../middlewares/validateId');

const router = express.Router();

router.get('/:id', Products.getById);
router.put('/:id', validadeProduct, Products.update);
router.delete('/:id', validateId, Products.exclude);
router.get('/', Products.getAll);
router.post('/', validadeProduct, Products.create);

module.exports = router;