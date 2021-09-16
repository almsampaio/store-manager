const connection = require('./Connection');

const getAllProduct = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const createProduct = async (name, quantity) => {
  const prodExist = await getAllProduct();
  const checkProduct = prodExist.find((item) => item.name === name);
  if (checkProduct) return false;

  const db = await connection();

  const result = await db.collection('products').insertOne({ name, quantity });

  return result.ops[0];
};

module.exports = {
  getAllProduct,
  createProduct,
};
