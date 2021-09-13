const { Router } = require('express');

const { createController } = require('../../controller/sales/salesController');

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

module.exports = router;