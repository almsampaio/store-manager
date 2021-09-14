const { Router } = require('express');

const router = Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,

} = require('../Controllers/productsController');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', addProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;