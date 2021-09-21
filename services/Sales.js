const { StatusCodes } = require('http-status-codes');
const Sales = require('../models/Sales');
const Products = require('../models/Products');

const create = async (itensSold) => {
  const { productId } = itensSold[0];
  const checkProduct = await Products.getById(productId);

  if (!checkProduct) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Wrong product ID or invalid quantity' };
  }

  const newSale = await Sales.create(itensSold);
  return { status: StatusCodes.OK, data: newSale };
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return { status: StatusCodes.OK, data: sales };
};

const getById = async (id) => {
  const sale = await Sales.getById(id);

  if (!sale) {
    return { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
  }

  return { status: StatusCodes.OK, data: sale };
};

const update = async (id, itensSold) => {
  const sale = await Sales.update(id, itensSold);
  return { status: StatusCodes.OK, data: sale };
};

const remove = async (id) => {
  const checkSale = await Sales.getById(id);
  const sale = await Sales.remove(id);

  if (!checkSale) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'Wrong sale ID format' };
  }

  return { status: StatusCodes.OK, data: sale };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
