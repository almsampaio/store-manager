const Model = require('../models');
const { errorName, errorQuantity, 
  errorTypeQuantity, errorAlreadyExists, errorId } = require('../utils/objectError');

const validateName = (name) => {
  const nameLength = 5;

  return name.length < nameLength;
};

const validateQuantity = (quantity) => quantity >= 1;

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const validateId = (id) => {
  const idLength = 24;

  return id.length < idLength;
};

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

const getProducts = async () => {
  const products = await Model.products.getProducts();
  return products;
};

const getProductById = async (id) => {
  if (!validateId(id)) return errorId;

  const product = await Model.products.productById(id);

  if (!product) return errorId;

  return product;
};

const updateProduct = async (id, productUpdated) => {
  if (!validateId(id)) return errorId;

  const { name, quantity } = productUpdated;

  if (!validateName(name)) return errorName;

  if (!validateQuantity(quantity)) return errorTypeQuantity;

  if (!validateQuantity(quantity)) return errorQuantity;

  const product = await Model.products.updateProduct(id, { name, quantity });

  return (product.matchedCount === 1) ? { _id: id, name, quantity } : errorId;
};

module.exports = {
  productAdditional,
  getProducts,
  getProductById,
  updateProduct,
};