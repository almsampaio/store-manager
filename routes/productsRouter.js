const { Router } = require('express');
const { postNewProduct, getById, getAllProducts } = require('../controllers/productController');
const { productVerifier, idValidator } = require('../middlewares/productsValidation');

const router = Router();

router.post('/', productVerifier, postNewProduct);
router.get('/:id', idValidator, getById);
router.get('/', getAllProducts);

module.exports = router;