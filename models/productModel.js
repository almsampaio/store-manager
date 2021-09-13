const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { id: product.insertedId, name, quantity };
};

const listProduct = async () => {
  const db = await connect();
  const list = await db.collection('products').find().toArray();
  return list; 
};

const listProductId = async (id) => {
  const db = await connect();
  const productId = await db.collection('products').findOne(id);
  return productId;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connect();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { id, name, quantity };
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
  updateProduct,
};