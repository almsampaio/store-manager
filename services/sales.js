const { createSale, findSales, findSalesById } = require('../models/sales');
const StatusCodes = require('../utils/httpStatusCodes');

const insertSales = async (sales) => {
  const salesObject = { itensSold: [] };
  sales.forEach(async (sale) => {
    salesObject.itensSold.push(sale);
  });
  const response = await createSale(salesObject);
  return response;
};

const getSales = async () => findSales();

const getSaleById = async (id) => {
  const sale = await findSalesById(id);
  if (!sale) {
    return ({
      err: {
        statusCode: StatusCodes.notFound,
        code: 'invalid_data',
        message: 'Sale not found',
      },
    });
  }
  return sale;
};

module.exports = { insertSales, getSales, getSaleById };