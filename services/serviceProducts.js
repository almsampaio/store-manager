const Model = require('../models');
const { errorName, errorQuantity, 
  errorTypeQuantity, errorAlreadyExists } = require('../utils/objectError');

const validateName = (name) => {
  const nameLength = 5;

  return name.length < nameLength;
};

const validateQuantity = (quantity) => quantity >= 1;

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const productAdditional = async (dataProduct) => {
  const { name, quantity } = dataProduct;

  if (!validateName(name)) return errorName;

  if (!validateQuantity(quantity)) return errorQuantity;

  if (!validateTypeQuantity(quantity)) return errorTypeQuantity;

  const alreadyExists = await Model.products.productByName(name);

  if (alreadyExists) return errorAlreadyExists;

  const additionalProduct = await Model.products.productAdditional(dataProduct); 
  
  return additionalProduct;
};

const getProducts = async () => await Model.products.getProducts();

module.exports = {
  productAdditional,
  getProducts,
};