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

const createProduct = async (name, quantity) => {
  const findProduct = await Products.findByName(name);

  if (findProduct) return { status: 422, message: 'Product already exists' };
  const product = await Products.createProduct(name, quantity);
  return { status: 201, data: product };
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await Products.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  if (!ObjectID.isValid(id)) return { status: 422, message: 'Wrong id format' };
  const product = await Products.getProductById(id);

  if (!product) return { status: 422, message: 'Wrong id format' };
  const result = await Products.deleteProduct(id);
  return { status: 200, data: result };
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
