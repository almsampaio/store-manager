const connection = require('./connection');

const collection = 'products';

const addNewProduct = async (newProduct) => {
  await connection().then((db) => db.collection(collection))
  .insertOne(newProduct);
  return true;
};

module.exports = {
    addNewProduct,
};