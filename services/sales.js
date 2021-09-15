const { ObjectId } = require('mongodb');
const salesModel = require('../models/sales');

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err1: { err: 
       { code: 'not_found', message: 'Sale not found' } },
      err2: { errCode: 404 },
     };
  }
  return {};
};

const validateQuantity = (itemSaled) => {
  const equalToZero = itemSaled.some(({ quantity }) => quantity === 0);
  const leastThanZero = itemSaled.some(({ quantity }) => quantity < 0);
  const notTypeNumber = itemSaled.some(({ quantity }) => typeof quantity === 'string');
  if (notTypeNumber) {
    return {
     err1: { err: 
      { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
     err2: { errCode: 422 },
    };
   }
  if (leastThanZero || equalToZero) {
    return {
      err1: { err: 
        { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
      err2: { errCode: 422 },
     };
  }
  return {};
};

const create = async (itensSold) => {
  const validateQuantitySaled = validateQuantity(itensSold);
  if (validateQuantitySaled.err1) return validateQuantitySaled;

  const sale = await salesModel.create(itensSold);
  const formatedSale = {
    _id: sale.insertedId,
    itensSold,
  };
  return formatedSale;
};

const getAll = async () => {
  const getAllProducts = await salesModel.getAll();
  const allProducts = {
    sales: getAllProducts,
  };
  console.log({
    nome: 'getAllProducts',
    getAllProducts: allProducts.sales[0],
  });
  return allProducts;
};

const getById = async (id) => {
  const idNotValid = validateId(id);
  if (idNotValid.err1) return idNotValid;
  const getProductById = await salesModel.getById(id);
  return getProductById;
};

module.exports = {
  create,
  getAll,
  getById,
};