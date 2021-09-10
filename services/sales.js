const sales = require('../models/sales');
const products = require('../models/products');

const STATUS_422 = 422;

const getAllSales = async () => sales.getAllSales();

const postSales = async (newSale) => {
  const result = await sales.postSales(newSale);

  newSale.forEach(async (item) => {
    if (item.quantity < 1) {
      return {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
        status: 422,
      };
    }
    return products.validateQtd(item.productId, item.quantity);
  });

  return result;
};

const deleteSales = async (id) => {
  const data = await sales.getSalesById(id);

  if (data === null) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: STATUS_422,
    };
  }

  const del = sales.deleteSales(id);
  data.itensSold.forEach(async (e) => {
    await products.ValidateSum(e.productId, e.quantity);
  });

  return del;
};

const putSales = async (id, quantity) => sales.putSales(id, quantity);

const getSalesById = async (id) => sales.getSalesById(id);

module.exports = {
  getAllSales,
  getSalesById,
  postSales,
  deleteSales,
  putSales,
};
