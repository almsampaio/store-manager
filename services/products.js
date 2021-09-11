const productsModel = require('../models/products');

const validName = async (name) => {
  const findProductWithTheName = await productsModel.getProductByName(name);
  
  if (name.length < 5) return { message: '"name" length must be at least 5 characters long' };
  if (findProductWithTheName) return { message: 'Product already exists' };

  return false;
};

const validQuantity = (quantity) => {
  if (quantity <= 0) return { message: '"quantity" must be larger than or equal to 1' };
  if (typeof quantity !== 'number') return { message: '"quantity" must be a number' };

  return false;
};

const createProduct = async (name, quantity) => {
  const invalidName = await validName(name);
  const invalidQuantity = await validQuantity(quantity);

  if (invalidName) return invalidName;
  if (invalidQuantity) return invalidQuantity;

  const product = await productsModel.createProduct(name, quantity);

  return product;
};

module.exports = {
  createProduct,
};
