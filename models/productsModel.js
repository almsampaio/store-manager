const mongoConnection = require('./connection');

async function getAll() {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products').find().toArray();

  return products;
}

async function getByName(name) {
  const db = await mongoConnection.getConnection();
  const productsByName = await db
  .collection('products')
  .find({ name }, {})
  .toArray();

  return productsByName;
}

async function addProduct({ name, quantity }) {
  console.log('chegou no model');
  const db = await mongoConnection.getConnection();
  const { insertedId: _id } = await db.collection('products').insertOne(
    { name, quantity },
  );

  return {
    _id,
    name,
    quantity,
  };
}

module.exports = {
  getAll,
  getByName,
  addProduct,
};
