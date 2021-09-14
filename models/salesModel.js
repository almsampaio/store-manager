const mongoConnection = require('./connection');

const salesCollection = async () => mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

const getAllSales = async () => salesCollection().collection('sales').find().toArray();

const createSale = async (inputSale) => {
  const SalesCollection = await salesCollection();

    const ret = await SalesCollection
    .insertOne({ itensSold: inputSale }).then((r) => r.ops[0]);

  return ret;
};

module.exports = {
  createSale,
  getAllSales,
};
