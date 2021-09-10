const connection = require('./connection');
const connect = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connect();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0]; 
};

const getByName = async (name) => {
  const db = await connection();
  const productFound = await db.collection('products').findOne({ name });
  return productFound;
};

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

module.exports = {
  createProduct,
  getByName,
  getAllProducts,
};
