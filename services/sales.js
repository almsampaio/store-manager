const status = require('../status');
const modelSales = require('../models/sales');
const modelProducts = require('../models/products');

const servicesCreate = async (saleData) => {
  const { productId } = saleData[0];
  const check = await modelProducts.modelGetById(productId);
  if (!check) {
  return { status: status.HTTP_UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity' };
  }
  const newProduct = await modelSales.modelCreate(saleData);
  return { status: status.HTTP_OK_STATUS, info: newProduct };
};

const servicesGetAll = async () => {
  const model = await modelSales.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesGetById = async (id) => {
  const model = await modelSales.modelGetById(id);

  if (!model) {
    return { status: status.HTTP_NOT_FOUND, message: 'Sale not found' };
  }

  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesUpdate = async (saleData, id) => {
  const model = await modelSales.modelUpdate(saleData, id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesDelete = async (id) => {
  const saleData = await modelSales.modelGetById(id);

  if (!saleData) { 
    return { status: status.HTTP_UNPROCESSABLE_ENTITY, message: 'Wrong sale ID format' };
  }
  
  saleData.itensSold.map(async (e) => {
    await modelProducts.modelQuantityUpdate(e.productId, e.quantity);
  });

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