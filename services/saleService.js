const Sale = require('../models/Sale');

const validateSaleQuantity = (salesArr) =>
  salesArr.every((sale) => typeof sale.quantity === 'number')
  && salesArr.every((sale) => sale.quantity >= 1);

exports.create = async (salesArr) => {
  if (!validateSaleQuantity(salesArr)) {
    return {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data',
    };
  }
  const sale = await Sale.createSale(salesArr);

  return { sale };
};

exports.getAll = async () => {
  const sales = Sale.getAll();

  return sales;
};

exports.getById = async (id) => {
  const sale = await Sale.getById(id);

  if (!sale) {
    return { message: 'Sale not found', code: 'not_found' }; 
  }

  return { sale };
};
