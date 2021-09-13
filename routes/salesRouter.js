const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { saleVerifier, saleIdCheck } = require('../middlewares/salesValidation');

const router = Router();

router.post('/', saleVerifier, salesController.postNewSale);
router.get('/:id', saleIdCheck, salesController.getById);
router.get('/', salesController.getAllSales);
router.put('/:id', saleVerifier, salesController.updateOneSale);

module.exports = router;
