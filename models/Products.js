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

async function getProductById(id) {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: id }));

  return product;
}

async function editProduct(id, name, quantity) {
  await connection()
    .then((db) => db.collection('products').updateOne({ _id: id }, { $set: { name, quantity } }));

  return {
    id, name, quantity
  };
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
};
