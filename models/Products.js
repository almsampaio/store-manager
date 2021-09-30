const connection = require('./connection');

async function createProduct({ name, quantity }) {
  const products = await connection()
    .then((db) => db.collection('products'));

  return products.insertOne({ name, quantity })
    .then((res) => ({ _id: res.insertedId, name, quantity }));
}

async function getProducts() {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());

  return products;
}
module.exports = {
  createProduct,
  getProducts,
};
