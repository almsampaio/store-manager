const salesModel = require('../models/salesModel');
const salesMidd = require('../middlewares/salesMidd');
const errorMsg = require('../returnMsg');

const getById = async (id) => {
  const validId = await salesMidd.validateOneId(id);
  if (!validId) return errorMsg.saleNotFound;
  const result = await salesModel.getById(id);
  return result;
};

const create = async (sale) => {
  const validIds = await salesMidd.validateAllIds(sale);
  const validQtd = await salesMidd.validateAllQtd(sale);
  if (!validIds || !validQtd) return errorMsg.invalidQtdSale;
  const result = await salesModel.create(sale);
  return result;
};

module.exports = {
  getById,
  create,
};
