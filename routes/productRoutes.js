const express = require('express');

const router = express.Router();
// importação de controllers
const { createProduct,
  getAll, getById,
  updateProduct,
  deleteProduct } = require('../controllers/productControllers');
// importação de middlewares de validação
const { validateName,
  validateProductExistence,
  validateQtyOfProducts,
  validateTypeOfQty } = require('../middlewares/middlewareValidations');

router.post('/', validateName,
  validateProductExistence,
  validateQtyOfProducts,
  validateTypeOfQty,
  createProduct);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', validateName, validateQtyOfProducts, validateTypeOfQty, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

// https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way