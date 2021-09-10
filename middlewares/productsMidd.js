const productsModel = require('../models/productsModel');

const findDuplicated = async (name) => {
  const result = await productsModel.getByName(name);
  return result;
};

module.exports = {
  findDuplicated,
};
