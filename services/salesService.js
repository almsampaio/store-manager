const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const create = async (items) => {
  if (!items) {
    return null;
  }
  if (!items.length) {
    return null;
  }
  // console.log(items, 'sales service');
  
  const newSale = await salesModel.create(items);
  if (newSale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Such amount is not allowed to sell',
      },
    };
  }
  return newSale;
};

module.exports = {
  getAll,
  getById,
  create,
};
