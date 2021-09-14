const { 
  createModel,
  readByAllModel,
  readByIdModel,
  updateModel,
  updateProductsModel,
  deleteModel,
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

const updateAddProductsServices = async (productId, quantity) => {
  await updateProductsModel(productId, -(quantity));
};

const updateSubProductsServices = async (productId, quantity) => {
  await updateProductsModel(productId, quantity);
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

const deleteServices = async (id) => {
  const deletedData = await readByIdModel(id);

  if (!deletedData) {
    return {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  await deleteModel(id);

  return { deletedData };
};

module.exports = { 
  createServices,
  readByAllServices,
  readByIdServices,
  updateAddProductsServices,
  updateSubProductsServices,
  updateServices,
  deleteServices,
};