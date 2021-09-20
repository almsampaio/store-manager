const connection = require('./conection');

const COLLECTION_PRODUCTS = 'products';

const addProduct = async (name, quantity) => {
  connection().then((db) => db.collection(COLLECTION_PRODUCTS).insertOne({ name, quantity }))
  .then((result) => ({ id: result.insertedId, name, quantity }));
};

module.exports = {
  addProduct,
};
