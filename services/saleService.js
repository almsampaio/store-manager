const saleModel = require('../models/saleModel');

const errorMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' },
  statusCode: 422 };

function checkIfSaleIsValid(product) {
  const { quantity } = product;
    return quantity <= 0 || typeof (quantity) !== 'number';
}

const createSale = async (productsSold) => {
  const createdSale = await saleModel.create(productsSold);
  return { createdSale };
};

const create = (productsSold) => {
  const isInvalid = productsSold.some(checkIfSaleIsValid);
  if (isInvalid) return errorMessage;
  return createSale(productsSold);
};

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

const updateSale = async (id, itensSold) => {
  const updatedSale = await saleModel.update(id, itensSold);
  return { updatedSale };
};

const update = async (id, itensSold) => {
  const isInvalid = itensSold.some(checkIfSaleIsValid);
  if (isInvalid) return errorMessage;
  return updateSale(id, itensSold);
};

const remove = async (id) => {
  await saleModel.remove(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
