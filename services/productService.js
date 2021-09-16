const productModel = require('../models/productModels');

const HTTP_UNPROCESSABLE_ENTITY = 422;
const PRODUCT_EXISTS = 'Product already exists';

const create = async (name, quantity) => {
  const findByName = await productModel.getByName(name);
  const createdProduct = await productModel.create(name, quantity);

  if (findByName) return { status: HTTP_UNPROCESSABLE_ENTITY, message: PRODUCT_EXISTS };

  return { status: 201, data: createdProduct };
};

module.exports = {
  create,
};
