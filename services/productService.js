const productsModel = require('../models/productsModel');

const create = async (name, age) => {
  const person = await productsModel.create(name, age);

  return person;
};

module.exports = { 
  create,
};
