const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'products';

const create = async (name, quantity) => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const newProduct = await ProductsCollection
    .insertOne({ name, quantity }); // Interação com o DB

  return newProduct.ops[0];
};

const findByName = async (name) => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundProduct = await ProductsCollection
    .find({ name }).toArray(); // Interação com o DB

  return foundProduct;
};

const getAll = async () => {
  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const productsList = await ProductsCollection
    .find().toArray(); // Interação com o DB

  return productsList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundProduct = await ProductsCollection
    .findOne({ _id: ObjectId(id) }); // Interação com o DB

  return foundProduct;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  await ProductsCollection
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ); // Interação com o DB

  return { _id: ObjectId(id), name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const ProductsCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const removedProduct = await ProductsCollection
    .findOne({ _id: ObjectId(id) }); // Interação com o DB

  await ProductsCollection
    .deleteOne({ _id: ObjectId(id) }); // Interação com o DB

  return removedProduct;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  remove,
};
