const productsModel = require('../models/productsModel');

const add = async (name, quantity) => await productsModel.add(name, quantity)
  .then((data) => data);

module.exports = {
  add,
};
