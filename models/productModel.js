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

module.exports = {
  create,
  findOneByName,
};
