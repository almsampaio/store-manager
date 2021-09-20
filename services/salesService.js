const { ObjectID } = require('mongodb');
const salesModel = require('../models/salesModel');

const createSales = async (itensSold) => {
  // if (false) return { status: 404, message: 'Deu ruim' };
  const newSale = await salesModel.createSales(itensSold);
  return { status: 200, data: newSale };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 200, data: sales };
};

const getSaleById = async (id) => {
  if (!ObjectID.isValid(id)) return { status: 404, message: 'Sale not found' };

  const sale = await salesModel.getSaleById(id);
  return { status: 200, data: sale };
};

module.exports = { createSales, getAllSales, getSaleById };
