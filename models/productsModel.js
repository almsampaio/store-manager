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
  return { products };
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection(COLLECTION_NAME).findOne(ObjectId(id));
  return product;
};

// REQUISITO 3 ________________________________________________________________________//

const editProduct = async (id, product) => {
  const { name, quantity } = product;
  const db = await connection();
  await db.collection(COLLECTION_NAME).updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
  const updateProduct = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
  return updateProduct;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const deleteId = await getProductById(id);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) });
  const productDelete = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
  return { deleteId, productDelete };
};

// ____________________________________________________________________________________//

module.exports = {
  getProductByName,
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
