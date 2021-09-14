const salesModel = require('../Models/salesModel');
const { salesValidate } = require('../validations/salesValidations');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return sale;
};

const addSales = async (data) => {
  const validate = salesValidate(data);
  if (validate) {
    return {
      err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  const sales = await salesModel.addSales(data);

  return sales;
};

const updateSale = async (id, data) => {
  const validate = salesValidate(data);

  if (validate) {
    return {
      err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  const salesToUpdate = await salesModel.updateSale(id, data);

  return salesToUpdate;
};

const deleteSale = async (id) => {
  const saleToDelete = await salesModel.deleteSale(id);

  if (!saleToDelete) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  return saleToDelete;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  deleteSale,
};