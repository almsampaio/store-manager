const productModel = require('../models/products');

const builtError = (code, codeType, message) => ({ code, codeType, message });

const addNew = async (newProductObj) => {
  const findByName = await productModel.getByName(newProductObj.name);
  if (findByName) return builtError(422, 'invalid_data', 'Product already exists');

  const newProduct = await productModel.addNew(newProductObj);
  return newProduct;
};

module.exports = {
  addNew,
  builtError,
};
