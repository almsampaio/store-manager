const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.addSales);
router.get('/:id', salesController.getSalesById);
router.put('/:id', salesController.updateSales);
router.delete('/:id', salesController.deleteSales);

module.exports = router;
