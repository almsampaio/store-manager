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

const getById = async () => {};

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
