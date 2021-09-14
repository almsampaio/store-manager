const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();

  return { products };
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const addProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const productToUpdate = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { returnDocument: 'after' },
  );
  return productToUpdate.value;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const productToDelete = await db.collection('products').findOneAndDelete(
    { _id: ObjectId(id) },
    { returnDocument: 'after' },
  );

  return productToDelete.value;
};

const productExists = async (name) => {
  const db = await connection();
  const exists = await db.collection('products').findOne({ name });

  return exists;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  productExists,
};
