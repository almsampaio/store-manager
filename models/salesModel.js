const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (soldItens) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ itensSold: soldItens }]);
  return { 
    _id: Object.values(result.insertedIds).toString(),
    itensSold: soldItens,
  };
};

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const editById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { product };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  editById,
};