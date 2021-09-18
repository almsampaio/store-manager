const model = require('../models/sales'); 
const { validateQuantity } = require('../Helpers/salesHelps');
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
const getUpdateSales = async (id, arraySales) => {
  const receivedQuantity = arraySales[0].quantity;
  if (receivedQuantity <= 0 || typeof (receivedQuantity) !== 'number') {
    return validateQuantity();
  }
  
  const salesUpdate = await model.getUpdateSales(id, arraySales);
  if (!salesUpdate) { 
    return validateQuantity();
  }
  return salesUpdate;
};

module.exports = {
    createSales,
    getAllSales,
    getById,
    getUpdateSales,
};