const { Router } = require('express');

const router = Router();

const {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  deleteSale,

} = require('../Controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleById);

router.post('/', addSales);

router.put('/:id', updateSale);

router.delete('/:id', deleteSale);

module.exports = router;