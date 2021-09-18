// conecta service com o model
const salesModel = require('../models/salesModel');

const postSale = async (soldItems) => {
  for (let index = 0; index < soldItems.length; index += 1) {
    if (typeof soldItems[index].quantity !== 'number') return 'Not a Number';
    if (soldItems[index].quantity <= 0) return 'quantity less or equal than 0';
  }

  const sale = await salesModel.postSale(soldItems);
  return sale;
};

const getSalesByID = async (id) => {
  const salesByID = await salesModel.getSalesByID(id);

  if (salesByID === false || salesByID === null) return 'Sale not Found';

  return salesByID;
};

const updateSalesByID = async (id, toChangeSales) => {
  for (let index = 0; index < toChangeSales.length; index += 1) {
    if (typeof toChangeSales[index].quantity !== 'number') return 'Not a Number';
    if (toChangeSales[index].quantity <= 0) return 'quantity less or equal than 0';
  }

  const updateSales = await salesModel.updateSalesByID(id, toChangeSales);
  return updateSales;
};

module.exports = {
  postSale,
  getSalesByID,
  updateSalesByID,
};
