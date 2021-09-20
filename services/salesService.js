const { ObjectID } = require('mongodb');
const salesModel = require('../models/salesModels');

const registerSales = (sales) => salesModel.registerSales(sales);

const listAll = () => salesModel.listAll();

const listSaleId = (id) => salesModel.listSaleId(ObjectID(id));

const editSale = async (id, products) => {
  const zero = 0;
  // pelo corpo da requisição ser um array, é necessário percorrer cada campo da requisição, para alterar oque foi solicitado
  for (let index = zero; index < products.length; index += 1) {
    const idProd = products[index].productId;
    const qtyProd = products[index].quantity;
    // DEVIA TER UM AWAIT AQUI
    salesModel.editSale(ObjectID(id), idProd, qtyProd);
  }
  return salesModel.listSaleId(ObjectID(id));
};

const deleteSale = (id) => salesModel.deleteSale(id);

module.exports = {
  registerSales,
  listAll,
  listSaleId,
  editSale,
  deleteSale,
};
