// service é o intermédio de model e controller
const { createProduct, getAll, findByName } = require('../models/productsModel');

const create = async (name, quantity) => {
  const newProduct = await createProduct(name, quantity);
  console.log('Service create on!');
  return newProduct;
};

const getAllProducts = async () => {
  const products = await getAll();
  return products;
};

const getByName = async (name) => {
  const findProduct = await findByName(name);
  return findProduct;
};

module.exports = {
  create,
  getAllProducts,
  getByName,
};