const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAllProducts = async () => {
  const db = await Connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const createProduct = async (name, quantity) => {
  const db = await Connection();
  const product = db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const db = await Connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  findProductByName,
};
