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

const updateProduct = async (id, productNew) => {
  const db = await getConnection();
  const updateId = await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: productNew });
  return updateId;
};

const IdExists = async (id) => {
  const db = await getConnection();
  const ids = await db.collection('products').findOne({ id });
  return ids;
};

const deleteProduct = async (id) => {
  const db = await getConnection();
  const deleteId = await db.collection('products')
  .deleteOne({ _id: ObjectId(id) });
  return deleteId;
};

module.exports = {
  createUser,
  productExists,
  getAllProducts,
  getId,
  updateProduct,
  deleteProduct,
  IdExists,
};