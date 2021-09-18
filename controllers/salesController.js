// conecta controller com o service
const salesService = require('../services/salesService');

// conecta controller com o model
const salesModel = require('../models/salesModel');

const lessEqualThan0 = 'Wrong product ID or invalid quantity';
const notNumber = 'Wrong product ID or invalid quantity';
const notFound = 'Sale not found';
const saleNotDeleted = 'Wrong sale ID format';

const postSale = async (request, response) => {
  const soldItems = request.body;
  const sale = await salesService.postSale(soldItems);
  if (sale === 'Not a Number') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notNumber } });
  }
  if (sale === 'quantity less or equal than 0') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessEqualThan0 } });
  }
  return response.status(200).json(sale);
};

const getAllSales = async (_request, response) => {
  const allSales = await salesModel.getAllSales();
  return response.status(200).json(allSales);
};

const getSalesByID = async (request, response) => {
  const { id } = request.params;
  const saleByID = await salesService.getSalesByID(id);
  if (saleByID === 'Sale not Found') {
    return response.status(404).json({ err: { code: 'not_found', message: notFound } });
  }

  return response.status(200).json(saleByID);
};

const updateSalesByID = async (request, response) => {
  const { id } = request.params;
  const toChangeSales = request.body;
  const updateSales = await salesService.updateSalesByID(id, toChangeSales);

  if (updateSales === 'Not a Number') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notNumber } });
  }
  if (updateSales === 'quantity less or equal than 0') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessEqualThan0 } });
  }
  if (updateSales === 'Sale not Found') {
    return response.status(404).json({ err: { code: 'not_found', message: notFound } });
  }
  return response.status(200).json(updateSales);
};

const deleteSaleByID = async (request, response) => {
  const { id } = request.params;
  const deleteSale = await salesService.deleteSaleByID(id);

  if (deleteSale === 'Sale not Deleted') {
    return response.status(422).json({ err: { code: 'invalid_data', message: saleNotDeleted } });
  }
  return response.status(200).json(deleteSale);
};

module.exports = {
  postSale,
  getAllSales,
  getSalesByID,
  updateSalesByID,
  deleteSaleByID,
};
