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
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const productFound = await productsCollection.findOne({ _id });
  return productFound;
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  const productsFound = await productsCollection.find().toArray();
  return productsFound;
};

module.exports = {
  create,
  findOneByName,
  getAll,
  findOneById,
};
