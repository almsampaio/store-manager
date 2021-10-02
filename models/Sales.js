const connection = require('./connection');

async function createSales(sales) {
  await connection().then((db) => db.collection('sales').find().toArray());
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId: _id } = await salesCollection
    .insertOne({ sales });

  return {
    _id,
    itensSold: sales,
  };
}

module.exports = {
  createSales,
};
