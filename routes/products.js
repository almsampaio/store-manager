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
} = require('../middlewares/validations');

const postValidationsArray = [
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
];

router.get('/', Products.getProducts);
router.get('/:id', isValidId, Products.getProductById);
router.post('/', postValidationsArray, Products.createProduct);

module.exports = router;
