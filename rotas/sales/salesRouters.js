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

const { addProducts } = require('../../middlewares/UpdateQuantitySales/addQuantity');
const { subProducts } = require('../../middlewares/UpdateQuantitySales/subQuantity');
const { validateStock } = require('../../middlewares/validates/stock');

const router = Router();

router.post(
  '/',
  validateTypeQuantitySales,
  validateQuantitySales,
  validateStock,
  subProducts,
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

router.delete('/:id', addProducts, deleteController);

module.exports = router;