const connection = require('./connection');

const COLLECTION_NAME = 'products';

// REQUISITO 1 ________________________________________________________________________//
const getProductByName = async (name) => {
  const db = await connection();
  const resultProduct = await db.collection(COLLECTION_NAME).findOne({ name });
  return resultProduct;
};

const createProduct = async (product) => {
  const db = await connection();
  const insertProduct = await db.collection(COLLECTION_NAME).insertOne(product);
  return insertProduct.ops[0];
};

// ____________________________________________________________________________________//

module.exports = {
  getProductByName,
  createProduct,
};
