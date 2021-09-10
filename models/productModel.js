const connect = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connect();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0]; 
};

module.exports = {
  createProduct,
};
