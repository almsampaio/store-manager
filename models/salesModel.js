const { ObjectId } = require('bson');
const mongoConnection = require('./connection');

const create = async (soldItems) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const { insertedId: id } = await productCollection
    .insertOne({ itensSold: soldItems });

  return {
    id,
  };
};

const getAll = async () => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('sales'));

  const response = await productCollection.find().toArray();

  return response;
};

const getById = async (id) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('sales'));

  const response = await productCollection.find({ _id: new ObjectId(id) }).toArray();

  return response;
};

const update = async (id, soldItems) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const response = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { itensSold: soldItems } },
  );

  return response;
};

// const deleteById = async (id) => {
//   const productCollection = await mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

//   const response = await productCollection.deleteOne({ _id: new ObjectId(id) });

//   return response;
// };

module.exports = {
  create,
  getAll,
  getById,
  update,
  // deleteById,
};