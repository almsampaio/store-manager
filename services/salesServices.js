const salesModel = require('../models/salesModel');
const validations = require('./validations');

const createSale = async (sales) => {
  let newProd = null;

  try {
    await Promise.all(sales.map(async ({ productId, quantity }) => {
      const verifyProd = await validations.validateSale(productId, quantity);

      if (verifyProd !== null) {
        newProd = verifyProd.errorMessage;
      }
    }));
  } catch (error) {
    console.error('teste');
  }

  if (newProd !== null) {
    return { errorMessage: newProd };
  }

  const prodSale = await salesModel.createSale(sales);

  return { prodSale };
};

module.exports = {
  createSale,
};
