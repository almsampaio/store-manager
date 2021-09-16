const model = require('../models/sales'); 
// const validate = require('../validations/salesValidate');

const createSales = async (itensSold) => {
  // itensSold.map((sale) => {});
  console.log(itensSold);
  const { quantity } = itensSold[0];
  console.log('service quantity', quantity);
  if (quantity <= 0) {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  /* const valid = await validate.salesValidate(quantity);
  console.log('valid', valid);
  if (valid) {
    return valid;
  } */
  const create = await model.createSales(itensSold);
  return create;
};

/* const getAll = async () => model.getAll();
const getById = async (id) => {
  const productId = await model.getById(id);
  if (!productId) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return model.getById(id);
};
const productUpdate = async (id, name, quantity) => {
  const valid = await validate.productValidate(name, quantity);
  if (valid) return valid;

  const updatedProduct = await model.productUpdate(id, name, quantity);
  return updatedProduct;
};
const productDelete = async (id) => {
    const productId = await model.getById(id);
    if (!productId) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };
    }
    const deletedProduct = await model.productDelete(id);
    return deletedProduct;
  }; */

module.exports = {
    createSales,
    /* getAll,
    getById,
    productUpdate,
    productDelete, 
*/ };