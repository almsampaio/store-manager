const productModel = require('../models/products');

const builtError = (code, codeType, mesage) => ({ code, codeType, mesage });

const addNew = async (newProductObj) => {
  const productExists = await productModel.getByName(newProductObj.name);
  if (productExists) throw builtError(422, 'Invalid_data', 'Product already exists');

  const { _id } = await productModel.addNew(newProductObj);
  return { _id };
};

module.exports = {
  addNew,
  builtError,
};
