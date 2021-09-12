const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { saleVerifier } = require('../middlewares/salesValidation');

const router = Router();

router.post('/', saleVerifier, salesController.postNewSale);

module.exports = router;
