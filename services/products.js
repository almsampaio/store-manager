const productsModel = require('../models/products');

const checkNameLength = (name) => {
  if (name.length < 5) return { message: '"name" length must be at least 5 characters long' };
};

const checkNameExists = async (name) => {
  const findProductWithTheName = await productsModel.getProductByName(name);

  if (findProductWithTheName) return { message: 'Product already exists' };
};

const validQuantity = (quantity) => {
  if (quantity <= 0) return { message: '"quantity" must be larger than or equal to 1' };
  if (typeof quantity !== 'number') return { message: '"quantity" must be a number' };

  return false;
};

const validId = (id) => {
  if (id.length !== 24) return { message: 'Wrong id format' };

  return false;
};

const createProduct = async (name, quantity) => {
  const invalidLength = checkNameLength(name);
  if (invalidLength) return invalidLength;

  const invalidName = await checkNameExists(name);
  if (invalidName) return invalidName;

  const invalidQuantity = await validQuantity(quantity);
  if (invalidQuantity) return invalidQuantity;

  const product = await productsModel.createProduct(name, quantity);

  return product;
};

const getProductById = async (id) => {
  const invalidId = validId(id);

  if (invalidId) return invalidId;

  const product = await productsModel.getProductById(id);

  if (!product) return { message: 'Wrong id format' };

  return product;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const updateProduct = async (id, name, quantity) => {
  const invalidId = validId(id);
  if (invalidId) return invalidId;

  const invalidLength = await checkNameLength(name);
  if (invalidLength) return invalidLength;

  const invalidQuantity = validQuantity(quantity);
  if (invalidQuantity) return invalidQuantity;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
};
