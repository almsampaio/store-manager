const salesModel = require('../models/salesModel');
const salesMidd = require('../middlewares/salesMidd');
const errorMsg = require('../returnMsg');

const getById = async (id) => {
  const validId = salesMidd.validateOneId(id);
  if (!validId) return errorMsg.saleNotFound;
  const result = await salesModel.getById(id);
  if (!result) return errorMsg.saleNotFound;
  return result;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const create = async (sale) => {
  const validIds = await salesMidd.validateAllIds(sale);
  const validQtd = await salesMidd.validateAllQtd(sale);
  if (!validIds || !validQtd) return errorMsg.invalidQtdSale;
  const result = await salesModel.create(sale);
  return result;
};

const update = async (id, prodId, qtd) => {
  const validSaleId = await salesMidd.validateOneId(id);
  if (!validSaleId) return errorMsg.saleNotFound;
  const validQtd = await salesMidd.validateAllQtd([{ quantity: qtd }]);
  if (!validQtd) return errorMsg.invalidQtdSale;
  const result = await salesModel.update(id, prodId, qtd);
  return result;
};

const remove = async (id) => {
  const validId = await salesMidd.validateOneId(id);
  if (!validId) return errorMsg.saleIdInvalid;
  const sale = await getById(id);
  if (validId && sale === null) return null;
  await salesModel.remove(id);
  return sale;
};

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};
