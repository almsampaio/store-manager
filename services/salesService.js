const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const productSchema = require('../schema/productSchema');

// const checkQuantity = async (productId, quantity) => {
//   const findById = await productModel.getById(productId);
//   if (findById[0].quantity < quantity) {
//     return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
//   }
// };

const createSale = async (soldItems) => {
  const errorLog = await Promise.allSettled( // Lógica de utilizar Promisse.allSettled inspirada pelo código do Rafael medeiros (rafaelmg)
    soldItems.map(async ({ productId, quantity }) => {
      const isQuantityValid = productSchema.validateQuantity(quantity);
      if (isQuantityValid) { 
        return { code: isQuantityValid.code, message: 'Wrong product ID or invalid quantity' };
      }
      const findById = await productModel.getById(productId);
    if (findById[0].quantity < quantity) {
      return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
    }
    }),
  );
  if (errorLog[0].value !== undefined) return (errorLog[0].value);
  const response = await salesModel.create(soldItems);
  return { _id: response.id, itensSold: soldItems };
};

const findById = async (id) => {
 const idExists = productSchema.validateId(id);
  if (idExists === true) {
    const response = await salesModel.getById(id);
    if (response.length === 0) return ({ code: 'not_found', message: 'Sale not found' });
    return response[0];
  }
  return ({ code: 'not_found', message: 'Sale not found' });
};

const updateSale = async (id, soldItems) => {
  let errorLog;
  soldItems.forEach(({ quantity }) => {
    const isQuantityValid = productSchema.validateQuantity(quantity);
    if (isQuantityValid) { 
      errorLog = { code: isQuantityValid.code, message: 'Wrong product ID or invalid quantity' };
    }
  });
if (errorLog !== undefined) return (errorLog);
const response = await salesModel.update(id, soldItems);
if (response.result.ok === 1) return { _id: id, itensSold: soldItems };
};

const deleteSale = async (id) => {
  const wrongIdFormat = { code: 'invalid_data', message: 'Wrong sale ID format' };
  const idExists = productSchema.validateId(id);
  if (idExists.code) return wrongIdFormat;
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return wrongIdFormat;
  const deleted = await salesModel.deleteById(id);
  if (deleted.result.ok === 1) return { _id: id, itensSold: sale[0].itensSold };

  return wrongIdFormat;
};

module.exports = {
  createSale,
  findById,
  updateSale,
  deleteSale,
};
