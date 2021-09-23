const express = require('express');
const productsController = require('../controllers/productController');

const { nameAuth, quantityAuth } = require('../middlewares');

const router = express.Router();

router.post('/', [
  nameAuth,
  quantityAuth,
  productsController.add,
]);

router.get('/', [
  productsController.getAll,
]);

router.get('/:id', [
  productsController.getById,
]);

module.exports = router;
