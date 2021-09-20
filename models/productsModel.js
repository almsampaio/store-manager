const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createNewProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: newProduct.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const getProductByID = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const updateProductByID = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } });
  return getProductByID(id);
};

const deleteProductByID = async (id) => {
  const db = await connection();
  const deletedProduct = await db.collection('products').findOne(ObjectId(id));

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = {
  createNewProduct,
  findProductByName,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
