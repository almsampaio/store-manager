const express = require('express');
const salesController = require('../controllers/Sales');
const { validateSaleId } = require('../middlewares/ProductsIds');
const validateSale = require('../middlewares/Sales');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', validateSaleId, salesController.getById);
router.post('/', validateSale.add, salesController.insert);
router.put('/:id', validateSale.add, salesController.update);
router.delete('/:id', salesController.remove);

module.exports = router;
