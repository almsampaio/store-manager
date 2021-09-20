const { ObjectId } = require('mongodb');

const productModel = require('../models/products');

const { notValidId, productExist } = require('../utils/errors');

const createNewProduct = async (name, quantity) => {
  const isExists = await productModel.getName(name);
  if (isExists) {
    return { status: 422, message: productExist };
  }
  const product = await productModel.create(name, quantity);
  return { status: 201, data: product };
};

const getAll = async () => {
  const products = await productModel.getAll();
  return { status: 200, data: products };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return { status: 422, message: notValidId };
  const product = await productModel.getById(id);
  console.log(product);
  return { status: 200, data: product };
};

async function updateProduct(id, data) {
  if (!ObjectId.isValid(id)) return { status: 422, message: 'Wrong id format' };
  const product = await productModel.updateProduct(id, data);
  return { status: 200, data: product };
}

async function deleteProduct(id) {
  if (!ObjectId.isValid(id)) return { status: 422, message: 'Wrong id format' };
  const product = await productModel.getById(id);
  console.log(product);
  if (!product) return { status: 422, message: 'Wrong id format' };
  const result = await productModel.deleteProduct(id);
  return { status: 200, data: result };
}

module.exports = {
  createNewProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};