const Sale = require('../models/Sale');
const Product = require('../models/Product');

const error = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

const isValidQuantity = (sale) => {
  const { quantity } = sale;
  return typeof quantity !== 'string' && quantity > 0;
};

const invalidQuantityProduct = async (sale) => {
  const { productId, quantity } = sale;
  const product = await Product.findById(productId);
  const calculateQuantity = product.quantity - quantity;
  if (calculateQuantity >= 0) {
    await Product.update(productId, { quantity: calculateQuantity });
    return false;
  }

  return true;
};

const validate = async (sales) => {
  const isInvalid = sales.some((sale) => !isValidQuantity(sale));
  if (isInvalid) {
    return { err: error };
  }

  let quantityError = false;
  await Promise.all(sales.map(async (sale) => {
    if (await invalidQuantityProduct(sale)) {
      quantityError = true;
    }
    return sale;
  }));
  if (quantityError) {
    return { err: 'falhou' };
  }

  return {};
};

const create = async (sales) => {
  const venda = {
    itensSold: [],
  };

  const validations = await validate(sales);
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

const update = async (id, sales) => {
  const validations = await validate(sales);
  if (validations.err) return validations;

  const updateSale = await Sale.update(id, sales);

  return updateSale;
};

const deleteOne = async (id) => {
  const deletedSale = await Sale.deleteOne(id);

  if (deletedSale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return deletedSale;
};

module.exports = {
  create,
  findById,
  update,
  deleteOne,
};
