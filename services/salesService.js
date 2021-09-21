const saleModel = require('../model/salesModel');

const errorMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' },
  statusCode: 422 };

function saleIsValid(product) {
  const { quantity } = product;
    return quantity <= 0 || typeof (quantity) !== 'number';
}

const createSale = async (productsSold) => {
  const createdSale = await saleModel.create(productsSold);
  const invalid = productsSold.some(saleIsValid);
  if (invalid) return errorMessage;
  return { createdSale };
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  return sale;
};

const updateSales = async (id, itensSold) => {
  const updatedSale = await saleModel.updateSales(id, itensSold);
  const invalid = itensSold.some(saleIsValid);
  if (invalid) return errorMessage;
  return { updatedSale };
};

const deleteSales = async (id) => {
  await saleModel.deleteSales(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSales,
  deleteSales,
};