const { Router } = require('express');
const {
  createController,
  readByAllController,
  readByIdController,
  updateControler,
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

router.get('/', readByAllController);
router.get('/:id', readByIdController);

router.put(
  '/:id',
  validateName,
  validateTypeQuantity,
  validateQuantity,
  updateControler,
);

module.exports = router;