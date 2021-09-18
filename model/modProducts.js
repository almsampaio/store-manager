const connection = require('./connection');

const getAll = async () => {
  const produtos = await connection().collection('products').find().toArray();
  return produtos;
};

const getProductName = async (name) => {
  const productName = await connection().collection('products').findOne({ name });
  if (!productName) {
    return null;
  }
  return productName;
};

const insertProducts = async (name, quantity) => {
  const newProduct = await connection().collection('products').insertOne({ name, quantity });
  return newProduct;
};

module.exports = {
  getAll,
  insertProducts,
  getProductName,
};