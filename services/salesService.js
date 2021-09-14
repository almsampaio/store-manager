const salesModel = require('../models/salesModel');
const validations = require('./validations');

const listSales = () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    const errorMessage = validations.saleNotFound();
    return { errorMessage };
  }

  return { sale };
};

const registerSales = async (sales) => {
  let checkProduct = null;

  sales.forEach(({ productId, quantity }) => {
    checkProduct = validations.validateSale(productId, quantity);
  });

  const { notValid, error } = await checkProduct;

  if (notValid) return { notValid };
  if (error) return { error };

  const productSales = await salesModel.registerSales(sales);
  return { productSales };
};

const treatDifference = async (id, productId, quantity) => {
  const differenceSale = await validations.differenceInSale(id, quantity);

  if (differenceSale < 0) {
    const myError = await validations.decreaseProductStock(productId, -differenceSale);
    if (myError) return { myError };
  } else {
    await validations.increaseProductStock(productId, differenceSale);
  }
};

const updateSales = async (id, sale) => {
  const [{ productId, quantity }] = sale;
  const { notValid, error } = await validations.validateSale(productId, quantity);
  const validateIdSale = validations.validateIdSale(id);

  if (validateIdSale) return { validateIdSale };
  if (notValid) return { notValid };
  if (error) return { error };

  const difference = await treatDifference(id, productId, quantity);
  if (difference) return difference;

  await salesModel.updateSale(id, sale);
  const saleUpdated = await salesModel.getSaleById(id);
  return { saleUpdated };
};

const deleteSale = async (id) => {
  const { sale, errorMessage } = await validations.verifyIdSale(id);

  if (errorMessage) return { errorMessage };

  const { itensSold } = sale;
  const { productId, quantity } = itensSold[0];

  await validations.increaseProductStock(productId, quantity);

  await salesModel.deleteSale(id);

  return { sale };
};

module.exports = {
  listSales,
  getById,
  registerSales,
  updateSales,
  deleteSale,
};
