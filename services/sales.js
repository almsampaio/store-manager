const { ObjectId } = require('mongodb');
const salesModel = require('../models/sales');
const StatusCodes = require('../utils/httpStatusCodes');

const insertSales = async (sales) => {
  const salesObject = { itensSold: [] };
  sales.forEach(async (sale) => {
    salesObject.itensSold.push(sale);
  });
  const response = await salesModel.createSale(salesObject);
  return response;
};

const getSales = async () => salesModel.findSales();

const getSaleById = async (id) => {
  const err = {
    err: {
      statusCode: StatusCodes.notFound,
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  if (!ObjectId.isValid(id)) return err;

  const sale = await salesModel.findSalesById(id);
  if (!sale) return err;

  return sale;
};

const updateSale = async (id, sales) => salesModel.findSaleAndUpdate(id, sales);

const deleteSale = async (id) => salesModel.findSaleAndDelete(id);

module.exports = {
  insertSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};