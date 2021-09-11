const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const accessProducts = () => connection().then((db) => db.collection('products'));

const createProduct = async (name, quantity) => {
  const productsCollection = await accessProducts();

  const product = await productsCollection.insertOne({ name, quantity });

  return { _id: product.insertedId, name, quantity };
};

const getProductByName = async (name) => {
  const productsCollection = await accessProducts();

  const product = await productsCollection.findOne({ name });

  return product;
};

const getProductById = async (id) => {
  const productsCollection = await accessProducts();

  const product = await productsCollection.findOne(ObjectId(id));

  return product;
};

const getProducts = async () => {
  const productsCollection = await accessProducts();

  const product = await productsCollection.find({}).toArray();

  return product;
};

module.exports = {
  createProduct,
  getProductByName,
  getProductById,
  getProducts,
};
