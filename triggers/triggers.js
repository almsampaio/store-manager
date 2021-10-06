const productService = require('../service/productsService');
const salesModel = require('../model/salesModel');

const updateWhenSaleMaded = async (id, q) => {
  const product = await productService.getById(id);
  const { _id, name, quantity } = product;
  await productService.updateProduct(_id, { name, quantity: quantity - q }); 
  return quantity;
};

const restoreWhenSaleDeleted = async (id) => {
  const sale = await salesModel.getSalesById(id);
  const { itensSold } = sale.pop();
  await itensSold.forEach(async ({ productId, quantity }) => {
    const product = await productService.getById(productId);
    const { _id, name, quantity: q } = product;
    const restoredQ = q + quantity;
    const operation = await productService.updateProduct(_id, { name, quantity: restoredQ });
    return operation;
  });
};

module.exports = {
    updateWhenSaleMaded,
    restoreWhenSaleDeleted,
};