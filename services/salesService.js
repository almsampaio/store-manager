const salesModel = require('../models/salesModel');

const errorMessage = require('../utils/errorMessage');

const { invalidData, nameMinimumLength, minimumQty,
  qtyMustBeANumber, saleExists, wrongIdFormat } = errorMessage;

const getAll = async (_req, _res) => {
    const sales = await salesModel.getAll();
    return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) return { code: invalidData, message: wrongIdFormat };
  return sale;
};

const create = async (name, quantity) => {
  if (name.length < 6) {
    console.log('name.length ------- saleService', name.length);
    return { code: invalidData, message: nameMinimumLength };
  }
  if (quantity <= 0) {
    console.log('quantity ------- saleService', quantity);
    return { code: invalidData, message: minimumQty };
  }
  if (typeof quantity !== 'number') {
    console.log('typeof quantity ------- saleService', typeof quantity);
    return { code: invalidData, message: qtyMustBeANumber };
  }

  const nameExists = await salesModel.findByName(name);
  console.log('nameExists ------- saleService', nameExists);
    if (nameExists !== null) return { code: invalidData, message: saleExists };

  const sale = await salesModel.create(name, quantity);
  console.log('sale ------- saleService', sale);

  return sale;
};

const actualize = async (name, quantity, id) => {
  if (name.length < 6) {
    return { code: invalidData, message: nameMinimumLength };
  }
  if (quantity <= 0) {
    return { code: invalidData, message: minimumQty };
  }
  if (typeof quantity !== 'number') {
    return { code: invalidData, message: qtyMustBeANumber };
  }
  const updatedData = await salesModel.updateById(name, quantity, id);
  return updatedData;
};

const remove = async (id) => {
  const sale = await salesModel.remove(id);
  return sale;
};

module.exports = { 
  create,
  getAll,
  getById,
  actualize,
  remove,
};
