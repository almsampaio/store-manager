const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');

const getProductQuantity = async (id) => {
  const { quantity } = await productsModels.getProductById(id);
  return quantity;
};

const verifiesSalesAmount = async (amount, id) => {
  const totalQuantity = await getProductQuantity(id);
  const stock = totalQuantity - amount;
  if (stock < 0) {
    return false;
  }
  return true;
};

const updateSoldProducts = async (sales) => {
  const result = await sales.map(async ({ productId, quantity }) => {
    const isValid = await verifiesSalesAmount(quantity, productId);
    if (!isValid) return false;
    await productsModels.updateSoldProduct(productId, -quantity);
    return true;
  });
  return Promise.all(result).then((res) => res);
};

const updateDeletedSale = async ({ itensSold }) => {
  await itensSold.forEach(async ({ productId, quantity }) => {
    await productsModels.updateSoldProduct(productId, quantity);
  });
};

const createSale = async (sales) => {
  const verifyAmount = await updateSoldProducts(sales);
  if (verifyAmount.includes(false)) {
    return { code: 'stock_problem', type: 404, message: 'Such amount is not permitted to sell' };
  }
  const sale = await salesModels.createSale(sales);

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
  const sale = await salesModels.getSaleById(id);

  if (sale) await updateDeletedSale(sale);

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
