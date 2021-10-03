const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const additionProduct = async (dataProduct) => {
  const { name, quantity } = dataProduct;

  const collectionProducts = await connection()
    .then((db) => db.collection(collection));
  
  const { insertdId: _id } = await collectionProducts.insertOne({
    name,
    quantity,
  });

  return {
    _id,
    name,
    quantity,
  };
};

const productByName = async (name) => {
  const collectionProducts = await connection()
    .then((db) => db.collection(collection));
    
    const product = await collectionProducts.findOne({ name });

  return product;
};

const getProducts = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection(collection));
  
  const products = await productsCollection.find({}).toArray();

  return products;
};

const productById = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection(collection));

    const product = await productsCollection.findOne({
      _id: ObjectId(id),
    });

    return product;
};

const updateProduct = async (id, productUpdated) => {
  const { name, quantity } = productUpdated;

  const productsCollection = await connection()
    .then((db) => db.collection(collection));

  const productUpdate = await productsCollection.updateOnde(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return productUpdate;
};

module.exports = {
  additionProduct,
  productByName,
  getProducts,
  productById,
  updateProduct,
};