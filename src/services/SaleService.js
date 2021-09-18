const SaleModel = require('../models/Sale/SaleModel');
const SaleDao = require('../models/Sale/SaleDao');

const listAll = async () => SaleDao.getAll();

const findById = async (id) => {
  const sale = await SaleDao.findById(id);
  return sale;
};

const register = async (salesData) => {
  let sales = salesData.map(({ productId, quantity }) => new SaleModel(productId, quantity));
  sales = sales.map((sale) => ({ productId: sale.productId, quantity: sale.quantity }));
  return SaleDao.create(sales);
};

const update = async (id, product) => {
  const { productId, quantity } = product[0];
  if (quantity <= 0 || typeof quantity === 'string') {
    throw new Error('Wrong product ID or invalid quantity');
  }
  return SaleDao.update(id, productId, quantity);
};

module.exports = {
  listAll,
  findById,
  register,
  update,
};
