const productModel = require('../models/productsModel');
const productsMidd = require('../middlewares/productsMidd');
const errorMsg = require('../returnMsg');

const create = async (name, quantity) => {
  const newProduct = await productsMidd.findDuplicated(name);

  if (!productsMidd.validateName(name)) return errorMsg.validateNameMsg;
  if (!productsMidd.validateQuantityType(quantity)) return errorMsg.invalidQtdTypeMsg;
  if (!productsMidd.validateQuantity(quantity)) return errorMsg.invalidQtdNumberMsg;
  if (newProduct.length > 0) return errorMsg.duplicatedProductMsg;

  const result = await productModel.create(name, quantity);
  return result;
};

module.exports = {
  create,
};
