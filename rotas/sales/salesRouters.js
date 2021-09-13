const { Router } = require('express');

const { 
  createController,
  readByAllController,
  readByIdController,
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

module.exports = router;