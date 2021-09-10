const mongoConnection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};
