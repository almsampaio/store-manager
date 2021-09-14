const model = require('../models/salesModel');
const modelP = require('../models/productsModel');

const add = async (sales) => {

  sales.forEach(async (sale) => {
    const saleIdExist = await modelP.getById(sale.productId);

    if (!saleIdExist) {
      return { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
    }
  
    const addSales = await model.add(sale);
    return addSales;
  });
};

module.exports = {
  add,
};