const { ObjectId } = require('mongodb');
const connection = require('./connection');

const existsProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  if (product) return true;
  return false;
};

const findProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const insertNewProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return ({ _id: newProduct.insertedId, name, quantity });
};

const updateProductById = async (id, name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { returnOriginal: false },
  );

  return product.value;
};

const deleteProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  console.log(product);
  return product.value;
};

module.exports = {
  insertNewProduct,
  existsProduct,
  findProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};