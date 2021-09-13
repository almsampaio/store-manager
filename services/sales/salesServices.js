const { 
  createModel,
  readByAllModel,
  readByIdModel,
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

module.exports = { 
  createServices,
  readByAllServices,
  readByIdServices,
};