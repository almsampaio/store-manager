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

module.exports = {
  create,
};
