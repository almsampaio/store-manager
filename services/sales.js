const { ObjectId } = require('mongodb');
const salesModel = require('../models/sales');

const validateId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err1: { err: 
       { code: 'not_found', message: 'Sale not found' } },
      err2: { errCode: 404 },
     };
  }
  const result = await salesModel.getById(id);
  console.log(result);
  if (!result) {
    console.log('chegou');
    return {
      err1: { err: 
       { code: 'not_found', message: 'Sale not found' } },
      err2: { errCode: 404 },
     };
  }
  return {};
};

const validateIdRemoved = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err1: {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      },
      err2: {
        errCode: 422,
      },
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
  return allProducts;
};

const getById = async (id) => {
  const idNotValid = await validateId(id);
  if (idNotValid.err1) return idNotValid;
  const getProductById = await salesModel.getById(id);
  return getProductById;
};

const update = async (id, requestValues) => {
  const validQuantity = validateQuantity(requestValues);
  if (validQuantity.err1) return validQuantity;

  await salesModel.update(id, requestValues);
  const updatedSale = await salesModel.getById(id);
  return updatedSale;
};

const remove = async (id) => {
  const validId = await validateIdRemoved(id);
  if (validId.err1) return validId;

  const removedSale = await salesModel.remove(id);
  return removedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};