const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = db.collection('products').find().toArray();
  return products;
};

const getProductName = async (name) => {
  const db = await connection();
  const productName = db.collection('products').findOne({ name });
  if (!productName) {
  return null;
  }
  return productName;
};

const insertProducts = async (name, quantity) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne({ name, quantity });
  return newProduct;
};

module.exports = {
  getAll,
  insertProducts,
  getProductName,
};
