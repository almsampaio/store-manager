const status = require('../status');
const modelProducts = require('../models/products');

const servicesCreate = async (name, quantity) => {
  const newProduct = await modelProducts.modelCreate(name, quantity);
  return { status: status.HTTP_CREATED, info: newProduct };
};

const servicesGetAll = async () => {
  const model = await modelProducts.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

module.exports = {
  servicesGetAll,
  servicesCreate,
};