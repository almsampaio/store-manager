// const { ObjectId } = require('mongodb');

const db = require('../models/salesModel'); // 614808b55d9c3a000a3ca62d 61481d19db07f017689e6b6c

const isValidQuantity = (sale) => {
  const { quantity } = sale;
  return (typeof (quantity) === 'number' && Number.isInteger(quantity)) && quantity > 0;
};

const createNewSalesValidations = async (sales) => {
  const quantityValidations = sales.every(isValidQuantity);
  
  if (!quantityValidations) {
  return { err: { code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' } }; 
}

  return true;
};

const createNewSales = async (sales) => {
  const allValidations = await createNewSalesValidations(sales);
  if (!allValidations.err) {
    const response = await db.createNewSales(sales);
    return response;
  }
  return allValidations;
};

module.exports = {
  createNewSales,
};
