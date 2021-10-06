const salesModel = require('../models/Sales');
const productsModel = require('../models/Products');

const invalidErrorMsg = 'Wrong product ID or invalid quantity';
const notFoundErrorMsg = 'Sale not found';

const invalidCode = 'invalid_data';
const notFoundCode = 'not_found';

const quantityIsValid = (quantity) => {
  const isNumber = typeof quantity === 'number';
  const isValid = quantity > 0;

  if (!isNumber || !isValid) return false;
  return true;
};

const productIsValid = async (productId) => {
  const product = await productsModel.getById(productId);

  if (!product) return false;
  return true;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const saleById = await salesModel.getById(id);

  if (!saleById) return { code: notFoundCode, message: notFoundErrorMsg };

  return saleById;
};

const addSales = async (salesList) => {
  const isSaleQtyValid = await salesList.map((sale) => sale.quantity).every(quantityIsValid);
  if (!isSaleQtyValid) return { code: invalidCode, message: invalidErrorMsg };

  const isSaleProductValid = await Promise.all(
    salesList.map((sale) => productIsValid(sale.productId)),
  );
  if (!isSaleProductValid.every((e) => e)) return { code: invalidCode, message: invalidErrorMsg };

  const addedSales = await salesModel.addSales(salesList);
  return addedSales;
};

const updateSales = async ({ id, productId, quantity }) => {
  const validQuantity = quantityIsValid(quantity);
  if (!validQuantity) return { code: invalidCode, message: invalidErrorMsg };

  const validProduct = await productIsValid(productId);
  if (!validProduct) return { code: invalidCode, message: invalidErrorMsg };

  const validSale = await getById(id);
  if (validSale.message) return { code: invalidCode, message: invalidErrorMsg };

  const updatedSales = await salesModel.updateSales({ id, productId, quantity });
  return updatedSales;
};

module.exports = {
  getAll,
  getById,
  addSales,
  updateSales,
};
