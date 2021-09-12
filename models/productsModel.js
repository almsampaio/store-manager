const { ObjectId } = require('mongodb');
const connect = require('./connection');

const findProductByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const createProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const db = await connect();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return getProductById(id);
};

module.exports = {
  createProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
};
