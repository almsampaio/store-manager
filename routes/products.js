const express = require('express');
const bodyParser = require('body-parser');

const Products = require('../controllers/Products');

const router = express.Router();

router.use(bodyParser.json());

const {
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
  isValidId,
} = require('../middlewares/productsValidations');

const postValidationsArray = [
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
];

const putValidationsArray = [
  nameLengthValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
];

router.get('/', Products.getProducts);
router.get('/:id', isValidId, Products.getProductById);

router.post('/', postValidationsArray, Products.createProduct);

router.put('/:id', isValidId, putValidationsArray, Products.editProduct);

router.delete('/:id', isValidId, Products.deleteProduct);

module.exports = router;
