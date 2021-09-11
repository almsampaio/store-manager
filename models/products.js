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

const updateProduct = async (id, name, quantity) => {
  const productsCollection = await accessProducts();

  await productsCollection.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
  getProductByName,
  getProductById,
  getProducts,
  updateProduct,
};
