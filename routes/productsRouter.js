const { Router } = require('express');
const { postNewProduct } = require('../controllers/productController');
const { productVerifier } = require('../middlewares/productsValidation');

const router = Router();

router.post('/', productVerifier, postNewProduct);

module.exports = router;