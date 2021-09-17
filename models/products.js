const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const accessProducts = () => mongoConnection.connection().then((db) => db.collection('products'));

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
  if (!ObjectId.isValid(id)) return null;
  
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
  if (!ObjectId.isValid(id)) return null;
  
  const productsCollection = await accessProducts();

  await productsCollection.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const productsCollection = await accessProducts();

  const { value } = await productsCollection.findOneAndDelete({ _id: ObjectId(id) });

  return value;
};

const updateSoldProduct = async (id, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  
  const productsCollection = await accessProducts();

  const { value } = await productsCollection.findOneAndUpdate(
    { _id: ObjectId(id), quantity: { $gte: quantity } },
    { $inc: { quantity } },
    { returnOriginal: false },
  );

  return value;
};

module.exports = {
  createProduct,
  getProductByName,
  getProductById,
  getProducts,
  updateProduct,
  deleteById,
  updateSoldProduct,
};
