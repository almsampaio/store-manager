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

const updateSales = async (update) => {
    const sales = await Sales.updateSales(update);
    const message = 'Wrong product ID or invalid quantity';
    
    if (!sales) return { status: 404, message };
    return { status: 200, data: sales };
};

module.exports = { getAllSales, getById, createSales, updateSales };    