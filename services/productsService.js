const Product = require('../models/productsModel');
const { stringLenght } = require('../validations/strings');
const { codes, messages } = require('../errors/messages');

const create = async (name, quantity) => {
  const existingProduct = await Product.findByName(name);

  return Product.create(name, quantity);
};

module.exports = {
  create,
};
