const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const create = async (products) => {
  const [{ quantity, productId }] = products;

  const product = await productsModel.findProductById(productId);
  if ((product.quantity - quantity) < 0) {
 return {
    status: 404,
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  }; 
}

  if (!productId || quantity <= 0 || typeof quantity !== 'number') {
 return {
    status: 422,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }; 
}

  const sales = await salesModel.create(products);
  return { sales };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const find = async (id) => {
  const sale = await salesModel.find(id);
  if (!sale) return { message: 'Sale not found' };
  return { sale };
};

const update = async (id, products) => {
  const [{ quantity }] = products;

  if (quantity <= 0 || typeof quantity !== 'number') {
 return {
    message: 'Wrong product ID or invalid quantity',
  }; 
}

  const sale = await salesModel.update(id, products);
  return { sale };
};

const remove = async (id) => {
  const saleExists = await salesModel.find(id);

  if (!saleExists) {
 return {
    message: 'Wrong sale ID format',
  }; 
}

  const sale = await salesModel.remove(id);
  return { sale };
};

module.exports = {
  create,
  getAll,
  find,
  update,
  remove,
};
