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

const updateProduct = async (id, data) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  await db.collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true });
  const product = await getProductById(id);
  return product;
};

const findProductByName = async (name) => {
  const db = await Connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

const removeProduct = async (id) => {
  if (!ObjectID.isValid(id)) return null;

  const db = await Connection();
  const result = await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  findProductByName,
  updateProduct,
  removeProduct,
};
