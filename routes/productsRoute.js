const express = require('express');

const { createProduct,
     getAllProducts,
     getByID,
     update } = require('../controllers/productsController');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getByID, update);

router.put('/:id', update);

module.exports = router;
