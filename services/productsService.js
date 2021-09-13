const productsModel = require('../models/productsModel');

const checkProductInfo = (name, quantity) => {
  const testResult = { errorInfo: {}, flag: false };
  if (name.length < 5) {
    testResult.errorInfo = { err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
    testResult.flag = true;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    testResult.errorInfo = { err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
    testResult.flag = true;
  }
  return testResult;
};

const checkProductExists = async (name) => {
  const product = await productsModel.findByName(name);
  const testResult = { errorInfo: {}, flag: false };
  if (product !== []) {
    testResult.errorInfo = { err: {
      code: 'invalid_data',
      message: 'product already exists',
    },
  };
  testResult.flag = true;
  }
  return testResult;
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return {
    response: products,
    status: 200,
  };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return {
    response: product,
    status: 200,
  };
};

const deleteById = async (id) => {
  const productDeleted = await productsModel.deleteById(id);
  return {
    response: productDeleted,
    status: 200,
  };
};

const create = async (name, quantity) => {
  const infoValidation = checkProductInfo(name, quantity);
  if (infoValidation.flag) {
    return { response: infoValidation.errorInfo, status: 422 };
  }
  const productExists = await checkProductExists(name);
  if (productExists.flag) {
    return { response: productExists.errorInfo, status: 422 };
  }
  const productCreated = await productsModel.create(name, quantity);
  return { response: productCreated, status: 201 };
};

const update = async (id, name, quantity) => {
  const infoValidation = checkProductInfo(name, quantity);
  if (infoValidation.flag) {
    return { response: infoValidation.errorInfo, status: 422 };
  }
  const productUpdated = await productsModel.update(id, name, quantity);
  return {
    response: productUpdated,
    status: 201,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 