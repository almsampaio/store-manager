const salesService = require('../services/salesService');

const VALID_NAME_STATUS_200 = 200;
const INVALID_NAME_STATUS_422 = 422;
const INVALID_REQUEST_422 = 422;
const VALID_REQUEST_200 = 200;

const printMessageOfError422 = (res, product, statusNumber) => {
  const MESSAGE_ERROR_JSON = { err: product.err };
    if (product.status === 422) {
      return res.status(statusNumber).json(MESSAGE_ERROR_JSON);
    }
};

const createSale = async (req, res) => {
  const saleArray = req.body;
  const sale = await salesService.createSale(saleArray);
  if (sale.err) {
    const MESSAGE_ERROR_JSON = { err: sale.err };
    if (sale.status === 422) {
      return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
    }
  }
  return res.status(VALID_NAME_STATUS_200).json(sale);
 };

const getSales = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.getSales(id);

  if (sales.err) {
    return printMessageOfError422(res, sales, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(sales);
 };

 const putSales = async (req, res) => {
  // const { id } = req.params;
  // const saleArray = req.body;
  // const sale = await salesService.putSales(saleArray, id);
  // if (sale.err) {
  //   const MESSAGE_ERROR_JSON = { err: sale.err };
  //   if (sale.status === 422) {
  //     return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
  //   }
  // }
  // return res.status(VALID_NAME_STATUS_200).json(sale);
};

 module.exports = {
   createSale,
   getSales,
   putSales,
 };
