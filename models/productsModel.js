const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createNewProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: newProduct.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const getProductByID = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const updateProductByID = async (id, name, quantity) => {
  const db = await connection();
  const updatedProduct = await db.collection('products').updateOne(ObjectId(id),
    { $set: { name, quantity } });
  return updatedProduct;
};

module.exports = {
  createNewProduct,
  findProductByName,
  getAllProducts,
  getProductByID,
  updateProductByID,
};
