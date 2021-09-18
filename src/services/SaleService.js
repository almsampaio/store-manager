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

module.exports = {
  listAll,
  findById,
  register,
};
