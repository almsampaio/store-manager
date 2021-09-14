const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');

const getProductQuantity = async (id) => {
  const { quantity } = productsModels.getProductById(id);
  return quantity;
};

const verifiesSalesAmount = async (amount, id) => {
  const totalQuantity = await getProductQuantity(id);
  if (totalQuantity - amount <= 0) {
    return false;
  }
  return true;
};

const updateSoldProducts = async (sales) => {
  sales.forEach(async ({ productId, quantity }) => {
    if (!verifiesSalesAmount(quantity, productId)) {
      return false;
    }
    await productsModels.updateSoldProduct(productId, quantity);
  });
};

const createSale = async (sales) => {
  const sale = await salesModels.createSale(sales);

  const verifyAmount = await updateSoldProducts(sales);
  if (!verifyAmount) {
    return { code: 'stock_problem', type: 404, message: 'Such amount is not permitted to sell' };
  }

  return sale;
};

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModels.getSaleById(id);

  if (!sale) return { code: 'not_found', type: 404, message: 'Sale not found' };

  return sale;
};

const updateSale = async (id, newSale) => {
  const update = await salesModels.updateSale(id, newSale);
  return update;
};

const deleteSale = async (id) => {
  const response = await salesModels.deleteSale(id);

  if (!response) return { code: 'invalid_data', type: 422, message: 'Wrong sale ID format' };

  return response;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
