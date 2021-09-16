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

module.exports = {
  createSales,
};
