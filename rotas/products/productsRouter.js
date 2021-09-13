const { Router } = require('express');
const {
  createController,
  readByAllController,
  readByIdController,
  updateControler,
  deleteController,
} = require('../../controller/products/productsController');

const {
  validateNameProducts,
  validateTypeQuantityProducts,
  validateQuantityProducts,
} = require('../../middlewares/validates/productsValidates');

const router = Router();

router.post(
  '/',
  validateNameProducts,
  validateTypeQuantityProducts,
  validateQuantityProducts,
  createController,
);

router.get('/', readByAllController);
router.get('/:id', readByIdController);

router.put(
  '/:id',
  validateNameProducts,
  validateTypeQuantityProducts,
  validateQuantityProducts,
  updateControler,
);

router.delete('/:id', deleteController);

module.exports = router;