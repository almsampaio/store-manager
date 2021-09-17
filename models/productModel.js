const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });
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
  const productFound = await productsCollection.findOne({ _id: ObjectId(_id) });
  return productFound;
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  const productsFound = await productsCollection.find().toArray();
  return { products: productsFound };
};

const updateById = async ({ _id, name, quantity }) => {
  if (!ObjectId.isValid(_id)) return null;
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  await productsCollection
    .updateOne({ _id: ObjectId(_id) }, { $set: { name, quantity } });
  return { _id, name, quantity };
};

const deleteById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
    const { name, quantity } = findOneById(_id);
  await productsCollection
    .deleteOne({ _id: ObjectId(_id) });
  return { _id, name, quantity };
};

module.exports = {
  create,
  findOneByName,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
