const salesModel = require('../models/saleModel');

const register = async (sales) => {
    const createdSale = await salesModel.register(sales);
  
    return createdSale;
  };

function validateQuantitySale(req, res, next) {
  const sales = req.body;
  for (let index = 0; index < sales.length; index += 1) {
      if (sales[index].quantity <= 0 || typeof sales[index].quantity !== 'number') {
          return res.status(422)
          .json(
              { err: 
                  { code: 'invalid_data',
                  message: 'Wrong product ID or invalid quantity' } },
  );
      }
  }
  next();
  }
const getById = async (id) => {
  const sale = await salesModel.getById(id);

  return sale;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};
const update = async (saleId, quantity, productId) => {
  const sale = await salesModel.update(saleId, quantity, productId);

  return sale;
};

const remove = async (id) => {
  await salesModel.remove(id);
};

  module.exports = {
    register,
    validateQuantitySale,
    getById,
    getAll,
    update,
    remove,

}; 