const errors = require('./errors');
const salesModel = require('../models/salesModel');
const productService = require('./checkProduct');
// const https = require('./HttpsStatus');

// const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkSales = (arr) => {
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

const updateProductOnSale = async (sale) => {
const [{ productId, quantity }] = sale;
// if (!productId) return;
const product = await productService.getProductById(productId);
const soldQuantyti = product.quantity - quantity;
await productService.updateOnSale(productId, product.name, soldQuantyti);
};

const addSales = async (arr) => {
  const check = checkSales(arr);
  if (check) return check;
  const insertedSale = await salesModel.create(arr);
  await updateProductOnSale(arr);

  return insertedSale;
};

const getAll = async () => {
  const allProducts = await salesModel.getAll();
  return allProducts;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const updateProductOnDropSale = async (id) => {
  const product = await getSaleById(id);
  if (!product) return;
  const { itensSold: [{ productId, quantity }] } = product;

  const productSer = await productService.getProductById(productId);

  const soldQuantyti = quantity + productSer.quantity;
 await productService.updateOnSale(productId, product.name, soldQuantyti);
};

const update = async (id, arr) => {
  const check = checkSales(arr);
  if (check) return check;
  const updateProduct = await salesModel.update(id, arr);
  if (updateProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return updateProduct;
};

const drop = async (id) => {
  await updateProductOnDropSale(id);
  const deleteSale = await salesModel.drop(id);

  if (deleteSale === false) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' }, error: 422 };
}
  return deleteSale;
};

module.exports = {
  addSales,
  getAll,
  getSaleById,
  update,
  drop,
};
