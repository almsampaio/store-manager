const {
  createModel,
  readByNameModel,
  readByAllModel,
  readByIdModel,
} = require('../../model/products/productsModel');

const createServices = async (name, quantity) => {
  const findName = await readByNameModel(name);

  if (findName) {
    return {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const data = await createModel(name, quantity);

  return { data };
};

const readByAllServices = async () => {
  const data = await readByAllModel();
  const Zero = 0;

  if (data.length <= Zero) {
    return {
      code: 'server-error',
      message: 'Internal Server Error',
    };
  }

  return { data };
};

const readByIdServices = async (id) => {
  const data = await readByIdModel(id);

  if (!data) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return { data };
};

module.exports = { 
  createServices,
  readByAllServices,
  readByIdServices,
 };