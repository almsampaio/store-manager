const { Router } = require('express');

const router = Router();

const {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  // deleteProduct,

} = require('../Controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleById);

router.post('/', addSales);

router.put('/:id', updateSale);

// router.delete('/:id', deleteProduct);

module.exports = router;