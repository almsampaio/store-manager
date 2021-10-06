const model = require('../models/salesModel');

const triggers = require('../triggers/triggers');

const addNewSale = async (newSale) => {
    try {
      const { itensSold } = newSale;
      await itensSold.forEach(async ({ productId, quantity }) => {
       await triggers.updateWhenSaleMaded(productId, quantity);
      });
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

const getSalesById = async (id) => {
    try {
      const sale = await model.getSalesById(id);
      return sale;
    } catch (error) {
      return error.message;
    }
};

const updateSale = async (id, updatedFields) => {
    try {
      await updatedFields.forEach(async ({ productId, quantity }) => {
        await triggers.updateWhenSaleMaded(productId, quantity);
      });
      const operation = await model.updateSale(id, updatedFields);
      return operation;
    } catch (error) {
      return error.message;
    }
};

const deleteSale = async (id) => {
    try {
      await triggers.restoreWhenSaleDeleted(id);
      const operation = await model.deleteSale(id);
      return operation;
    } catch (error) {
      return error.message;
    }
};

module.exports = {
    addNewSale,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSale,
};