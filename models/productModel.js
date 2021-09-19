const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return result.ops[0];
  // retirado a informação do link: https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp
};

const getProductByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

module.exports = {
  addProduct,
  getProductByName,
};
