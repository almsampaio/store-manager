const salesModel = require('../models/salesModel');
const errors = require('../utils/errors');

const verifyQuantity = (arrayItens) => {
  if (arrayItens.every((item) => 
    typeof item.quantity !== 'number'
    || item.quantity < 1
    || !item.quantity)) throw errors.wrongIdOrQuantity;
  };
  
const createSales = async (itens) => {
  verifyQuantity(itens);
  const result = await salesModel.createSales(itens);
  return result;
};

const getOne = async (id) => {
  const result = await salesModel.getOne(id);
  if (!result) return errors.saleNotFound;
  return result;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const updateOne = async (id, saleContent) => {
  verifyQuantity(saleContent);
  const result = await salesModel.updateOne(id, saleContent);
  if (!result) return errors.wrongIdOrQuantity;
  return result;
};

const delOne = async (id) => {
  const result = await salesModel.delOne(id);
  if (!result || result.status) throw errors.wrongSaleIdFormat;
  return result;
};

module.exports = {
  createSales,
  getOne,
  getAll,
  updateOne,
  delOne,
};
