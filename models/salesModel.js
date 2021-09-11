const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

async function getAll() {
  const db = await mongoConnection.getConnection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  const saleById = await db
  .collection('sales')
  .find({ _id: ObjectId(id) })
  .toArray();

  return saleById[0];
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
  getById,
  addSales,
};
