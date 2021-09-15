const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });
  console.log(name);
  return {
    _id,
    name,
    quantity,
  };
};

const findOneByName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const productFound = await productsCollection.findOne({ name });
  return productFound;
};

const findOneById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  console.log(_id);
  const productFound = await productsCollection.findOne({ _id: ObjectId(_id) });
  console.log(productFound);
  return productFound;
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  const productsFound = await productsCollection.find().toArray();
  return { products: productsFound };
};

module.exports = {
  create,
  findOneByName,
  getAll,
  findOneById,
};
