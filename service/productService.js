const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const isExist = await productModel.getByName(name);
  if (isExist !== null) {
    return {
    err: { code: 'invalid_data', message: 'Product already exists' } }; 
}
  const product = await productModel.create(name, quantity);
  return { data: product };
};

module.exports = {
  create,
};
