const productsServices = require('../../services/productsServices');

const getProductById = async (id) => {
  const data = await productsServices.getById(id);
  return data.name;
};

module.exports = { getProductById };
