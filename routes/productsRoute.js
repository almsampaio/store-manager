const express = require('express');

const { createProduct,
     getAllProducts,
     getByID,
     validateID,
     update,
     deleteProduct } = require('../controllers/productsController');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getByID, update);

router.put('/:id', update);

router.delete('/:id', validateID, deleteProduct);

module.exports = router;
