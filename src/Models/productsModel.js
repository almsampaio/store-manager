// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const productExists = async (name) => {
  const db = await connection();
  const exists = await db.collection('products').findOne({ name });

  return exists;
}; 

module.exports = {
  addProduct,
  productExists,
};
