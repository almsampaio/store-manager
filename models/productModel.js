const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const listProduct = async () => {
  const db = await connect();
  const list = await db.collection('products').find().toArray();
  return list; 
};

const listProductId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const productId = await db.collection('products').findOne(ObjectId(id));
  return productId;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connect();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { id, name, quantity };
};

const excludeProduct = async (id) => {
  const db = await connect();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const listProductName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });
  return product;
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
  updateProduct,
  excludeProduct,
  listProductName,
};