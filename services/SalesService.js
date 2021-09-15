const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');

const create = async (arraySold) => {
  if (SalesSchema.validate(arraySold).err) {
    return SalesSchema.validate(arraySold);
  }
  
  const sales = await SalesModel.create(arraySold);

  return sales;
};

module.exports = {
  create,
};
