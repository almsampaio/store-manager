const mongoConnection = require('./connection');

async function getAll() {
  const db = await mongoConnection.getConnection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
}

module.exports = {
  getAll,
};
