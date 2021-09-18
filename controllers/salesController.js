// conecta controller com o service
const salesService = require('../services/salesService');

// conecta controller com o model
// const productsModel = require('../models/productsModel');

const lessEqualThan0 = 'Wrong product ID or invalid quantity';
const notNumber = 'Wrong product ID or invalid quantity';
// const notFound = 'Sale not found';
// const saleNotDeleted = 'Wrong sale ID format';

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

module.exports = {
  postSale,
};
