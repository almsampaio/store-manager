const models = require('../models');
const { ERROR_ID_OR_QTD } = require('../helpers');
const { validateQuantity, validateTypeNumber } = require('../middlewares');

// REQUISITO 5 ________________________________________________________________________//

const createSale = async (sale) => {
  const { productId, quantity } = sale[0];
  const validateId = await models.productsModel.getProductById(productId);
  if (!validateId) return ERROR_ID_OR_QTD;
  if (!validateQuantity(quantity) || !validateTypeNumber(quantity)
  || !validateTypeNumber(quantity)) return ERROR_ID_OR_QTD;
  // if (!validateQuantity(quantity)) return ERROR_ID_OR_QTD;
  // if (!validateTypeNumber(quantity)) return ERROR_ID_OR_QTD;
  // if (!validateTypeNumber(quantity)) return ERROR_ID_OR_QTD;
  const addSale = await models.salesModel.createSale(sale);
  return addSale;
};

// ____________________________________________________________________________________//

module.exports = {
  createSale,
};
