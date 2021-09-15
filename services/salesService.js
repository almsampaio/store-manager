const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const create = async (products) => {
  const [{ productId, quantity }] = products;
  const isProductRegistered = await productsModel.findProductById(productId);

  if (quantity <= 0 || typeof quantity !== 'number' || !isProductRegistered) {
 return {
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

module.exports = {
  create,
  getAll,
  find,
};
