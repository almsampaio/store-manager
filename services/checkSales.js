const errors = require('./errors');
const productModel = require('../models/productModel');
// const https = require('./HttpsStatus');

const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkSales = (arr) => {
  if (arr.map((item) => item.name < NAME_LENGTH)) {
   return {
    err: { code: 'invalid_data', message: errors.NAME }, error: 422 };
  }
  if (arr.map((item) => item.quantity <= INVALID_QUANTITY)) {
    return { err: { code: 'invalid_data', message: errors.QUANTITY }, error: 422 };
  }
  if (arr.map((item) => typeof item.quantity !== 'number')) {
    return { err: { code: 'invalid_data', message: errors.TYPE_NUMBER }, error: 422 };
  }
  return false;
};

const addSale = async (arr) => {
  const check = checkSales(arr);
  if (check) return check;

  const insertedProduct = await productModel.create(arr);

  // if (insertedProduct === false) {
  //   return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
// }
  return insertedProduct;
};

// const getAll = async () => {
//   const allProducts = await productModel.getAll();
//   return allProducts;
// };

// const getProductById = async (id) => {
//   const product = await productModel.getProductById(id);
//   return product;
// };

// const update = async (id, name, quantity) => {
//   const check = checkSales(name, quantity);
//   if (check) return check;
//   const updateProduct = await productModel.update(id, name, quantity);
//   if (updateProduct === false) {
//     return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
// }
//   return updateProduct;
// };

// const drop = async (id) => {
//   const deleteProduct = await productModel.drop(id);
//   if (deleteProduct === false) {
//     return { err: { code: 'invalid_data', message: 'Wrong id format' }, error: 422 };
// }
//   return deleteProduct;
// };

module.exports = {
  addSale,
  // getAll,
  // getProductById,
  // update,
  // drop,
};
