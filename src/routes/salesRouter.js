const { Router } = require('express');

const router = Router();

const {
  // getAllProducts,
  // getProductById,
  addSales,
  // updateProduct,
  // deleteProduct,

} = require('../Controllers/salesController');

// router.get('/', getAllProducts);

// router.get('/:id', getProductById);

router.post('/', addSales);

// router.put('/:id', updateProduct);

// router.delete('/:id', deleteProduct);

module.exports = router;