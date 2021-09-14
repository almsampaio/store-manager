const model = require('../models/productsModel');

const add = async (name, quantity) => {
  const productName = await model.getByName(name);
  
  if (productName) {
    return { err: { message: 'Product already exists', code: 'invalid_data' } };
  }

  const addProduct = await model.add(name, quantity);
  return addProduct;
};

const remove = async (id) => {
  const productExist = await model.getById(id);
  console.log(productExist);

  if (!productExist) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }

  await model.remove(id);

  return productExist; // retorno a resposta do getById pois essa resposta já tem todos os dados que eu quero que o endpoint retorne
};

module.exports = {
  add,
  remove,
};
