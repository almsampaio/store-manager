const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'products';

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await productsCollection.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

const getProductByName = async (name) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return productsCollection.findOne({ name });
};

const getProducts = async () => {
  const product = {};

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  product.products = await productsCollection.find({}).toArray();

  return product;
};

const getProductById = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return productsCollection.findOne({ _id: ObjectId(id) });
};

const updateProduct = async (id, updatedProduct) => {
  const { name, quantity } = updatedProduct;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return productsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
};

const deleteProduct = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return productsCollection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
};