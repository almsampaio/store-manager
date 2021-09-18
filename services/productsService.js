const { ObjectID } = require('mongodb');
const Products = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await Products.getAllProducts();
  return { status: 200, data: products };
};

const getProductById = async (id) => {
  if (!ObjectID.isValid(id)) return { status: 422, message: 'Wrong id format' };

  const product = await Products.getProductById(id);
  return { status: 200, data: product };
};

module.exports = { getAllProducts, getProductById };
