const salesModel = require('../models/salesModel');
const { salesValidations } = require('../validations/saleValidations');

const addSale = async (itensSold) => {
  const validations = salesValidations(itensSold);

  if (validations.message) return validations;
  
  const sales = await salesModel.addSale(itensSold);
 
  return { sales };
};

module.exports = {
  addSale,
};
