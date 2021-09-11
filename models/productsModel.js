const mongoConnection = require('./connection');

const getAllProdutcts = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const products = await productsCollection.collection('products').find().toArray();
  return products.map(({ _id, name, quantity }) => ({
    _id,
    name,
    quantity,
  }));
};

const createProduct = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
  getAllProdutcts,
};
