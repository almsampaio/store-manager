const Products = require('../models/productsModel');

const getAll = async () => Products.getAll();

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return Products.create(name, quantity);
};

const findById = async (id) => {
  const product = await Products.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  create,
  findById,
};
