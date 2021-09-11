const mongoConnection = require('./connection');

const createSale = async (inputSale) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

    const ret = await productsCollection
    .insertOne({ itensSold: inputSale }).then((r) => r.ops[0]);

  return ret;
};

module.exports = {
  createSale,
};
