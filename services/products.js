const productModel = require('../models/products');

const builtError = (code, codeType, message) => ({ code, codeType, message });

const addNew = async (newProductObj) => {
  const findByName = await productModel.getByName(newProductObj.name);
  if (findByName) return builtError(422, 'invalid_data', 'Product already exists');

  const newProduct = await productModel.addNew(newProductObj);
  return newProduct;
};

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const result = await productModel.getById(id);

  if (result.message && result.message === 'id invalido') {
    return builtError(422, 'invalid_data', 'Wrong id format');
  }
  if (result.message && result.message === 'nao encontrado') {
    return builtError(404, 'Not found', 'Any element found with this id');
  }
  return result;
};

module.exports = {
  addNew,
  builtError,
  getAll,
  getById,
};
