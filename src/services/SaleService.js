const SaleModel = require('../models/Sale/SaleModel');
const { create } = require('../models/Sale/SaleDao');

const register = async (salesData) => {
  let sales = salesData.map(({ productId, quantity }) => new SaleModel(productId, quantity));
  sales = sales.map((sale) => ({ productId: sale.productId, quantity: sale.quantity }));
  return create(sales);
};

module.exports = {
  register,
};
