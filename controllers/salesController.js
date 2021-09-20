const salesService = require('../services/salesService');

const VALID_NAME_STATUS_200 = 200;
const INVALID_NAME_STATUS_422 = 422;
const INVALID_REQUEST_422 = 422;
const INVALID_ID_SALE_404 = 404;
const VALID_REQUEST_200 = 200;

const printMessageOfError422 = (res, product, statusNumber) => {
  const MESSAGE_ERROR_JSON = { err: product.err };
    if (product.status === 422) {
      return res.status(statusNumber).json(MESSAGE_ERROR_JSON);
    }
};

const printMessageOfError404 = (res, product, statusNumber) => {
  const MESSAGE_ERROR_JSON = { err: product.err };
    if (product.status === 404) {
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

 const getAllSales = async (req, res) => {
  const sales = await salesService.getAllSales();

  if (sales.err) {
    return printMessageOfError422(res, sales, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(sales);
 };

 const getSalesById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.getSalesById(id);

  if (sales.err) {
    return printMessageOfError404(res, sales, INVALID_ID_SALE_404);
  }

  return res.status(VALID_REQUEST_200).json(sales);
 };

 const putSales = async (req, res) => {
  const { id } = req.params;
  const saleArray = req.body;
  const sale = await salesService.putSales(saleArray, id);
  if (sale.err) {
    const MESSAGE_ERROR_JSON = { err: sale.err };
    if (sale.status === 422) {
      return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
    }
  }
  return res.status(VALID_NAME_STATUS_200).json(sale);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSales(id);
  console.log('saaaaale delete controller', sale);
  if (sale.err) {
    const MESSAGE_ERROR_JSON = { err: sale.err };
    if (sale.status === 422) {
      return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
    }
  }
  return res.status(VALID_NAME_STATUS_200).json(sale);
};

 module.exports = {
   createSale,
   // getSales,

   getAllSales,
   getSalesById,

   putSales,
   deleteSales,
 };
