const { Router } = require('express');

const { 
  createController,
  readByAllController,
  readByIdController,
  updateController,
  deleteController,
} = require('../../controller/sales/salesController');

const {
  validateTypeQuantitySales,
  validateQuantitySales,
} = require('../../middlewares/validates/salesValidates');

const router = Router();

router.post(
  '/',
  validateTypeQuantitySales,
  validateQuantitySales,
  createController,
);

router.get('/', readByAllController);
router.get('/:id', readByIdController);

router.put(
  '/:id',
  validateTypeQuantitySales,
  validateQuantitySales,
  updateController,
);

router.delete('/:id', deleteController);

module.exports = router;