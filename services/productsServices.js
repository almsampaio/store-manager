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

  if (!productExist) {
    return { message: 'Wrong id format' };
  }

  const removeProduct = await model.remove(id);
  return removeProduct;
};

module.exports = {
  add,
  remove,
};
