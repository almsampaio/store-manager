const {
  createModel,
  readByNameModel,
  readByAllModel,
  readByIdModel,
  updateModel,
  deleteModel,
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

const updateServices = async (id, name, quantity) => {
  const dataIsValid = await updateModel(id, name, quantity);

  if (!dataIsValid) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const data = await readByIdModel(id);
  return { data };
};

const deleteServices = async (id) => {
  const deletedData = await readByIdModel(id);
  
  if (!deletedData) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  await deleteModel(id);

  return { deletedData };
};

module.exports = { 
  createServices,
  readByAllServices,
  readByIdServices,
  updateServices,
  deleteServices,
 };