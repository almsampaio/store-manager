const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const createUser = async (name, quantity) => {
  const db = await getConnection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedId, name, quantity }; 
};

const getAllProducts = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const productExists = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getId = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  createUser,
  productExists,
  getAllProducts,
  getId,
};