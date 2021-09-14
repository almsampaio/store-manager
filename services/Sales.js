const Sales = require('../models/Sales');
const Product = require('../models/Products');

const createSales = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const myProduct = await Product.findProductById(productId);
  const message = 'Such amount is not permitted to sell';
  if (quantity > myProduct.quantity) return { status: 404, message };
  const finalQty = myProduct.quantity - quantity;
  const data = { name: myProduct.name, quantity: finalQty };
  await Product.updateProduct(productId, data);
  const soldItems = await Sales.createSales(itensSold);
  return { status: 200, data: soldItems };
};

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  return { status: 200, sales: allSales };
};

const getSalesById = async (id) => {
  const sale = await Sales.getSalesById(id);
  if (!sale) return { status: 404, message: 'Sale not found' };
  return { status: 200, sale };
};

const updateSale = async (id, itensSold) => {
  const sale = await Sales.updateSale(id, itensSold);
  return { status: 200, data: sale };
};

const deleteSale = async (id) => {
  const deletedSale = await Sales.deleteSale(id);
  if (!deletedSale) return { status: 422, message: 'Wrong sale ID format' };
  const { productId, quantity } = deletedSale.itensSold[0];
  const myProduct = await Product.findProductById(productId);
  const finalQty = myProduct.quantity + quantity;
  const data = { name: myProduct.name, quantity: finalQty };
  await Product.updateProduct(productId, data);
  return { status: 200, deletedSale };
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
