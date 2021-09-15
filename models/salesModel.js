const { ObjectId } = require('bson');
const mongoConnection = require('./connection');

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('sales').find({}).toArray();
  return result;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  const result = await db.collection('sales').findOne({ _id: (ObjectId(id)) });
  return result;
};

const registerSales = async (sales) => {
  const db = await mongoConnection.getConnection();
  const addOrder = await db.collection('sales').insertOne({ itensSold: sales });

  return addOrder.ops[0];
};

const updateSale = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } },
  );
};

const deleteSale = async (id) => {
  const db = await mongoConnection.getConnection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getSaleById,
  registerSales,
  updateSale,
  deleteSale,
};
