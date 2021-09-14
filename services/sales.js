const salesModel = require('../models/sales');
const { builtError } = require('./products');
const productsModel = require('../models/products');

const updateProductsBySales = async (sales) => {
  const productInfo = sales.map(({ productId }) => productsModel.getById(productId));
  const arrayInfo = await Promise.all(productInfo).then((res) => res);
  const booleanArray = arrayInfo.map(({ quantity }, index) => quantity > sales[index].quantity);

  if (booleanArray.includes(false)) return false;
  const updatesArray = sales.map(
    ({ productId, quantity }) => productsModel.updateById(productId, (0 - quantity)),
  );
  await Promise.all(updatesArray).then((res) => res);
  return true;
};

const updateProductsByDelete = async (sales) => {
  await sales.forEach(async ({ productId, quantity }) => {
    await productsModel.updateById(productId, quantity);
  });
};

const addNew = async (payload) => {
  const shouldContinue = await updateProductsBySales(payload);
  if (!shouldContinue) {
    return builtError(404, 'stock_problem', 'Such amount is not permitted to sell');
  }
  const results = await salesModel.addNew(payload);
  return results;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.sales.length
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const getById = async (id) => {
  const result = await salesModel.getById({ id });
  return !result.message && result.itensSold
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const updateOne = async (payload, id) => {
  const result = await salesModel.updateOne(payload, id);
  return result.itensSold
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const deleteOne = async (id) => {
  const { itensSold } = await salesModel.getById({ id });
  await updateProductsByDelete(itensSold);
  const result = await salesModel.deleteOne(id);
  return result.itensSold
    ? result
    : builtError(422, 'invalid_data', 'Wrong sale ID format');
};

module.exports = {
  addNew,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
