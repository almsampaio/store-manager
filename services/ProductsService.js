const productModel = require('../models/ProductsModel');

const create = async (name, quantity) => {
  const findByName = await productModel.getByName(name);
  const createdProduct = await productModel.create(name, quantity);

  if (findByName) return { status: 422, message: 'Product already exists' };

  return { status: 201, data: createdProduct };
};

const getAll = async () => {
  const itens = await productModel.getAll();
  return { products: itens };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { status: 422, message: 'Wrong id format' };

  return { data: product };  
};

module.exports = {
  create,
  getAll,
  getById,
};
