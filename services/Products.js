const { StatusCodes } = require('http-status-codes');
const Products = require('../models/Products');

const create = async (name, quantity) => {
  const checkProduct = await Products.getByName(name);

  if (checkProduct) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'Product already exists' };
  }

  const newProduct = await Products.create(name, quantity);
  return { status: StatusCodes.CREATED, data: newProduct };
};

const getAll = async () => {
  const products = await Products.getAll();
  return { status: StatusCodes.OK, data: products };
};

const getById = async (id) => {
  const product = await Products.getById(id);

  if (!product) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'Wrong id format' };
  }

  return { status: StatusCodes.OK, data: product };
};

const update = async (id, data) => {
  const product = await Products.update(id, data);
  return { status: StatusCodes.OK, data: product };
};

const remove = async (id) => {
  const checkProduct = await Products.getById(id);
  const product = await Products.remove(id);

  if (!checkProduct) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'Wrong id format' };
  }

  return { status: StatusCodes.OK, data: product };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
