const Sales = require('../models/Sales');

const getAllSales = async () => {
    const sales = await Sales.getAllSales();
    return { status: 200, data: sales };
};

const getById = async (id) => {
    const sale = await Sales.getById(id);
    const message = 'Sale not found';

    if (!sale) return { status: 404, message };
    return { status: 200, data: sale };
  };

const createSales = async (sale) => {
    const sales = await Sales.createSales(sale);
    return { status: 200, data: sales };
};

const updateSales = async (id, itensSold) => {
    const sales = await Sales.updateSales(id, itensSold);
    return { status: 200, data: sales };
};

const deleteSales = async (id) => {
const products = await Sales.getById(id);
  const message = 'Wrong sale ID format';

  if (!products) return { status: 422, message }; 
  const result = await Sales.deleteSales(id);
  return { status: 200, data: result };
};

module.exports = { getAllSales, getById, createSales, updateSales, deleteSales };  
