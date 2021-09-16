const salesModel = require('../models/salesModel');
const { salesValidations, saleValidationNotExist } = require('../validations/saleValidations');

const addSale = async (itensSold) => {
  const validations = salesValidations(itensSold);
  if (validations.message) return validations;
  
  const sales = await salesModel.addSale(itensSold);
  return { sales };
};

const listSales = async () => {
  const sales = await salesModel.listSales();
  return sales;
};

const listSaleId = async (id) => {
  const validations = await saleValidationNotExist(id);
  if (validations.message) return validations;

  const saleId = await salesModel.listSaleId(id);
  return { saleId };
};

module.exports = {
  addSale,
  listSales,
  listSaleId,
};
