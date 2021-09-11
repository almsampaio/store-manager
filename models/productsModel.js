const mongoConnection = require('./connection');

const productsCollection = async () => mongoConnection.getConnection()
    .then((db) => db.collection('products'));

const getAllProdutcts = async () => {
  const products = await productsCollection().collection('products').find().toArray();
  return products.map(({ _id, name, quantity }) => ({
    _id,
    name,
    quantity,
  }));
};

const createProduct = async ({ name, quantity }) => {
  const prodsCollection = await productsCollection();

  const { insertedId: id } = await prodsCollection
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
