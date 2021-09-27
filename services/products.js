const status = require('../status');
const modelProducts = require('../models/products');

const servicesCreate = async (name, quantity) => {
  const searchProduct = await modelProducts.modelGetByName(name);

  if (searchProduct) { 
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Product already exists' };
  }
  const newProduct = await modelProducts.modelCreate(name, quantity);
  return { status: status.HTTP_CREATED, info: newProduct };
};

const servicesGetAll = async () => {
  const model = await modelProducts.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesGetById = async (id) => {
  const model = await modelProducts.modelGetById(id);

  if (!model) {
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Wrong id format' };
  }

  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesUpdate = async (name, quantity, id) => {
  const model = await modelProducts.modelUpdate(name, quantity, id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesDelete = async (id) => {
  const searchProduct = await modelProducts.modelGetById(id);

  if (!searchProduct) { 
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Wrong id format' };
  }

  const model = await modelProducts.modelDelete(id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

module.exports = {
  servicesGetAll,
  servicesCreate,
  servicesGetById,
  servicesUpdate,
  servicesDelete,
};