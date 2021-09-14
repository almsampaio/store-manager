const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

// REFATORAR ESTE TRECHO DEPOIS
// const verifyStock = async (items) => {
//   // await items.forEach(async ({ productId, quantity }) => {
//   //    const product = await productModel.getById(productId);
//   //     const newQuantity = product.quantity - quantity;
//   //     if (newQuantity < 0) {
//   //       return {
//   //         err: {
//   //           code: 'invalid_data',
//   //           message: 'erro',
//   //         },
//   //       };
//   //     }
//   //     await productModel.update(productId, product.name, newQuantity);
//   // });
// };

const ERRO = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const create = async (items) => {
  if (!items || !items.length) return null;
  const { productId, quantity } = items[0];
  const product = await productModel.getById(productId);
  const newQuantity = product.quantity - quantity;
  if (newQuantity < 0) {
    return ERRO;
  }
  await productModel.update(productId, product.name, newQuantity);

  const newSale = await salesModel.create(items);
  if (newSale === null) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }
  return newSale;
};

const update = async (id, itensSold) => {
  const editSale = await salesModel.update(id, itensSold);
  return editSale;
};

const exclude = async (id) => {
  const removeSale = await salesModel.exclude(id);
  return removeSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};

// Agradecimento especial ao colega Adelino, que me ajudou com o requisito 10
// e deu insights maravilhosos sobre a organização do projeto!!
// Valeu demais!!! =))