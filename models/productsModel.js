const mongoConnection = require('./connection');

async function addProduct() {
  console.log('adc produto');
}

async function getAll() {
  const db = await mongoConnection.getConnection();

  const products = await db.collection('products').find().toArray();

  return products;
}

module.exports = {
  getAll,
  addProduct,
};
