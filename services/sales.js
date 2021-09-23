const status = require('../status');
const modelSales = require('../models/sales');

const servicesGetAll = async () => {
  const model = await modelSales.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

module.exports = {
  servicesGetAll,
};