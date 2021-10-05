const Sale = require('../models/Sale');

const error = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

const isValidQuantity = (sale) => {
  const { quantity } = sale;
  return typeof quantity === 'number' && quantity > 0;
};

const validate = (sales) => {
  const isInvalid = sales.some((sale) => !isValidQuantity(sale));

  if (isInvalid) {
    return { err: error };
  }

  return {};
};

const create = async (sales) => {
  const venda = {
    itensSold: [],
  };

  const validations = validate(sales);
  if (validations.err) {
    return validations;
  }

  sales.forEach(async (sale) => {
    const { productId, quantity } = sale;
    venda.itensSold.push({ productId, quantity });
  });

  const newSale = await Sale.createSale(venda);
  return newSale;
};

const findById = async (id) => {
  const sale = await Sale.findById(id);
  if (sale === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

module.exports = {
  create,
  findById,
};
