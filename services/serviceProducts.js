const Model = require('../models/modelProducts');
const { errorName, errorQuantity, 
  errorTypeQuantity, errorAlreadyExists, errorId } = require('../utils/objectError');

const validateName = (name) => {
  const regexName = /^.{5,}$/;

  return regexName.test(name);
};

const validateQuantity = (quantity) => quantity >= 1;

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const validateId = (id) => {
  const regexId = /^.{24}$/;

  return regexId.test(id);
};

const productAdditional = async (dataProduct) => {
  const { name, quantity } = dataProduct;

  if (!validateName(name)) return errorName;

  if (!validateQuantity(quantity)) return errorQuantity;

  if (!validateTypeQuantity(quantity)) return errorTypeQuantity;

  const alreadyExists = await Model.productByName(name);

  if (alreadyExists) return errorAlreadyExists;

  const additionalProduct = await Model.productAdditional(dataProduct); 
  
  return additionalProduct;
};

const getProducts = async () => {
  const products = await Model.getProducts();
  return products;
};

const getProductById = async (id) => {
  if (!validateId(id)) return errorId;

  const product = await Model.productById(id);

  if (!product) return errorId;

  return product;
};

const validateAll = (id, { name, quantity }) => {
  if (!validateId(id)) return errorId;
  
  if (!validateName(name)) return errorName;

  if (!validateQuantity(quantity)) return errorTypeQuantity;

  if (!validateQuantity(quantity)) return errorQuantity;
};

const updateProduct = async (id, productUpdated) => {
  const { name, quantity } = productUpdated;

  validateAll();

  const product = await Model.updateProduct(id, { name, quantity });

  return (product.matchedCount === 1) ? { _id: id, name, quantity } : errorId;
};

const deleteProduct = async (id) => {
  if (!validateId(id)) return errorId;

  const productDeleted = await Model.productById(id);

  const product = await Model.deleteProduct(id);

  return (product.deletedCount === 1) ? productDeleted : errorId;
};

module.exports = {
  productAdditional,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};