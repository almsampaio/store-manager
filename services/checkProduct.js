const errors = require('./errors');
const productModel = require('../models/productModel');
// const https = require('./HttpsStatus');

const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkProduct = (name, quantity) => {
  if (name.length < NAME_LENGTH) {
   return {
    err: { code: 'invalid_data', message: errors.NAME }, error: 422 };
  }
  if (quantity <= INVALID_QUANTITY) {
    return { err: { code: 'invalid_data', message: errors.QUANTITY }, error: 422 };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: errors.TYPE_NUMBER }, error: 422 };
  }
  return false;
};

const addProduct = async (name, quantity) => {
  const check = checkProduct(name, quantity);
  if (check) return check;
  const insertedProduct = await productModel.create(name, quantity);

  if (insertedProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return insertedProduct;
};

const getAll = async () => {
  const allProducts = await productModel.getAll();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  return product;
};

const update = async (id, name, quantity) => {
  const check = checkProduct(name, quantity);
  if (check) return check;
  const updateProduct = await productModel.update(id, name, quantity);
  if (updateProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return updateProduct;
};

const updateOnSale = async (id, name, quantity) => {
  // const check = checkProduct(name, quantity);
  // if (check) return check;
  const updateProduct = await productModel.update(id, name, quantity);
  if (updateProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return updateProduct;
};

const drop = async (id) => {
  const deleteProduct = await productModel.drop(id);
  if (deleteProduct === false) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' }, error: 422 };
}
  return deleteProduct;
};

module.exports = {
  addProduct,
  getAll,
  getProductById,
  update,
  drop,
  updateOnSale,
};
