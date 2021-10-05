const model = require('../model/salesModel');

const addNewSale = async (newSale) => {
    try {
      const operation = await model.addNewSale(newSale);
      return operation;
    } catch (error) {
      return error.message;
    }
};

const getAllSales = async () => {
  try {
    const sales = await model.getAllSales();
    return sales;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
    addNewSale,
    getAllSales,
};