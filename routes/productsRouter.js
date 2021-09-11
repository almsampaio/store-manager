const { Router } = require('express');
const {
  postNewProduct,
  getById,
  getAllProducts,
  updateOneProduct,
} = require('../controllers/productController');
const {
  productVerifier,
  idValidator,
  idExists,
} = require('../middlewares/productsValidation');

const fullValidation = [idValidator, idExists, productVerifier];
const router = Router();

router.post('/', productVerifier, postNewProduct);
router.get('/:id', idValidator, getById);
router.get('/', getAllProducts);
router.put('/:id', ...fullValidation, updateOneProduct);

module.exports = router;
