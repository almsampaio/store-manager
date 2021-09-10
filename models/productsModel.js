const { ObjectId } = require('mongodb');
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

// REQUISITO 2 ________________________________________________________________________//
const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection(COLLECTION_NAME).find({}).toArray();
  console.log(products);
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection(COLLECTION_NAME).findOne(ObjectId(id));
  return product;
};

// ____________________________________________________________________________________//

module.exports = {
  getProductByName,
  createProduct,
  getAllProducts,
  getProductById,
};
