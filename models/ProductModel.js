const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const COLLECTION_PRODUCT = 'products';

const isName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const product = await productsCollection.findOne({ name });
  
  if (product) return true;
  return false;
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const products = await productsCollection.find().toArray() || [];

  return { products };
};

const getById = async (id) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  if (!ObjectId.isValid(id)) return null;

  const product = await productsCollection.findOne({ _id: ObjectId(id) });

  if (!product) return null;

  const { _id, name, quantity } = product;

  return { _id, name, quantity };
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_PRODUCT));
  
    const { insertedId: _id } = await productsCollection.insertOne({ name, quantity });
    return {
      _id,
      name,
      quantity,
    };
};

module.exports = {
  create,
  getAll,
  isName,
  getById,
};
