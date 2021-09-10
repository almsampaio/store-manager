const mongoConnection = require('./connection');

const createSale = async (inputSale) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const {ops} = await productsCollection
    .insertOne({ itensSold: inputSale });

  return ops[0];
};

module.exports = {
  createSale,
};
