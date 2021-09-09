const Products = require('../models/Products');

const getAll = async () => {
  const products = await Products.getAll();
  return { status: 200, data: products };
};

const getById = async (id) => {
  const product = await Products.getById(id);
  const message = 'Wrong id format';

  if (!product) return { status: 422, data: message }
  return { status: 200, data: product };
};

const create = async (name, quantity) => {
  const findProduct = await Products.findByNameAndQuantity(name, quantity);
  const message = 'Product already exists';

  if (findProduct) return { status: 422, data: message };
  const product = await Products.create(name, quantity);
  return { status: 201, data: product };
}

const remove = async (id) => {
  const product = await Products.getById(id);
  const message = 'Wrong id format';

  if (!product) return { status: 422, data: message };
  const result = await Products.remove(id);
  return { status: 204, data: result };
}

const update = async (id, name, quantity) => {
  const product = await Products.update(id, name, quantity);
  return { status: 202, data: product };
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};