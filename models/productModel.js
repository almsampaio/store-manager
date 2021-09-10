const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productCollection
    .insertOne({ name, quantity });

  return {
    id,
  };
};

const getAll = async () => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const response = await productCollection.find().toArray();

  return response;
};

module.exports = {
  create,
  getAll,
};