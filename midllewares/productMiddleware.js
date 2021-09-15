const productService = require('../services/productService');
const messageErro = require('../utils/errosMsg');

const validateName = (name, products) => {
  if (name.length < 5) return messageErro.nameLength;

  const sameName = products.some((p) => p.name === name);

  if (sameName) return messageErro.nameExist;
  return false;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) return messageErro.quantityMin;
  if (typeof quantity === 'string') return messageErro.quantityNotNumber;
  return false;
};

const validate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const products = await productService.getAllProducts();
  const isNameValid = validateName(name, products);
  const isQuantitvalid = validateQuantity(quantity);
  if (!isNameValid && !isQuantitvalid) return next();
  res.status(422).json(isNameValid || isQuantitvalid);
};

module.exports = { validate/* , messageErro */ };
