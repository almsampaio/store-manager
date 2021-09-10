const { Router } = require('express');
const {
  createController,
} = require('../../controller/products/productsController');

const {
  validateName,
  validateTypeQuantity,
  validateQuantity,
} = require('../../middlewares/validates');

const router = Router();

router.post(
  '/',
  validateName,
  validateTypeQuantity,
  validateQuantity,
  createController,
);

module.exports = router;