const errors = require('./errors');
const salesModel = require('../models/salesModel');
// const https = require('./HttpsStatus');

// const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkSales = (arr) => {
  // if (arr.map((item) => item.name < NAME_LENGTH)) {
  //  return {
  //   err: { code: 'invalid_data', message: errors.NAME }, error: 422 };
  // }
  const sizeCheck = arr.find((item) => item.quantity <= INVALID_QUANTITY);
  const typeCheck = arr.find((item) => typeof item.quantity !== 'number');

  if (sizeCheck) {
    return { err: { code: 'invalid_data', message: errors.S_QUANTITY }, error: 422 };
  }
  if (typeCheck) {
    return { err: { code: 'invalid_data', message: errors.S_QUANTITY }, error: 422 };
  }
  return false;
};

const addSales = async (arr) => {
  const check = checkSales(arr);
  if (check) return check;

  const insertedSale = await salesModel.create(arr);

  // if (insertedProduct === false) {
  //   return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
// }
  return insertedSale;
};

// const getAll = async () => {
//   const allProducts = await salesModel.getAll();
//   return allProducts;
// };

// const getProductById = async (id) => {
//   const product = await salesModel.getProductById(id);
//   return product;
// };

// const update = async (id, name, quantity) => {
//   const check = checkSales(name, quantity);
//   if (check) return check;
//   const updateProduct = await salesModel.update(id, name, quantity);
//   if (updateProduct === false) {
//     return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
// }
//   return updateProduct;
// };

// const drop = async (id) => {
//   const deleteProduct = await salesModel.drop(id);
//   if (deleteProduct === false) {
//     return { err: { code: 'invalid_data', message: 'Wrong id format' }, error: 422 };
// }
//   return deleteProduct;
// };

module.exports = {
  addSales,
  // getAll,
  // getProductById,
  // update,
  // drop,
};
