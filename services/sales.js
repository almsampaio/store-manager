const model = require('../models/sales'); 
// const validate = require('../validations/salesValidate');

const createSales = async (itensSold) => {
  // itensSold.map(async (sale) => {
    const receivedQuantity = itensSold[0].quantity;
      if (receivedQuantity <= 0 || typeof (receivedQuantity) !== 'number') {
      return ({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    const create = await model.createSales(itensSold);
    return create;
};

const getAllSales = async () => model.getAllSales();

const getById = async (id) => {
  const sale = await model.getById(id);
    if (!sale) { 
    return ({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return sale;
};

module.exports = {
    createSales,
    getAllSales,
    getById,
};