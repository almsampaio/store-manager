const { 
  createModel,
  readByAllModel,
  readByIdModel,
  updateModel,
} = require('../../model/sales/salesModel');

const createServices = async (products) => {
  const { result } = await createModel(products);

  return { result };
};

const readByAllServices = async () => {
  const data = await readByAllModel();

  return { data };
};

const readByIdServices = async (id) => {
  const data = await readByIdModel(id);

  if (!data) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return { data };
};

const updateServices = async (id, itensSold) => {
  const dataIsValid = await updateModel(id, itensSold);

  if (!dataIsValid) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const data = await readByIdModel(id);
  return { data };
};

module.exports = { 
  createServices,
  readByAllServices,
  readByIdServices,
  updateServices,
};