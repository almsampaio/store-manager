const model = require('../models/salesModel');
const modelP = require('../models/productsModel');

const add = async (sales) => {
    let compras = true;

    sales.forEach(async (sale) => {
      const saleIdExist = await modelP.getById(sale.productId);
      
      if (!saleIdExist) {
        compras = false;
      }
    });

    if (!compras) {
      return { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
    }

    const addSales = await model.add(sales);
    console.log(addSales);
    return addSales;
};

const remove = async (id) => {
  const productExist = await model.getById(id);

  if (!productExist) {
    return { err: { message: 'Wrong product ID or invalid quantity', code: 'not_found' } };
  }

  await model.remove(id);

  return productExist; // retorno a resposta do getById pois essa resposta já tem todos os dados que eu quero que o endpoint retorne
};

module.exports = {
  add,
  remove,
};