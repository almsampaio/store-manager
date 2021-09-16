const ProductModel = require('../models/Product/ProductModel');
const ProductDao = require('../models/Product/ProductDao');

const listAll = async () => ProductDao.getAll();

const findById = async (id) => {
    const product = await ProductDao.findById(id);
    if (!product) throw new Error('Wrong id format');
    return product;
};

const productIsExists = async (name) => {
  const product = await ProductDao.findByName(name);
  return !!product;
};

const register = async (name, quantity) => {
  const isExists = await productIsExists(name);
  if (isExists) throw new Error('Product already exists');

  const product = new ProductModel(name, quantity);
  return ProductDao.create(product);
};

const update = async (id, name, quantity) => {
  const product = new ProductModel(name, quantity);
  return ProductDao.update(id, product);
};

module.exports = {
  listAll,
  findById,
  register,
  update,
};
