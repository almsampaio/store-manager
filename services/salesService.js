const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const updateProductQuantity = async (itensSold, type) => {
  await itensSold.forEach(async (item) => {
    const { response: { name, quantity } } = await productsService.findById(item.productId);
    const newQuatity = type === 'sub' ? (quantity - item.quantity) : (quantity + item.quantity);
    await productsService.update(item.productId, name, newQuatity);
  });
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) {
    return {
      response: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
      status: 404,
    };
  }
  return {
    response: sale,
    status: 200,
  };
};

const validationInfoGenerator = async (isValid, itensSold, id) => {
  if (isValid.quantity && isValid.exists) {
    if (id !== undefined) {
      const { response } = await findById(id);
      await updateProductQuantity(response.itensSold, 'add'); 
    }
    await updateProductQuantity(itensSold, 'sub');
    return { isValid: true };
  }
  if (!isValid.exists) {
    return { errorInfo: { err: { code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        } },
        status: 422 };
  }
  return { errorInfo: { err: { code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        } },
        status: 404 };
};

const isSaleValid = async (itensSold, id) => {
  const isValid = await itensSold.reduce(async (acc, item) => {
    const productSearched = await productsService.findById(item.productId);
    if (productSearched.status === 422 || !Number.isInteger(item.quantity) || item.quantity < 1) {
      return { ...acc, exists: false };
    }
    if ((productSearched.response.quantity - item.quantity) < 0) {
      return { ...acc, quantity: false };
    }
    return acc;
  }, { exists: true, quantity: true });
  return validationInfoGenerator(isValid, itensSold, id);
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return {
    response: { sales },
    status: 200,
  };
};

const deleteById = async (id) => {
  const { status, response } = await findById(id);
  if (status === 404) {
    return { 
      response: {
        err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      },
      status: 422,
    };
  }
  const { response: { itensSold: oldItensSold } } = await findById(id);
  await updateProductQuantity(oldItensSold, 'add'); 
  await salesModel.deleteById(id);
  return {
    response,
    status: 200,
  };
};

const create = async (itensSold) => {
  const { isValid, errorInfo, status } = await isSaleValid(itensSold);
  if (!isValid) {
    return { response: errorInfo, status };
  }
  const saleCreated = await salesModel.create(itensSold);
  return { response: saleCreated, status: 200 };
};

const update = async (id, itensSold) => {
  const { status, response } = await findById(id);
  if (status === 404) {
    return { response, status };
  }
  const { isValid, errorInfo, status: statusValidation } = await isSaleValid(itensSold, id);
  if (!isValid) {
    return { response: errorInfo, status: statusValidation };
  }
  const saleUpdated = await salesModel.update(id, itensSold);
  return { response: saleUpdated, status: 200 };
};

module.exports = { getAll, findById, deleteById, create, update }; 