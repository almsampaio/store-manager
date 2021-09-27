const status = require('../status');
const modelSales = require('../models/sales');
const modelProducts = require('../models/products');

const servicesCreate = async (saleData) => {
  const { productId } = saleData[0];
  const checkId = await modelProducts.modelGetById(productId);

  if (!checkId) { 
    return { status: status.UNPROCESSABLE_ENTITY,
      message: 'Wrong product ID or invalid quantity' };
  }

  const newProduct = await modelSales.modelCreate(saleData);
  return { status: status.HTTP_CREATED, info: newProduct };
};

const servicesGetAll = async () => {
  const model = await modelSales.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesGetById = async (id) => {
  const model = await modelSales.modelGetById(id);

  if (!model) {
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Sale not found' };
  }

  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesUpdate = async (quantity, id) => {
  const model = await modelSales.modelUpdate(quantity, id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesDelete = async (id) => {
  const searchProduct = await modelSales.modelGetById(id);

  if (!searchProduct) { 
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Wrong sale ID format' };
  }

  const model = await modelSales.modelDelete(id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

module.exports = {
  servicesGetAll,
  servicesCreate,
  servicesGetById,
  servicesUpdate,
  servicesDelete,
};