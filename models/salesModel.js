const { ObjectID } = require('mongodb');
const connect = require('./connection');

const insertSale = async (itensSold) => {
  const db = await connect();

  const result = await db.collection('sales').insertOne({ itensSold });

  return { _id: result.insertedId, itensSold };
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connect();
  const sale = await db.collection('sales').findOne({ id });
  return sale;
};

const findAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  
  const updatedSale = await connect()
  .then((db) => db.collection('sales')
  .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { itensSold } }, { upsert: true }));
  return updatedSale;
};

module.exports = {
  insertSale,
  findById,
  findAll,
  updateSale,
};