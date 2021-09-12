const models = require('../models');
const {
  ERROR_ID_OR_QTD,
  ERROR_SALE_NOT_FOUND,
  ERROR_SALE_ID,
 } = require('../helpers');
const {
  validateQuantity,
  validateTypeNumber,
  validateId,
} = require('../middlewares');

// REQUISITO 5 ________________________________________________________________________//

const createSale = async (sale) => {
  const { productId, quantity } = sale[0];
  const isValidId = await models.productsModel.getProductById(productId);
  if (!isValidId) return ERROR_ID_OR_QTD;
  if (!validateQuantity(quantity) || !validateTypeNumber(quantity)
  || !validateTypeNumber(quantity)) return ERROR_ID_OR_QTD;
  const addSale = await models.salesModel.createSale(sale);
  return addSale;
};

// REQUISITO 6 ________________________________________________________________________//

const getAllSales = async () => {
  const allSales = await models.salesModel.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  if (!validateId(id)) return ERROR_SALE_NOT_FOUND;

  const sales = await models.salesModel.getSaleById(id);
  if (!sales) return ERROR_SALE_NOT_FOUND;
  return sales;
};

// REQUISITO 7 ________________________________________________________________________//

const updateSale = async (id, sales) => {
  const { quantity } = sales[0];
  if (!validateId(id)) return ERROR_SALE_NOT_FOUND;
  if (!validateTypeNumber(quantity) || !validateQuantity(quantity)) return ERROR_ID_OR_QTD;

  const itensSold = [];
  const { _id, itensSold: sold } = await models.salesModel.updateSales(id, sales);
  itensSold.push(sold);
  const newSale = { _id, itensSold };
  return newSale;
};

// REQUISITO 8 ________________________________________________________________________//

const deleteSales = async (id) => {
  if (!validateId(id)) return ERROR_SALE_ID;
  const deleteExist = await models.salesModel.getSaleById(id);
  if (!deleteExist) return ERROR_SALE_ID;
  const { deleteId, salesDelete } = await models.salesModel.deleteSales(id);
  if (!salesDelete) return deleteId;
};

// ____________________________________________________________________________________//

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSales,
};
