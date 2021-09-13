const productModel = require('../models/ProductsModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;

const create = async (name, quantity) => {
  const findByName = await productModel.getByName(name);
  const createdProduct = await productModel.create(name, quantity);

  if (findByName) return { status: HTTP_UNPROCESSABLE_STATUS, message: 'Product already exists' };

  return { status: HTTP_CREATED_STATUS, data: createdProduct };
};

const getAll = async () => {
  const itens = await productModel.getAll();
  return { products: itens };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { status: HTTP_UNPROCESSABLE_STATUS, message: 'Wrong id format' };

  return { data: product };  
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.updateProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const product = await productModel.getById(id);
  const deletedProduct = await productModel.deleteProduct(id);

  if (!product) return { status: HTTP_UNPROCESSABLE_STATUS, message: 'Wrong id format' };

  return { status: HTTP_OK_STATUS, result: deletedProduct };
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
