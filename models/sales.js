const { ObjectID } = require('mongodb');
const getConnection = require('./connections');

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  return getConnection().then((db) => db.collection('sales').findOne({ _id: ObjectID(id) }));
};

const getByItemSold = async (itensSold) => {
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ itensSold });
  return sale;
};

const create = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

const update = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return 'Sale not found';
  getConnection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }));
  
  return { _id: id, itensSold };
};

const deleteSale = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  return db.collection('sales').deleteOne({ _id: ObjectID(id) });
};

module.exports = {
  getAll,
  getById,
  create,
  getByItemSold,
  update,
  deleteSale,
};