const salesModels = require('../models/sales');
const salesSchemas = require('../schemas/salesSchemas');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const findById = async (id) => {
  const sale = await salesModels.findById(id);
  return sale;
};

const create = async (salesArray) => {
  const validQuantity = salesSchemas.validQuantity(salesArray);
  if (validQuantity) return validQuantity;

  const sales = await salesModels.create(salesArray);
  return sales;
};

const update = async (id, salesArray) => {
  const validQuantity = salesSchemas.invalidQuantity(salesArray);
  if (validQuantity) return validQuantity;

  const isNotNumber = salesSchemas.isNotString(salesArray);
  if (isNotNumber) return isNotNumber;

  await salesModels.update(id, salesArray);

  return { _id: id, itensSold: salesArray };
};

const exclude = async (id) => {
  const excludeSales = await salesModels.exclude(id);
  
  const isNotIdExists = salesSchemas.isIdExists(excludeSales);
  if (isNotIdExists) return isNotIdExists;
  
  return excludeSales;
};

module.exports = {
  create,
  findById,
  getAll,
  update,
  exclude,
};