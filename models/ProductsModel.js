const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'products';

const create = async (name, quantity) => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const newProduct = await ProductsCollection
    .insertOne({ name, quantity });

  return newProduct.ops[0];
};

const findByName = async (name) => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundProduct = await ProductsCollection.find({ name }).toArray();

  return foundProduct;
};

const getAll = async () => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const productsList = await ProductsCollection.find().toArray();

  return productsList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundProduct = await ProductsCollection.findOne({ _id: ObjectId(id) });
  console.log(foundProduct);

  return foundProduct;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
};
