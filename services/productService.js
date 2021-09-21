const Product = require('../models/Product');
const { errors, validData } = require('./validations');

const alreadyExists = async (productName) => {
  const productByName = await Product.findByName(productName);

  if (productByName) return true;

  return false;
};

exports.create = async ({ name, quantity }) => {
  const dataValid = validData(name, quantity);
  if (!dataValid.isValid) return dataValid;

  if (await alreadyExists(name)) { 
    return { message: errors.alreadyExists, code: 'invalid_data' };
  } 

  const product = await Product.createProduct({ name, quantity });

  return { product };
};

exports.getAll = async () => {
  const products = Product.getAll();

  return products;
};

exports.getById = async (id) => {
  const product = await Product.getById(id);

  if (product === null) {
    return { message: errors.invalidId, code: 'invalid_data' }; 
  }

  return { product };
};

exports.update = async ({ id, name, quantity }) => {
  const dataValid = validData(name, quantity);
    if (!dataValid.isValid) return dataValid;

  const product = await Product.updateProduct({ id, name, quantity });

  if (product === null) {
    return { message: errors.invalidId, code: 'invalid_data' }; 
  }

  return { product };
};

exports.delete = async (id) => {
  const deletedProduct = await Product.deleteProduct(id);

  if (!deletedProduct) {
    return { message: errors.invalidId, code: 'invalid_data' }; 
  }

  return deletedProduct;
};

exports.verifyQty = async (id, quantity) => {
  const product = await Product.getById(id);
  if ((product.quantity - quantity) < 0) {
    return false;
  }

  return true;
};

exports.updateQtyById = async (id, quantity) => {
  const product = await Product.updateProductQuantity({ id, quantity });

  if (product === null) {
    return { message: errors.invalidId, code: 'invalid_data' }; 
  }

  return { product };
};
