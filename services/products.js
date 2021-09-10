const productModel = require('../models/products');

const builtError = (code, codeType, mesage) => ({ code, codeType, mesage });

const addNew = async (newProductObj) => {
  const findByName = await productModel.getByName(newProductObj.name);
  if (!findByName) throw builtError(422, 'Invalid_data', 'Product already exists');

  const newProduct = await productModel.addNew(newProductObj);
  return newProduct;
};

module.exports = {
  addNew,
  builtError,
};
