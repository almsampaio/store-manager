const mongoConnection = require('./connection');

async function getAll() {
  const db = await mongoConnection.getConnection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
}

async function addSales(salesList) {
  const db = await mongoConnection.getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne(
    { itensSold: salesList },
  );

  return {
    _id,
    itensSold: salesList,
  };
}

module.exports = {
  getAll,
  addSales,
};
