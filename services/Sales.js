const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');

const updateProductsQuantity = async (itensSold, opt = {}) => {
  if (itensSold) {
    const { decrement } = opt;
    
    itensSold.forEach(async ({ productId, quantity }) => {
      const value = decrement ? quantity * -1 : quantity;
  
      await ProductsModel.updateProductQuantity(productId, value);
    });
  }
};

exports.create = async (itensSold) => {
  const { ops: [createdSale] } = await SalesModel.create(itensSold);

  await updateProductsQuantity(itensSold, { decrement: true });

  return createdSale;
};

exports.getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

exports.getById = async (id) => {
  const sale = await SalesModel.getById(id);
  
  return sale;
};

exports.update = async (saleId, itensSold) => {
  const updateSale = await SalesModel.update(saleId, itensSold);
  return updateSale;
};

exports.delete = async (saleId) => {
  const deletedSale = await SalesModel.delete(saleId);
  const { itensSold } = deletedSale;

  await updateProductsQuantity(itensSold);
  return deletedSale;
};
