const model = require('../model/salesModel');

const addNewSale = async (newSale) => {
    try {
      const operation = await model.addNewSale(newSale);
      return operation;
    } catch (error) {
      return error.message;
    }
};

module.exports = {
    addNewSale,
};