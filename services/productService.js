const productModel = require('../models/productModels');

const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_CREATED = 201;

const PRODUCT_EXISTS = 'Product already exists';
const WRONG_ID_FORMAT = 'Wrong id format';

const create = async (name, quantity) => {
  const findByName = await productModel.getByName(name);
  const createdProduct = await productModel.create(name, quantity);

  if (findByName) return { status: HTTP_UNPROCESSABLE_ENTITY, message: PRODUCT_EXISTS };

  return { status: HTTP_CREATED, data: createdProduct };
};

const getAll = async () => {
  const itens = await productModel.getAll();

  return { products: itens };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { status: HTTP_UNPROCESSABLE_ENTITY, message: WRONG_ID_FORMAT };

  return { data: product };  
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.updateProduct(id, name, quantity);
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
};
