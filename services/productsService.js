const productModel = require('../models/productsModel');
const productsMidd = require('../middlewares/productsMidd');
const errorMsg = require('../returnMsg');

const create = async (name, quantity) => {
  const isNewProduct = await productsMidd.findDuplicated(name);

  if (!productsMidd.validateName(name)) return errorMsg.validateNameMsg;
  if (!productsMidd.validateQuantityType(quantity)) return errorMsg.invalidQtdTypeMsg;
  if (!productsMidd.validateQuantity(quantity)) return errorMsg.invalidQtdNumberMsg;
  if (!isNewProduct) return errorMsg.duplicatedProductMsg;

  const result = await productModel.create(name, quantity);
  return result;
};

const getAll = async () => {
  const result = await productModel.getAll();
  return { products: result };
};

const getById = async (id) => {
  const result = await productModel.getById(id);

  if (!result) return errorMsg.invalidIdFormat;
  return result;
};

const update = async (id, name, quantity) => {
  if (!productsMidd.validateName(name)) return errorMsg.validateNameMsg;
  if (!productsMidd.validateQuantityType(quantity)) return errorMsg.invalidQtdTypeMsg;
  if (!productsMidd.validateQuantity(quantity)) return errorMsg.invalidQtdNumberMsg;
  const result = await productModel.update(id, name, quantity);
  return result;
};

const remove = async (id) => {
  const result = await productModel.remove(id);

  if (!result) return errorMsg.invalidIdFormat;
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
