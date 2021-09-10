const connection = require('./connection');

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const products = await productsCollection
    .find()
    .toArray();

  return products.map(({ _id, ...movieData }) => ({
    id: _id,
    ...movieData,
  }));
};

const create = async (name, quantity) => {
  const allProducts = await getAll();

  const verifyProduct = allProducts.find((product) => product.name === name);

  if (verifyProduct) return false;

  const connectionDb = await connection();

  const newProduct = await connectionDb.collection('products')
  .insertOne({ name, quantity });

  return newProduct.ops[0];
};

module.exports = {
  create,
};
