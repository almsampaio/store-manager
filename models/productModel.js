const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const getAllProduct = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

const createProduct = async (name, quantity) => {
  const prodExist = await getAllProduct();
  const checkProduct = prodExist.find((item) => item.name === name);
  if (checkProduct) return false;

  const db = await connection();
  const { ops } = await db.collection('products').insertOne({ name, quantity });

  return ops[0];
};

const updateProductById = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;

  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const removeProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;

  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (!product) return false;

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return product;
};

module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProductById,
  removeProductById,
};
