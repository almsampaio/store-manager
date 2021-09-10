const connection = require('./connection');

const existsProduct = async (name) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ name });
  return products;
};

const insertNewProduct = async (name, quantity) => {
  const db = await connection();
  const products = await existsProduct(name);
  if (products) {
    return null;
  }
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return ({ _id: newProduct.insertedId, name, quantity });
};

module.exports = { insertNewProduct };